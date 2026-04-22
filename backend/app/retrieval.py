from __future__ import annotations

import math
import re
from collections import Counter


TOKEN_PATTERN = re.compile(r"[a-z0-9]+")


def tokenize(text: str) -> list[str]:
    return [token.lower() for token in TOKEN_PATTERN.findall(text or "")]


def dense_lexical_rank(query: str, documents: list[dict], top_k: int) -> list[dict]:
    query_tokens = tokenize(query)
    q_tf = Counter(query_tokens)
    q_norm = math.sqrt(sum(v * v for v in q_tf.values()))
    if q_norm == 0:
        return []

    ranked = []
    for document in documents:
        text = str(document.get("text", ""))
        d_tf = Counter(tokenize(text))
        d_norm = math.sqrt(sum(v * v for v in d_tf.values()))
        if d_norm == 0:
            score = 0.0
        else:
            dot = sum(q_tf[t] * d_tf.get(t, 0) for t in q_tf)
            score = dot / (q_norm * d_norm)
        ranked.append({"id": document["id"], "score": score})

    ranked.sort(key=lambda item: item["score"], reverse=True)
    return ranked[:top_k]


def bm25_sparse_rank(query: str, documents: list[dict], top_k: int, k1: float = 1.5, b: float = 0.75) -> list[dict]:
    query_tokens = tokenize(query)
    if not query_tokens:
        return []

    tokenized_docs = [tokenize(str(doc.get("text", ""))) for doc in documents]
    n_docs = len(tokenized_docs)
    if n_docs == 0:
        return []
    avg_doc_len = sum(len(doc) for doc in tokenized_docs) / n_docs

    df: Counter[str] = Counter()
    for doc_tokens in tokenized_docs:
        df.update(set(doc_tokens))

    ranked = []
    for idx, doc_tokens in enumerate(tokenized_docs):
        tf = Counter(doc_tokens)
        doc_len = len(doc_tokens) or 1
        score = 0.0
        for term in set(query_tokens):
            freq = tf.get(term, 0)
            if freq == 0:
                continue
            term_df = df.get(term, 0)
            idf = math.log(1 + (n_docs - term_df + 0.5) / (term_df + 0.5))
            num = freq * (k1 + 1)
            den = freq + k1 * (1 - b + b * (doc_len / (avg_doc_len or 1)))
            score += idf * (num / den)
        ranked.append({"id": documents[idx]["id"], "score": score})

    ranked.sort(key=lambda item: item["score"], reverse=True)
    return ranked[:top_k]


def reciprocal_rank_fusion(rankings: list[list[dict]], k: int = 60) -> list[dict]:
    fused: dict[str, float] = {}
    for ranking in rankings:
        for rank, item in enumerate(ranking, start=1):
            doc_id = item["id"]
            fused[doc_id] = fused.get(doc_id, 0.0) + 1.0 / (k + rank)
    ordered = [{"id": doc_id, "score": score} for doc_id, score in fused.items()]
    ordered.sort(key=lambda item: (-item["score"], item["id"]))
    return ordered


def hybrid_rank(query: str, documents: list[dict], candidate_k: int) -> list[dict]:
    dense = dense_lexical_rank(query, documents, candidate_k)
    sparse = bm25_sparse_rank(query, documents, candidate_k)
    fused = reciprocal_rank_fusion([dense, sparse])

    dense_by_id = {item["id"]: item["score"] for item in dense}
    sparse_by_id = {item["id"]: item["score"] for item in sparse}
    doc_by_id = {doc["id"]: doc for doc in documents}

    output = []
    for item in fused[:candidate_k]:
        doc = doc_by_id[item["id"]]
        output.append(
            {
                "id": item["id"],
                "text": doc["text"],
                "metadata": doc.get("metadata", {}),
                "document_id": doc.get("document_id"),
                "dense_score": dense_by_id.get(item["id"], 0.0),
                "sparse_score": sparse_by_id.get(item["id"], 0.0),
                "fused_score": item["score"],
            }
        )
    return output
