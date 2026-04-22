# Graph Report - .  (2026-04-22)

## Corpus Check
- 98 files · ~54,507 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 229 nodes · 238 edges · 63 communities detected
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 45 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Frontend UI|Frontend UI]]
- [[_COMMUNITY_Assistant Backend|Assistant Backend]]
- [[_COMMUNITY_Assistant Endpoints|Assistant Endpoints]]
- [[_COMMUNITY_Retrieval Pipeline|Retrieval Pipeline]]
- [[_COMMUNITY_Backend Parsing|Backend Parsing]]
- [[_COMMUNITY_Backend Models|Backend Models]]
- [[_COMMUNITY_Social Integration|Social Integration]]
- [[_COMMUNITY_Project Tooling|Project Tooling]]
- [[_COMMUNITY_UI Utilities|UI Utilities]]
- [[_COMMUNITY_Blog Concepts|Blog Concepts]]
- [[_COMMUNITY_Content Sync|Content Sync]]
- [[_COMMUNITY_Hero Components|Hero Components]]
- [[_COMMUNITY_Project Configuration|Project Configuration]]
- [[_COMMUNITY_Testing Setup|Testing Setup]]
- [[_COMMUNITY_Style System|Style System]]
- [[_COMMUNITY_Backend Tests|Backend Tests]]
- [[_COMMUNITY_Navigation UI|Navigation UI]]
- [[_COMMUNITY_Favicon Assets A|Favicon Assets A]]
- [[_COMMUNITY_Favicon Assets B|Favicon Assets B]]
- [[_COMMUNITY_Theme Components|Theme Components]]
- [[_COMMUNITY_Portfolio Metadata|Portfolio Metadata]]
- [[_COMMUNITY_CICD Docs|CI/CD Docs]]
- [[_COMMUNITY_Cards Section|Cards Section]]
- [[_COMMUNITY_Analytics Setup|Analytics Setup]]
- [[_COMMUNITY_Background Visuals|Background Visuals]]
- [[_COMMUNITY_Footer Elements|Footer Elements]]
- [[_COMMUNITY_Logo Elements|Logo Elements]]
- [[_COMMUNITY_Speed Dial|Speed Dial]]
- [[_COMMUNITY_Theme Toggle|Theme Toggle]]
- [[_COMMUNITY_Connect Section|Connect Section]]
- [[_COMMUNITY_Blog Section|Blog Section]]
- [[_COMMUNITY_Projects Section|Projects Section]]
- [[_COMMUNITY_Home Page|Home Page]]
- [[_COMMUNITY_App Shell|App Shell]]
- [[_COMMUNITY_Meta Tags|Meta Tags]]
- [[_COMMUNITY_404 Page|404 Page]]
- [[_COMMUNITY_Resume Page|Resume Page]]
- [[_COMMUNITY_Blog Page|Blog Page]]
- [[_COMMUNITY_Projects Page|Projects Page]]
- [[_COMMUNITY_Hooks Layer|Hooks Layer]]
- [[_COMMUNITY_Utility Functions|Utility Functions]]
- [[_COMMUNITY_Resume Assets|Resume Assets]]
- [[_COMMUNITY_Automation Blog|Automation Blog]]
- [[_COMMUNITY_Software3 Blog|Software3 Blog]]
- [[_COMMUNITY_Agent Rules|Agent Rules]]
- [[_COMMUNITY_Backend API|Backend API]]
- [[_COMMUNITY_Brand Icons|Brand Icons]]
- [[_COMMUNITY_Manifest Icons|Manifest Icons]]
- [[_COMMUNITY_Public Favicons|Public Favicons]]
- [[_COMMUNITY_Data Files|Data Files]]
- [[_COMMUNITY_Root Docs|Root Docs]]
- [[_COMMUNITY_Guide Docs|Guide Docs]]
- [[_COMMUNITY_shadcn UI|shadcn UI]]
- [[_COMMUNITY_AI Panel|AI Panel]]
- [[_COMMUNITY_AI Panel Tests|AI Panel Tests]]
- [[_COMMUNITY_Tailwind Setup|Tailwind Setup]]
- [[_COMMUNITY_Graphify Output|Graphify Output]]
- [[_COMMUNITY_Status Tracking|Status Tracking]]
- [[_COMMUNITY_Software 3.0 Ideas|Software 3.0 Ideas]]
- [[_COMMUNITY_Human-AI Rationale|Human-AI Rationale]]
- [[_COMMUNITY_Terminal Data|Terminal Data]]
- [[_COMMUNITY_Certifications Data|Certifications Data]]
- [[_COMMUNITY_Projects Data|Projects Data]]

