from backend.app.retrieval import (
    bm25_sparse_rank,
    dense_lexical_rank,
    reciprocal_rank_fusion,
)


def _ids(items: list[dict]) -> list[str]:
    return [item["id"] for item in items]


def test_bm25_prefers_rare_term_match() -> None:
    documents = [
        {"id": "a", "text": "alpha alpha alpha beta"},
        {"id": "b", "text": "alpha beta zeta"},
        {"id": "c", "text": "kubernetes helm chart"},
    ]

    ranked = bm25_sparse_rank("alpha zeta", documents, top_k=3)

    assert _ids(ranked)[0] == "b"
    assert ranked[0]["score"] > ranked[1]["score"]


def test_dense_lexical_rank_prefers_high_overlap() -> None:
    documents = [
        {"id": "d1", "text": "neural search ranking"},
        {"id": "d2", "text": "neural ranking"},
        {"id": "d3", "text": "database sharding"},
    ]

    ranked = dense_lexical_rank("neural search ranking", documents, top_k=3)

    assert _ids(ranked) == ["d1", "d2", "d3"]
    assert ranked[0]["score"] > ranked[1]["score"] > ranked[2]["score"]


def test_rrf_promotes_consensus_result() -> None:
    sparse = [{"id": "A", "score": 10}, {"id": "B", "score": 9}, {"id": "C", "score": 8}]
    dense = [{"id": "C", "score": 0.9}, {"id": "B", "score": 0.8}, {"id": "A", "score": 0.7}]

    fused = reciprocal_rank_fusion([sparse, dense])

    assert _ids(fused)[0] == "A"
    assert set(_ids(fused)) == {"A", "B", "C"}
