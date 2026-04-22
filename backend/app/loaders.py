from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

import pdfplumber

from .models import ContentChunk, DocumentRecord


def load_all_sources(project_root: Path) -> tuple[list[DocumentRecord], list[ContentChunk]]:
    documents: list[DocumentRecord] = []
    chunks: list[ContentChunk] = []

    blog_docs, blog_chunks = _load_blogs(project_root)
    documents.extend(blog_docs)
    chunks.extend(blog_chunks)

    proj_docs, proj_chunks = _load_json_collection(project_root, "project", "content/projects")
    documents.extend(proj_docs)
    chunks.extend(proj_chunks)

    cert_docs, cert_chunks = _load_json_collection(project_root, "certification", "content/certifications")
    documents.extend(cert_docs)
    chunks.extend(cert_chunks)

    term_doc, term_chunks = _load_terminal(project_root)
    if term_doc:
        documents.append(term_doc)
        chunks.extend(term_chunks)

    resume_doc, resume_chunks = _load_resume(project_root)
    if resume_doc:
        documents.append(resume_doc)
        chunks.extend(resume_chunks)

    documents.sort(key=lambda d: (d.source_type, d.source_path))
    chunks.sort(key=lambda c: (str(c.metadata.get("source_path", "")), c.id))
    return documents, chunks


def _load_blogs(root: Path) -> tuple[list[DocumentRecord], list[ContentChunk]]:
    blog_dir = root / "content/blogs"
    docs: list[DocumentRecord] = []
    chunks: list[ContentChunk] = []
    for path in sorted(blog_dir.glob("*.md")):
        raw = path.read_text(encoding="utf-8")
        frontmatter, body, body_start = _parse_frontmatter(raw)
        rel = _rel(root, path)
        slug = str(frontmatter.get("slug") or path.stem)
        title = str(frontmatter.get("title") or slug)
        doc_id = _deterministic_id("blog", rel, slug)
        docs.append(
            DocumentRecord(
                id=doc_id,
                source_type="blog",
                source_path=rel,
                title=title,
                metadata={
                    "slug": slug,
                    "author": frontmatter.get("author"),
                    "date": frontmatter.get("date"),
                    "tags": frontmatter.get("tags", []),
                },
            )
        )
        for index, entry in enumerate(_chunk_markdown(body, body_start), start=0):
            chunk_id = _deterministic_id("chunk", doc_id, str(index), entry["text"])
            chunks.append(
                ContentChunk(
                    id=chunk_id,
                    document_id=doc_id,
                    text=entry["text"],
                    metadata={
                        "source_type": "blog",
                        "source_path": rel,
                        "title": title,
                        "slug": slug,
                        "section": entry["section"],
                        "line_start": entry["line_start"],
                        "line_end": entry["line_end"],
                        "citation": f"{rel}:{entry['line_start']}",
                    },
                )
            )
    return docs, chunks


def _load_json_collection(root: Path, source_type: str, rel_folder: str) -> tuple[list[DocumentRecord], list[ContentChunk]]:
    docs: list[DocumentRecord] = []
    chunks: list[ContentChunk] = []
    folder = root / rel_folder
    for path in sorted(folder.glob("*.json")):
        rel = _rel(root, path)
        payload = json.loads(path.read_text(encoding="utf-8"))
        title = str(payload.get("title") or path.stem)
        doc_id = _deterministic_id(source_type, rel, str(payload.get("id") or path.stem))
        docs.append(
            DocumentRecord(
                id=doc_id,
                source_type=source_type,
                source_path=rel,
                title=title,
                metadata={"fields": sorted(payload.keys())},
            )
        )
        text = "\n".join(f"{k}: {payload[k]}" for k in sorted(payload.keys()))
        chunks.append(
            ContentChunk(
                id=_deterministic_id("chunk", doc_id, "0", text),
                document_id=doc_id,
                text=text,
                metadata={
                    "source_type": source_type,
                    "source_path": rel,
                    "title": title,
                    "citation": rel,
                },
            )
        )
    return docs, chunks


def _load_terminal(root: Path) -> tuple[DocumentRecord | None, list[ContentChunk]]:
    path = root / "content/terminal.json"
    if not path.exists():
        return None, []
    payload = json.loads(path.read_text(encoding="utf-8"))
    rel = _rel(root, path)
    user = str(payload.get("user") or "unknown")
    host = str(payload.get("host") or "unknown")
    doc_id = _deterministic_id("terminal", rel, user, host)
    doc = DocumentRecord(
        id=doc_id,
        source_type="terminal",
        source_path=rel,
        title=f"{user}@{host}",
        metadata={"commands": len(payload.get("commands", []))},
    )
    chunks: list[ContentChunk] = []
    intro = f"user: {user}\nhost: {host}"
    chunks.append(
        ContentChunk(
            id=_deterministic_id("chunk", doc_id, "profile", intro),
            document_id=doc_id,
            text=intro,
            metadata={"source_type": "terminal", "source_path": rel, "citation": rel},
        )
    )
    for i, cmd in enumerate(payload.get("commands", []), start=0):
        entry = f"$ {cmd.get('input', '')}\n{cmd.get('output', '')}".strip()
        chunks.append(
            ContentChunk(
                id=_deterministic_id("chunk", doc_id, f"cmd-{i}", entry),
                document_id=doc_id,
                text=entry,
                metadata={
                    "source_type": "terminal",
                    "source_path": rel,
                    "citation": f"{rel}#commands[{i}]",
                },
            )
        )
    return doc, chunks