## God Nodes (most connected - your core abstractions)
1. `AssistantService` - 10 edges
2. `_load_blogs()` - 8 edges
3. `_load_resume()` - 7 edges
4. `load_all_sources()` - 6 edges
5. `_load_json_collection()` - 6 edges
6. `_load_terminal()` - 6 edges
7. `Portfolio Content Automation System` - 6 edges
8. `sync-content Script` - 6 edges
9. `tokenize()` - 5 edges
10. `hybrid_rank()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Markdown Drop In Workflow` --semantically_similar_to--> `Portfolio Content Automation System`  [INFERRED] [semantically similar]
  content/blogs/automation-is-here.md → GEMINI.md
- `Adding Content Automated Workflow Guide` --semantically_similar_to--> `Quick Guide Content Automation`  [INFERRED] [semantically similar]
  ADDING_CONTENT.md → QUICK_GUIDE.md
- `Gemini Content Automation System` --semantically_similar_to--> `Claude Content Management Workflow`  [INFERRED] [semantically similar]
  GEMINI.md → CLAUDE.md
- `Software 3.0 Concept` --semantically_similar_to--> `Portfolio Content Automation System`  [INFERRED] [semantically similar]
  content/blogs/software-3-karpathy.md → GEMINI.md
- `sync-content Script` --implements--> `Generated src data Files`  [EXTRACTED]
  scripts/sync-content.js → ARCHITECTURE.md

## Hyperedges (group relationships)
- **Content Sync Pipeline** — content_directory, sync_content_script, src_data_files, content_automation_system [EXTRACTED 1.00]
- **Assistant Grounded Answer Flow** — assistant_ingest_endpoint, assistant_chat_endpoint, retrieval_hybrid_rrf_reranker, grounding_citations [EXTRACTED 1.00]
- **Software 3.0 Human AI Pattern** — software3_concept, llm_as_os_concept, human_ai_augmentation, generation_verification_loop [EXTRACTED 1.00]

## Communities

### Community 0 - "Frontend UI"
Cohesion: 0.16
Nodes (17): Adding Content Automated Workflow Guide, Automation is Here Blog Post, Claude Content Management Workflow, Portfolio Content Automation System, content Directory Raw Sources, Gemini Content Automation System, Software 3.0 Karpathy Blog Post, Andrej Karpathy Software 3.0 Talk Video (+9 more)

### Community 1 - "Assistant Backend"
Cohesion: 0.14
Nodes (16): Graphify Agent Rules, Assistant Backend Architecture, Assistant Chat Endpoint, Assistant Health Endpoint, Assistant Ingest Endpoint, FastAPI Assistant Service, Backend Deployment Wiring Pending, FastAPI Framework (+8 more)

### Community 2 - "Assistant Endpoints"
Cohesion: 0.35
Nodes (13): _chunk_markdown(), _deterministic_id(), load_all_sources(), _load_blogs(), _load_json_collection(), _load_resume(), _load_terminal(), _parse_frontmatter() (+5 more)

### Community 3 - "Retrieval Pipeline"
Cohesion: 0.22
Nodes (5): ingest(), AssistantService, ChatResult, Citation, LightweightReranker

### Community 4 - "Backend Parsing"
Cohesion: 0.24
Nodes (10): BaseModel, get_settings(), Settings, chat(), ChatRequest, ChatResponse, CitationResponse, make_settings() (+2 more)

### Community 5 - "Backend Models"
Cohesion: 0.36
Nodes (9): bm25_sparse_rank(), dense_lexical_rank(), hybrid_rank(), reciprocal_rank_fusion(), tokenize(), _ids(), test_bm25_prefers_rare_term_match(), test_dense_lexical_rank_prefers_high_overlap() (+1 more)

