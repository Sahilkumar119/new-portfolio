from pathlib import Path

from fastapi.testclient import TestClient

from backend.app.main import app, service


client = TestClient(app)


def test_e2e_ingest_and_chat_flow() -> None:
    ingest_response = client.post("/api/assistant/ingest")
    assert ingest_response.status_code == 200
    ingest_payload = ingest_response.json()
    assert ingest_payload["documents"] > 0
    assert ingest_payload["chunks"] > 0

    chat_response = client.post(
        "/api/assistant/chat",
        json={"question": "What is the AI Voice Assistant project about?", "top_k": 3},
    )
    assert chat_response.status_code == 200
    payload = chat_response.json()
    assert "answer" in payload
    assert "citations" in payload
    assert isinstance(payload["citations"], list)

    health_response = client.get("/api/assistant/health")
    assert health_response.status_code == 200
    health = health_response.json()
    assert health["status"] == "ok"
    assert health["chunks"] >= ingest_payload["chunks"]
