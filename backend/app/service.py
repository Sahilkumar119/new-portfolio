from __future__ import annotations

import logging
from dataclasses import dataclass

import httpx

from .config import Settings
from .loaders import load_all_sources
from .models import ContentChunk, DocumentRecord
from .retrieval import hybrid_rank, tokenize

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class Citation:
    source: str
    title: str
    snippet: str


@dataclass(frozen=True)
class ChatResult:
    answer: str
    citations: list[Citation]
    confidence: float
    used_fallback: bool


class LightweightReranker:
    def rerank(self, query: str, items: list[dict], top_k: int) -> list[dict]:
        query_terms = set(tokenize(query))
        scored = []
        for item in items:
            text_terms = set(tokenize(item.get("text", "")))
            if not query_terms:
                overlap = 0.0
            else:
                overlap = len(query_terms & text_terms) / len(query_terms)
            final_score = 0.7 * item.get("fused_score", 0.0) + 0.3 * overlap
            scored.append({**item, "rerank_score": final_score})
        scored.sort(key=lambda entry: entry["rerank_score"], reverse=True)
        return scored[:top_k]


class AssistantService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.documents: list[DocumentRecord] = []
        self.chunks: list[ContentChunk] = []
        self.chunk_records: list[dict] = []
        self.documents_by_id: dict[str, DocumentRecord] = {}
        self.reranker = LightweightReranker()
        self._openrouter_key = settings.openrouter_api_key

    def ingest_all(self) -> dict:
        documents, chunks = load_all_sources(self.settings.project_root)
        self.documents = documents
        self.chunks = chunks
        self.documents_by_id = {document.id: document for document in documents}
        self.chunk_records = [
            {
                "id": chunk.id,
                "text": chunk.text,
                "metadata": chunk.metadata,
                "document_id": chunk.document_id,
            }
            for chunk in chunks
        ]
        return {
            "documents": len(self.documents),
            "chunks": len(self.chunks),
        }

    def health(self) -> dict:
        return {
            "status": "ok",
            "documents": len(self.documents),
            "chunks": len(self.chunks),
        }

    def chat(self, question: str, top_k: int | None = None) -> ChatResult:
        if not self.chunk_records:
            return ChatResult(
                answer="Knowledge base is empty. Please run ingestion first.",
                citations=[],
                confidence=0.0,
                used_fallback=True,
            )

        max_context = top_k or self.settings.top_k
        candidates = hybrid_rank(question, self.chunk_records, self.settings.candidate_k)
        reranked = self.reranker.rerank(question, candidates, max_context)
        confidence = self._confidence(question, reranked)

        if confidence < self.settings.confidence_threshold or not reranked:
            return ChatResult(
                answer="I do not have enough verified information to answer that confidently yet.",
                citations=[],
                confidence=confidence,
                used_fallback=True,
            )

        answer = self._compose_answer(question, reranked)
        citations = self._build_citations(reranked)
        return ChatResult(answer=answer, citations=citations, confidence=confidence, used_fallback=False)

    def _confidence(self, question: str, items: list[dict]) -> float:
        if not items:
            return 0.0
        query_terms = set(tokenize(question))
        text_terms = set()
        for item in items:
            text_terms.update(tokenize(item.get("text", "")))
        coverage = len(query_terms & text_terms) / len(query_terms) if query_terms else 0.0
        top_score = items[0].get("rerank_score", 0.0)
        normalized = top_score / (top_score + 0.05)
        bonus = 0.05 if coverage > 0 else 0.0
        return round(min(1.0, 0.8 * coverage + 0.2 * normalized + bonus), 4)

    def _compose_answer(self, question: str, items: list[dict]) -> str:
        context_blocks = []
        for i, item in enumerate(items[:5], 1):
            source = item["metadata"].get("source_path", "unknown")
            context_blocks.append(f"[{i}] ({source})\n{item['text'].strip()}")
        context = "\n\n".join(context_blocks)

        if not self._openrouter_key:
            logger.warning("OPENROUTER_API_KEY not set; falling back to raw context")
            return context[:900]

        system = (
            "You are an assistant for Sahil's personal portfolio website. "
            "Answer the visitor's question using ONLY the provided context excerpts. "
            "Be concise, friendly, and factual. If the context doesn't contain enough "
            "information to answer, say so honestly rather than guessing."
        )
        prompt = f"Context:\n{context}\n\nQuestion: {question}"

        try:
            resp = httpx.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self._openrouter_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "anthropic/claude-haiku-4-5",
                    "max_tokens": 512,
                    "messages": [
                        {"role": "system", "content": system},
                        {"role": "user", "content": prompt},
                    ],
                },
                timeout=30.0,
            )
            resp.raise_for_status()
            return resp.json()["choices"][0]["message"]["content"].strip()
        except Exception as exc:
            logger.error("OpenRouter API error: %s", exc)
            return context[:900]

    def _build_citations(self, items: list[dict]) -> list[Citation]:
        citations: list[Citation] = []
        for item in items[:3]:
            document = self.documents_by_id.get(item["document_id"])
            title = document.title if document else str(item["metadata"].get("title", "Untitled"))
            source = str(item["metadata"].get("source_path", "unknown"))
            snippet = item["text"][:180].replace("\n", " ").strip()
            citations.append(Citation(source=source, title=title, snippet=snippet))
        return citations
