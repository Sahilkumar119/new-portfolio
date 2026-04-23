from __future__ import annotations

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .config import get_settings
from .service import AssistantService


settings = get_settings()
service = AssistantService(settings=settings)

app = FastAPI(title="Portfolio Assistant Backend", version="0.1.0")

# CORS — allow the Vercel-hosted frontend (and localhost for dev) to call this API.
_allowed_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_ingest() -> None:
    if settings.auto_ingest:
        service.ingest_all()


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=1000)
    top_k: int | None = Field(default=None, ge=1, le=20)


class CitationResponse(BaseModel):
    source: str
    title: str
    snippet: str


class ChatResponse(BaseModel):
    answer: str
    confidence: float
    used_fallback: bool
    citations: list[CitationResponse]


@app.get("/")
def root() -> dict:
    return {
        "message": "Portfolio Assistant backend is running.",
        "health": "/api/assistant/health",
        "ingest": "/api/assistant/ingest",
        "chat": "/api/assistant/chat",
    }


@app.get("/api/assistant/health")
def health() -> dict:
    return service.health()


@app.post("/api/assistant/ingest")
def ingest() -> dict:
    return service.ingest_all()


@app.post("/api/assistant/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    result = service.chat(payload.question, top_k=payload.top_k)
    return ChatResponse(
        answer=result.answer,
        confidence=result.confidence,
        used_fallback=result.used_fallback,
        citations=[
            CitationResponse(source=c.source, title=c.title, snippet=c.snippet)
            for c in result.citations
        ],
    )
