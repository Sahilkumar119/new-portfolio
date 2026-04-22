from fastapi.testclient import TestClient

from backend.app.main import app


def test_root_route_exposes_backend_info() -> None:
    client = TestClient(app)
    response = client.get("/")

    assert response.status_code == 200
    payload = response.json()
    assert payload["message"] == "Portfolio Assistant backend is running."
    assert payload["health"] == "/api/assistant/health"
    assert payload["ingest"] == "/api/assistant/ingest"
    assert payload["chat"] == "/api/assistant/chat"