### Community 6 - "Social Integration"
Cohesion: 0.29
Nodes (4): ColorOrb(), DockBar(), useFormContext(), cn()

### Community 7 - "Project Tooling"
Cohesion: 0.29
Nodes (0): 

### Community 8 - "UI Utilities"
Cohesion: 0.33
Nodes (3): DisplacementSphere(), useInViewport(), usePrefersReducedMotion()

### Community 9 - "Blog Concepts"
Cohesion: 0.33
Nodes (0): 

### Community 10 - "Content Sync"
Cohesion: 0.4
Nodes (0): 

### Community 11 - "Hero Components"
Cohesion: 0.5
Nodes (0): 

### Community 12 - "Project Configuration"
Cohesion: 0.5
Nodes (2): App(), logCredits()

### Community 13 - "Testing Setup"
Cohesion: 0.5
Nodes (0): 

### Community 14 - "Style System"
Cohesion: 0.5
Nodes (0): 

### Community 15 - "Backend Tests"
Cohesion: 0.5
Nodes (1): Test package for backend.

### Community 16 - "Navigation UI"
Cohesion: 0.5
Nodes (4): FooterText Download Attribute, Public Resume PDF Asset, Resume Download Instructions, Root Resume PDF Asset

### Community 17 - "Favicon Assets A"
Cohesion: 0.67
Nodes (4): Retro CRT 'Sahil' icon (Android Chrome 192x192), Retro CRT 'Sahil' icon (Android Chrome 512x512), Retro CRT 'Sahil' icon (web app manifest 192x192), Retro CRT 'Sahil' icon (web app manifest 512x512)

### Community 18 - "Favicon Assets B"
Cohesion: 0.67
Nodes (4): Retro CRT 'Sahil' icon (Apple touch), Retro CRT 'Sahil' icon (Apple touch), Retro CRT 'Sahil' icon (32x32 favicon), Retro CRT 'Sahil' icon (32x32 favicon)

### Community 19 - "Theme Components"
Cohesion: 0.67
Nodes (0): 

### Community 20 - "Portfolio Metadata"
Cohesion: 0.67
Nodes (0): 

### Community 21 - "CI/CD Docs"
Cohesion: 0.67
Nodes (3): Index HTML Metadata Configuration, Robots Sitemap Declaration, SEO Metadata and Structured Data

### Community 22 - "Cards Section"
Cohesion: 0.67
Nodes (3): Generation Verification Loop, Human AI Augmentation, Iron Man Suits Not Robot Army Rationale

### Community 23 - "Analytics Setup"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Background Visuals"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Footer Elements"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Logo Elements"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Speed Dial"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Theme Toggle"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Connect Section"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Blog Section"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Projects Section"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Home Page"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "App Shell"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Meta Tags"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "404 Page"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Resume Page"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Blog Page"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Projects Page"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Hooks Layer"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Utility Functions"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Resume Assets"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Automation Blog"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Software3 Blog"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Agent Rules"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Backend API"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Brand Icons"
Cohesion: 1.0
Nodes (2): Retro CRT 'Sahil' icon (SVG with embedded raster image), Retro CRT 'Sahil' icon (SVG with embedded raster image)

### Community 47 - "Manifest Icons"
Cohesion: 1.0
Nodes (2): Retro CRT 'Sahil' icon (16x16 favicon), Retro CRT 'Sahil' icon (16x16 favicon)

### Community 48 - "Public Favicons"
Cohesion: 1.0
Nodes (2): Retro CRT 'Sahil' icon (96x96 favicon), Retro CRT 'Sahil' icon (96x96 favicon)

### Community 49 - "Data Files"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Root Docs"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Guide Docs"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "shadcn UI"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "AI Panel"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "AI Panel Tests"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Tailwind Setup"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Graphify Output"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Status Tracking"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Software 3.0 Ideas"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Human-AI Rationale"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "Terminal Data"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Certifications Data"
Cohesion: 1.0
Nodes (0): 

### Community 62 - "Projects Data"
Cohesion: 1.0
Nodes (0): 