def _load_resume(root: Path) -> tuple[DocumentRecord | None, list[ContentChunk]]:
    resume_path = root / "public/resume.pdf"
    if not resume_path.exists():
        return None, []
    rel = _rel(root, resume_path)
    pdf_bytes = resume_path.read_bytes()
    sha = hashlib.sha256(pdf_bytes).hexdigest()
    doc_id = _deterministic_id("resume", rel, sha)

    extracted_pages: list[str] = []
    with pdfplumber.open(str(resume_path)) as pdf:
        for page_index, page in enumerate(pdf.pages, start=1):
            text = (page.extract_text() or "").strip()
            if text:
                extracted_pages.append(f"[Page {page_index}]\n{text}")

    doc = DocumentRecord(
        id=doc_id,
        source_type="resume",
        source_path=rel,
        title="Resume",
        metadata={"sha256": sha, "page_count": len(extracted_pages)},
    )

    chunks: list[ContentChunk] = []
    if not extracted_pages:
        text = f"Resume file present at {rel} but text extraction returned empty output."
        chunks.append(
            ContentChunk(
                id=_deterministic_id("chunk", doc_id, "0", text),
                document_id=doc_id,
                text=text,
                metadata={"source_type": "resume", "source_path": rel, "citation": rel},
            )
        )
        return doc, chunks

    body = "\n\n".join(extracted_pages)
    for index, piece in enumerate(_split_with_overlap(body, 1200, 180), start=0):
        chunks.append(
            ContentChunk(
                id=_deterministic_id("chunk", doc_id, str(index), piece),
                document_id=doc_id,
                text=piece,
                metadata={
                    "source_type": "resume",
                    "source_path": rel,
                    "chunk_index": index,
                    "citation": rel,
                },
            )
        )
    return doc, chunks


def _parse_frontmatter(text: str) -> tuple[dict[str, object], str, int]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, text, 1
    end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end = i
            break
    if end is None:
        return {}, text, 1
    fm_lines = lines[1:end]
    body_lines = lines[end + 1 :]
    fm: dict[str, object] = {}
    for line in fm_lines:
        if not line.strip() or line.strip().startswith("#") or ":" not in line:
            continue
        key, val = line.split(":", 1)
        key = key.strip()
        raw = val.strip()
        if raw.startswith("[") and raw.endswith("]"):
            items = [x.strip().strip("\"'") for x in raw[1:-1].split(",") if x.strip()]
            fm[key] = items
        elif (raw.startswith("\"") and raw.endswith("\"")) or (raw.startswith("'") and raw.endswith("'")):
            fm[key] = raw[1:-1]
        else:
            fm[key] = raw
    return fm, "\n".join(body_lines), end + 2


def _chunk_markdown(body: str, body_start_line: int) -> list[dict[str, object]]:
    lines = body.splitlines()
    section = "Introduction"
    entries: list[dict[str, object]] = []
    buffer: list[str] = []
    start_line = body_start_line

    def flush(end_line: int) -> None:
        nonlocal buffer, start_line
        if not buffer:
            return
        text = "\n".join(buffer).strip()
        if text:
            for piece in _split_with_overlap(text, 900, 120):
                entries.append(
                    {
                        "text": piece,
                        "section": section,
                        "line_start": start_line,
                        "line_end": end_line,
                    }
                )
        buffer = []
        start_line = end_line + 1

    for idx, line in enumerate(lines, start=body_start_line):
        stripped = line.strip()
        match = re.match(r"^(#{1,6})\s+(.+)$", stripped)
        if match:
            flush(idx - 1)
            section = match.group(2).strip()
            start_line = idx + 1
            continue
        if stripped == "":
            flush(idx - 1)
            continue
        buffer.append(line)

    flush(body_start_line + len(lines) - 1)
    return entries


def _split_with_overlap(text: str, size: int, overlap: int) -> list[str]:
    if len(text) <= size:
        return [text]
    parts: list[str] = []
    start = 0
    while start < len(text):
        end = min(start + size, len(text))
        if end < len(text):
            split = text.rfind(" ", start, end)
            if split > start + int(size * 0.6):
                end = split
        piece = text[start:end].strip()
        if piece:
            parts.append(piece)
        if end >= len(text):
            break
        start = max(0, end - overlap)
    return parts


def _deterministic_id(*parts: str) -> str:
    return hashlib.sha256("||".join(parts).encode("utf-8")).hexdigest()[:24]


def _rel(root: Path, path: Path) -> str:
    return path.resolve().relative_to(root.resolve()).as_posix()
