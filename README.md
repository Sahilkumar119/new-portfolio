# Developer Portfolio & Blog

A clean, modern, and highly-performant developer portfolio and blog template. Featuring sleek Glassmorphic UI, dynamic scroll animations, a data-driven terminal interface, an AI-powered RAG assistant, and automatic SEO static pre-rendering.

---

## 🚀 Key Features

- **Modern Glassmorphic Design**: Built using custom dark/light theme options with premium frosted glass textures, backdrop filters, and soft glowing accents.
- **Dynamic Scroll Animations**: Zero-dependency scroll reveals and staggered entries for content components.
- **Static Content Automation**: Write blog posts in Markdown and projects/certifications in JSON. A pre-build sync script compiles the raw contents into React structures.
- **Interactive Linux Terminal**: A simulated CLI showing custom command responses configured via JSON.
- **Built-in RAG AI Assistant**: Connects to a FastAPI Python backend utilizing a hybrid search index (dense vector + BM25 lexical + RRF reranking) to answer questions about the developer using resume and content sources.
- **Production SEO & Sitemap**:
  - Automatically generates a dynamic XML sitemap with dynamic blog post routing.
  - Implements rich JSON-LD structured schemas (`Person`, `WebSite`, `BlogPosting`) inside pages.
  - Configured with React Helmet for Open Graph and Twitter summary meta tags.
  - Pre-renders static HTML pages using `react-snapshot` to ensure search engines can index individual pages immediately without running JS.

---

## 🛠️ Technology Stack

- **Frontend**: React (v16.13), Material UI (v4.x), Three.js (Displacement Sphere), React Router DOM (v5.2)
- **Backend**: FastAPI (Python 3.11), HTTPX, PDFPlumber (for resume parsing)
- **Pre-rendering & SEO**: React Helmet, React Snapshot, Gray-Matter (frontmatter parsing)

---

## 📁 Project Structure

```text
content/               # Authorship raw files (Markdown & JSON)
├── blogs/             # Markdown (.md) blogs with YAML frontmatter
├── projects/          # JSON projects (.json)
├── certifications/    # JSON certifications (.json)
└── terminal.json      # Linux Terminal configurations
backend/               # Python FastAPI RAG AI Assistant code
scripts/
└── sync-content.js    # Pre-build Node automation script
public/                # Static assets, resume.pdf, sitemap.xml
src/
├── app/               # App configuration, Router, HelmetMeta
├── components/        # Glassmorphic UI components, Terminal, Hero, etc.
├── data/              # Synced ESM files (auto-generated)
├── pages/             # View pages (Home, BlogPost, 404)
└── settings/          # Global configurations (resume.json, settings.json)
```

---

## ⚙️ Setup & Installation

### 1. Clone & Install Dependencies
```bash
# Install frontend packages
npm install

# Install backend packages (optional - if running local assistant)
cd backend
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file in the `backend/` directory for the AI Assistant:
```env
OPENROUTER_API_KEY=your_openrouter_api_key
CORS_ALLOWED_ORIGINS=http://localhost:3000
ASSISTANT_AUTO_INGEST=true
```

To configure the frontend to talk to your deployed assistant:
```env
REACT_APP_ASSISTANT_API_URL=https://your-backend-service.onrender.com
```

---

## 💻 Development Commands

| Command | Description |
| :--- | :--- |
| `npm run sync` | Sync content directory into compiled source files |
| `npm start` | Run sync script and start the React dev server |
| `npm run build` | Sync content, build client bundle, and pre-render HTML pages |
| `npm test` | Run client test suite |

---

## ✍️ Writing Content

To update your portfolio info, modify the files inside `content/` and `src/settings/`:

1. **Personal Information**: Edit `src/settings/resume.json` and `src/settings/settings.json` (defines colors, social links, base URL).
2. **Blogs**: Add `.md` files to `content/blogs/` with frontmatter:
   ```markdown
   ---
   id: 1
   title: "My Blog Title"
   date: "May 27, 2026"
   author: "Archie"
   tags: ["AI", "Web Dev"]
   excerpt: "A short snippet..."
   slug: "my-blog-title"
   ---
   Blog content in Markdown...
   ```
3. **Projects**: Add `.json` files to `content/projects/`:
   ```json
   {
     "title": "Project Name",
     "description": "Short project description.",
     "technologies": ["React", "CSS"],
     "link": "https://live-link.com",
     "github": "https://github.com/...",
     "type": "top" // Or "step"
   }
   ```
4. **Certifications**: Add `.json` files to `content/certifications/`.

---

## 🌐 SEO & Build Verification

The build script automated static snapshots using `react-snapshot` to ensure perfect SEO:
```bash
npm run build
```
During the build process, the generator crawls the page links and creates static files inside:
- `build/index.html` (homepage snapshot)
- `build/blog/my-blog-title.html` (blog snapshot)
- `build/sitemap.xml` (dynamic sitemap including all static pages)