## Ambiguous Edges - Review These
- `Public Resume PDF Asset` → `Root Resume PDF Asset`  [AMBIGUOUS]
  resume.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **27 isolated node(s):** `RetrievedChunk`, `Generated src data Files`, `npm start Command`, `npm run build Command`, `Assistant Backend Architecture` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Analytics Setup`** (2 nodes): `HelmetMeta()`, `HelmetMeta.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Background Visuals`** (2 nodes): `TextDecrypt.js`, `TextDecrypt()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Footer Elements`** (2 nodes): `Today.js`, `Today()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Logo Elements`** (2 nodes): `Certifications()`, `Certifications.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Speed Dial`** (2 nodes): `Connect()`, `Connect.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Theme Toggle`** (2 nodes): `Content()`, `Content.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Connect Section`** (2 nodes): `LatestBlogs.js`, `LatestBlogs()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Blog Section`** (2 nodes): `SocialIcons.js`, `SocialIcons()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Projects Section`** (2 nodes): `AIProjects()`, `AIProjects.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Page`** (2 nodes): `LinuxTerminal.js`, `LinuxTerminal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Shell`** (2 nodes): `FooterText()`, `FooterText.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meta Tags`** (2 nodes): `Logo.js`, `Logo()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `404 Page`** (2 nodes): `LogoLink.js`, `LogoLink()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Resume Page`** (2 nodes): `SpeedDial.js`, `SpeedDials()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Blog Page`** (2 nodes): `ThemeProvider.js`, `ThemeProvider()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Projects Page`** (2 nodes): `Themes.js`, `overrides()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hooks Layer`** (2 nodes): `NavigationButtons.js`, `NavigationButtons()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Utility Functions`** (2 nodes): `PageNotFound.js`, `PageNotFound()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Resume Assets`** (2 nodes): `Resume.js`, `Resume()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Automation Blog`** (2 nodes): `BlogPost()`, `BlogPost.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Software3 Blog`** (2 nodes): `Blogs()`, `Blogs.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Agent Rules`** (2 nodes): `Home()`, `Home.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend API`** (2 nodes): `test_api_e2e.py`, `test_e2e_ingest_and_chat_flow()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Brand Icons`** (2 nodes): `Retro CRT 'Sahil' icon (SVG with embedded raster image)`, `Retro CRT 'Sahil' icon (SVG with embedded raster image)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Manifest Icons`** (2 nodes): `Retro CRT 'Sahil' icon (16x16 favicon)`, `Retro CRT 'Sahil' icon (16x16 favicon)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Public Favicons`** (2 nodes): `Retro CRT 'Sahil' icon (96x96 favicon)`, `Retro CRT 'Sahil' icon (96x96 favicon)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Data Files`** (1 nodes): `tailwind.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Docs`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Guide Docs`** (1 nodes): `index.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `shadcn UI`** (1 nodes): `sphereFragShader.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `AI Panel`** (1 nodes): `sphereVertShader.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `AI Panel Tests`** (1 nodes): `SponsorButton.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tailwind Setup`** (1 nodes): `button.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Graphify Output`** (1 nodes): `data.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Status Tracking`** (1 nodes): `getName.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Software 3.0 Ideas`** (1 nodes): `blogPosts.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Human-AI Rationale`** (1 nodes): `blogs.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Terminal Data`** (1 nodes): `projects.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Certifications Data`** (1 nodes): `certifications.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Projects Data`** (1 nodes): `terminal.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Public Resume PDF Asset` and `Root Resume PDF Asset`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `AssistantService` connect `Retrieval Pipeline` to `Backend Parsing`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `AssistantService` (e.g. with `test_low_confidence_fallback()` and `test_chat_returns_citations_when_confident()`) actually correct?**
  _`AssistantService` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `FastAPI Assistant Service` (e.g. with `FastAPI Framework` and `Backend Deployment Wiring Pending`) actually correct?**
  _`FastAPI Assistant Service` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `_load_blogs()` (e.g. with `DocumentRecord` and `ContentChunk`) actually correct?**
  _`_load_blogs()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `_load_resume()` (e.g. with `DocumentRecord` and `ContentChunk`) actually correct?**
  _`_load_resume()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RetrievedChunk`, `Generated src data Files`, `npm start Command` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._