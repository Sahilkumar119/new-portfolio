# Project Status

## Current State
Functional prototype with automated content management. All core sections (Terminal, Projects, Certifications, Blogs) are implemented and data-driven. The entire UI now features consistent Apple-style glassmorphism and scroll-reveal entrance animations.

Backend assistant service is implemented under `backend/` with working ingest/chat/health endpoints, a root info route, CORS support, and passing backend tests.

## Known Issues
- [x] Blog posts use a manual parsing logic in `BlogPost.js` which might need expansion for more complex Markdown features. (Resolved: Now using `marked` + `DOMPurify`)
- [x] Navigation anchors on the homepage might need adjustment for header offsets on mobile. (Resolved: Added `scroll-margin-top: 80px`)
- [x] Deployment wiring for Python backend service (with the existing static frontend deployment) is pending. (Resolved: Configured `vercel.json` rewrites and `render.yaml`/`Dockerfile` for the backend, which is currently hosted on **Render**.)
- [x] `test_service.py` failing due to missing `openrouter_api_key` in `make_settings()`. (Resolved: 2026-04-28)
- [x] FastAPI `@app.on_event("startup")` deprecation warning. (Resolved: Migrated to lifespan context manager)
- [ ] Duplicate `resume.pdf` in project root (identical copy of `public/resume.pdf`) — root copy unused, safe to remove
- [ ] Frontend bundle 291KB gzipped — could benefit from code-splitting Three.js

## Versioning
- **Current Version**: 1.2.1 (Audit & Backend Fixes)
- **Stability**: Production Ready
