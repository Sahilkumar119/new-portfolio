# AI Backend Integration — Diagnosis & Fix Plan

## Summary
The AI assistant in the deployed portfolio is broken because the frontend → backend wiring is not configured for production. The AI logic itself is fine; the request never reaches the backend (or, if it does, CORS / missing data blocks it).

---

## Code Path Traced

1. `src/components/ui/ai-input.jsx:78` — calls `fetch(getAssistantChatUrl(), ...)`.
2. `src/lib/assistant-api.js:9` — reads `process.env.REACT_APP_ASSISTANT_API_URL`. **If unset, it returns the bare path `/api/assistant/chat`** (no host).
3. `src/setupProxy.js` — only used by `npm start` in development (proxies to `127.0.0.1:8000`). **Vercel does not use this file.**
4. `vercel.json:8-11` — has a catch-all rewrite `"/(.*)" → "/index.html"`. In production, `/api/assistant/chat` is therefore rewritten to the SPA HTML page. The `fetch` succeeds (HTTP 200), then `response.json()` throws on the HTML body, and the UI shows: *"Unable to reach assistant backend right now."*

---

## Backend Deploy State (Concerning)

- `backend/` contains **only** `app/`, `__init__.py`, `requirements.txt`, `tests/`.
- **No** `Procfile`, `Dockerfile`, `render.yaml`, `railway.toml`, `runtime.txt`, or `fly.toml`.
- `requirements.txt` does not pin a Python version or define a start command.
- `backend/app/main.py:21` reads `CORS_ALLOWED_ORIGINS` (defaults to `http://localhost:3000`). If the Vercel domain is not in this list, browsers block the request even after the URL is fixed.
- `backend/app/service.py` reads from `content/` and `public/resume.pdf` at the project root. **If only `backend/` was deployed** to the provider, ingestion will load 0 documents and the chat will always return the "Knowledge base is empty" fallback.

---

## Most Likely Root Causes (Ranked)

| # | Hypothesis | Why It's Suspected | How to Confirm |
|---|---|---|---|
| 1 | `REACT_APP_ASSISTANT_API_URL` not set on Vercel | No `.env` files in repo; no docs mention setting it; default falls back to a relative path that Vercel rewrites to `index.html` | Browser DevTools → Network tab on the live site → click "Ask AI" → inspect the request URL and response (HTML vs JSON) |
| 2 | `CORS_ALLOWED_ORIGINS` on backend host doesn't include the Vercel domain | Backend default is `localhost:3000` only | DevTools console will show a CORS error |
| 3 | Backend deployed without `content/` + `public/resume.pdf` | Backend ingests from project root paths; if only `backend/` was uploaded, those paths don't exist | `curl https://<backend-host>/api/assistant/health` → check `documents` and `chunks` are > 0 |
| 4 | Free-tier cold start (Render free / Fly suspended) | Common with hobby hosting | `curl /` and time the response |
| 5 | Wrong start command on host (e.g. `python main.py` instead of `uvicorn app.main:app`) | No Procfile/Dockerfile committed → relying on host autodetect | Check the host's deploy logs |

---

## Information Needed Before Writing the Fix

1. **Which service provider** is hosting the backend? (Render / Railway / Fly / Heroku / Vercel functions / other)
2. **What is the public backend URL?** (e.g. `https://your-app.onrender.com`) — so the `/api/assistant/health` endpoint can be curled to confirm liveness.
3. **Were any environment variables set in Vercel project settings?** Specifically `REACT_APP_ASSISTANT_API_URL`.
4. **Was the entire repo uploaded to the backend host, or only the `backend/` folder?** (This determines whether `content/` and `public/resume.pdf` are reachable from the running Python process.)
5. **What does the browser DevTools Network tab show** when "Ask AI" is clicked on the live site? (status code, response body type)

---

## Proposed Fix Plan (After Answers)

1. Verify backend is reachable and returns JSON from `/api/assistant/health`.
2. Add `REACT_APP_ASSISTANT_API_URL=https://<backend>` to Vercel env vars and redeploy.
3. Set `CORS_ALLOWED_ORIGINS=https://<your-vercel-domain>` on the backend host and restart.
4. If the backend host doesn't have `content/`, add a deploy script that copies it in, or set `ASSISTANT_PROJECT_ROOT` to point to wherever the data lives.
5. Add a `Procfile` / `Dockerfile` (depending on host) and document the env vars in `ARCHITECTURE.md` so this doesn't break on the next redeploy.
