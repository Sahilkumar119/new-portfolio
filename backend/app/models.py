from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class DocumentRecord:
    id: str
    source_type: str
    source_path: str
    title: str
    metadata: dict[str, Any]


@dataclass(frozen=True)
class ContentChunk:
    id: str
    document_id: str
    text: str
    metadata: dict[str, Any]


@dataclass(frozen=True)
class RetrievedChunk:
    chunk: ContentChunk
    dense_score: float
    sparse_score: float
    fused_score: float
