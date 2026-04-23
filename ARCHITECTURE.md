# Architecture

## System Overview
The project is a React-based single-page application (SPA) designed as a personal portfolio. It features a heavy emphasis on visual aesthetics through Three.js and Material UI.

## Assistant Backend Architecture
- **Service Runtime**: A Python FastAPI service lives in `backend/app/` and runs alongside the frontend deployment for server-side assistant workflows.
- **API Surface**:
  - `POST /api/assistant/ingest` triggers ingestion from raw source files.
  - `POST /api/assistant/chat` returns grounded answers with citations.
  - `GET /api/assistant/health` reports backend readiness and corpus size.
  - `GET /` returns a friendly service description with endpoint pointers.
- **Ingestion Sources**: Reads source-of-truth content directly from `content/` plus `public/resume.pdf` (via `pdfplumber`), avoiding compiled frontend data artifacts.
- **Retrieval Pipeline**: Uses hybrid retrieval (dense lexical + BM25 sparse) with reciprocal rank fusion and a lightweight reranker to improve final context quality.
- **Grounding Model**: Chat responses are generated only from retrieved chunks and include citation metadata (`source_path`, title, snippet).
- **Startup Behavior**: Optional auto-ingest on startup controlled by `ASSISTANT_AUTO_INGEST`.

## Data Layer
- **Automated Ingestion**: Content is authored in Markdown (blogs) and JSON (projects, certifications) within the root `content/` directory.
- **Sync Script**: `scripts/sync-content.js` runs pre-build to transform raw content into ESM-compatible JavaScript files in `src/data/`.
- **Static Assets**: Images and PDFs are served from the `public/` directory.

## Frontend Architecture
- **Pages**: Defined in `src/pages/`. The `Home` page is the primary entry point, using section IDs for navigation.
- **Components**: Atomic and composite UI components in `src/components/`.
- **UI & Animations**: Features extensive use of CSS-based Apple-style glassmorphism (`backdrop-filter: blur(20px) saturate(180%)`) and lightweight IntersectionObserver-based scroll-reveal animations (`useScrollReveal` hook).
- **Theming**: Custom ThemeProvider wrapping the app to handle Light/Dark mode transitions via CSS variables and Material UI's theme object.
- **Routing**: `react-router-dom` v5 handles deep linking for blog posts.
- **Assistant Connectivity**: `src/lib/assistant-api.js` resolves the chat endpoint and `src/setupProxy.js` proxies `/api/assistant/*` to the backend in development.

## Deployment
- Optimized for **Vercel** with static snapshots (`react-snapshot`) for SEO.
