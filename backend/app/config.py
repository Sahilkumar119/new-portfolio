from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    project_root: Path
    content_dir: Path
    public_dir: Path
    confidence_threshold: float
    top_k: int
    candidate_k: int
    auto_ingest: bool
    openrouter_api_key: str | None


def get_settings() -> Settings:
    root_env = os.getenv("ASSISTANT_PROJECT_ROOT")
    root = Path(root_env).resolve() if root_env else Path(__file__).resolve().parents[2]
    return Settings(
        project_root=root,
        content_dir=root / "content",
        public_dir=root / "public",
        confidence_threshold=float(os.getenv("ASSISTANT_CONFIDENCE_THRESHOLD", "0.28")),
        top_k=int(os.getenv("ASSISTANT_TOP_K", "6")),
        candidate_k=int(os.getenv("ASSISTANT_CANDIDATE_K", "24")),
        auto_ingest=os.getenv("ASSISTANT_AUTO_INGEST", "true").lower() in {"1", "true", "yes", "on"},
        openrouter_api_key=os.getenv("OPENROUTER_API_KEY"),
    )
