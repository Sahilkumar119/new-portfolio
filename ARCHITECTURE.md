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
- **Frontend**: Optimized for **Vercel** with static snapshots (`react-snapshot`) for SEO. Vercel routes all traffic to `index.html` via `vercel.json`.
- **Backend**: Currently hosted on **Render** using the included `render.yaml`. (Alternative configurations via `Procfile` and `Dockerfile` are also supported for other platforms).

### Environment Variables
When deploying, you must configure the following environment variables to connect the frontend and backend:

**Frontend (Vercel)**:
- `REACT_APP_ASSISTANT_API_URL`: The public URL of the backend (e.g., `https://my-portfolio-backend.onrender.com`).

**Backend**:
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed frontend origins (e.g., `https://your-vercel-domain.vercel.app`). Defaults to `http://localhost:3000`.
- `ASSISTANT_PROJECT_ROOT`: The path to the root directory containing `content/` and `public/`. If deploying the whole repository, the default works out of the box.
- `PYTHON_VERSION`: Required by some platforms (e.g., Render) to specify the Python runtime (e.g., `3.11.0`).
- `ASSISTANT_AUTO_INGEST`: Set to `true` to build the knowledge base index on startup.
