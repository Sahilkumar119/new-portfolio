from backend.app.config import Settings
from backend.app.service import AssistantService


def make_settings() -> Settings:
    return Settings(
        project_root=__import__("pathlib").Path("/tmp"),
        content_dir=__import__("pathlib").Path("/tmp/content"),
        public_dir=__import__("pathlib").Path("/tmp/public"),
        confidence_threshold=0.25,
        top_k=3,
        candidate_k=10,
        auto_ingest=False,
    )


def test_low_confidence_fallback() -> None:
    service = AssistantService(settings=make_settings())
    service.chunk_records = [
        {
            "id": "x1",
            "text": "completely unrelated text",
            "metadata": {"source_path": "content/projects/a.json", "title": "A"},
            "document_id": "d1",
        }
    ]
    service.documents_by_id = {
        "d1": __import__("types").SimpleNamespace(title="A")
    }

    response = service.chat("question with rarekeyword", top_k=2)

    assert response.used_fallback is True
    assert response.citations == []
    assert response.confidence < 0.25


def test_chat_returns_citations_when_confident() -> None:
    service = AssistantService(settings=make_settings())
    service.chunk_records = [
        {
            "id": "c1",
            "text": "Machine Learning Specialization issued by Stanford Online in 2024.",
            "metadata": {"source_path": "content/certifications/machine-learning-stanford.json", "title": "Machine Learning Specialization"},
            "document_id": "d1",
        },
        {
            "id": "c2",
            "text": "AI Voice Assistant uses Whisper and GPT-4 for low latency tasks.",
            "metadata": {"source_path": "content/projects/ai-voice-assistant.json", "title": "AI Voice Assistant"},
            "document_id": "d2",
        },
    ]
    service.documents_by_id = {
        "d1": __import__("types").SimpleNamespace(title="Machine Learning Specialization"),
        "d2": __import__("types").SimpleNamespace(title="AI Voice Assistant"),
    }

    response = service.chat("Which specialization did you do from Stanford?", top_k=2)

    assert response.used_fallback is False
    assert response.confidence >= 0.25
    assert len(response.citations) >= 1
    assert "Stanford" in response.answer
