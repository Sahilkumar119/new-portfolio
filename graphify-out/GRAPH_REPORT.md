# Graph Report - new-portfolio  (2026-04-25)

## Corpus Check
- 67 files · ~43,253 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 222 nodes · 239 edges · 26 communities detected
- Extraction: 74% EXTRACTED · 26% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]

## God Nodes (most connected - your core abstractions)
1. `AssistantService` - 16 edges
2. `DocumentRecord` - 9 edges
3. `ContentChunk` - 9 edges
4. `_load_blogs()` - 8 edges
5. `Settings` - 7 edges
6. `_load_resume()` - 7 edges
7. `useScrollReveal()` - 6 edges
8. `load_all_sources()` - 6 edges
9. `_load_json_collection()` - 6 edges
10. `_load_terminal()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Portfolio Content Automation System` --semantically_similar_to--> `Markdown Drop In Workflow`  [INFERRED] [semantically similar]
  GEMINI.md → content/blogs/automation-is-here.md
- `Adding Content Automated Workflow Guide` --semantically_similar_to--> `Quick Guide Content Automation`  [INFERRED] [semantically similar]
  ADDING_CONTENT.md → QUICK_GUIDE.md
- `Claude Content Management Workflow` --semantically_similar_to--> `Gemini Content Automation System`  [INFERRED] [semantically similar]
  CLAUDE.md → GEMINI.md
- `Portfolio Content Automation System` --semantically_similar_to--> `Software 3.0 Concept`  [INFERRED] [semantically similar]
  GEMINI.md → content/blogs/software-3-karpathy.md
- `Retro CRT 'Sahil' icon (Apple touch)` --semantically_similar_to--> `Retro CRT 'Sahil' icon (Apple touch)`  [INFERRED] [semantically similar]
  favicon(1)/apple-touch-icon.png → public/apple-touch-icon.png

## Hyperedges (group relationships)
- **Content Sync Pipeline** — content_directory, sync_content_script, src_data_files, content_automation_system [EXTRACTED 1.00]
- **Assistant Grounded Answer Flow** — assistant_ingest_endpoint, assistant_chat_endpoint, retrieval_hybrid_rrf_reranker, grounding_citations [EXTRACTED 1.00]
- **Software 3.0 Human AI Pattern** — software3_concept, llm_as_os_concept, human_ai_augmentation, generation_verification_loop [EXTRACTED 1.00]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (16): BaseModel, get_settings(), Settings, chat(), ChatRequest, ChatResponse, CitationResponse, ingest() (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.35
Nodes (13): _chunk_markdown(), _deterministic_id(), load_all_sources(), _load_blogs(), _load_json_collection(), _load_resume(), _load_terminal(), _parse_frontmatter() (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.21
Nodes (13): Adding Content Automated Workflow Guide, Automation is Here Blog Post, Claude Content Management Workflow, Portfolio Content Automation System, content Directory Raw Sources, Gemini Content Automation System, Software 3.0 Karpathy Blog Post, Andrej Karpathy Software 3.0 Talk Video (+5 more)

### Community 3 - "Community 3"
Cohesion: 0.17
Nodes (6): AIProjects(), Certifications(), Connect(), LatestBlogs(), LinuxTerminal(), useScrollReveal()

### Community 4 - "Community 4"
Cohesion: 0.36
Nodes (9): bm25_sparse_rank(), dense_lexical_rank(), hybrid_rank(), reciprocal_rank_fusion(), tokenize(), _ids(), test_bm25_prefers_rare_term_match(), test_dense_lexical_rank_prefers_high_overlap() (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.29
Nodes (4): ColorOrb(), DockBar(), useFormContext(), cn()

### Community 7 - "Community 7"
Cohesion: 0.33
Nodes (3): DisplacementSphere(), useInViewport(), usePrefersReducedMotion()

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (2): App(), logCredits()

### Community 13 - "Community 13"
Cohesion: 0.5
Nodes (1): Test package for backend.

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (4): Retro CRT 'Sahil' icon (Android Chrome 192x192), Retro CRT 'Sahil' icon (Android Chrome 512x512), Retro CRT 'Sahil' icon (web app manifest 192x192), Retro CRT 'Sahil' icon (web app manifest 512x512)

### Community 15 - "Community 15"
Cohesion: 0.67
Nodes (4): Retro CRT 'Sahil' icon (Apple touch), Retro CRT 'Sahil' icon (Apple touch), Retro CRT 'Sahil' icon (32x32 favicon), Retro CRT 'Sahil' icon (32x32 favicon)

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (2): getAssistantChatUrl(), normalizeBaseUrl()

### Community 19 - "Community 19"
Cohesion: 0.67
Nodes (3): Public Resume PDF Asset, Resume Download Instructions, Root Resume PDF Asset

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (3): Backend Deployment Wiring Pending, Frontend Chat Widget Integration Pending, Project Status Known Issues

### Community 21 - "Community 21"
Cohesion: 0.67
Nodes (3): Generation Verification Loop, Human AI Augmentation, Iron Man Suits Not Robot Army Rationale

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (2): Robots Sitemap Declaration, SEO Metadata and Structured Data

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (2): Graphify Agent Rules, Graph Report Summary

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (2): Retro CRT 'Sahil' icon (16x16 favicon), Retro CRT 'Sahil' icon (16x16 favicon)

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (2): Retro CRT 'Sahil' icon (SVG with embedded raster image), Retro CRT 'Sahil' icon (SVG with embedded raster image)

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (2): Retro CRT 'Sahil' icon (96x96 favicon), Retro CRT 'Sahil' icon (96x96 favicon)

### Community 61 - "Community 61"
Cohesion: 1.0
Nodes (1): sync-content Script

### Community 62 - "Community 62"
Cohesion: 1.0
Nodes (1): npm start Command

### Community 63 - "Community 63"
Cohesion: 1.0
Nodes (1): npm run build Command

### Community 64 - "Community 64"
Cohesion: 1.0
Nodes (1): Assistant Backend Architecture

### Community 65 - "Community 65"
Cohesion: 1.0
Nodes (1): Hybrid Retrieval RRF Reranker Pipeline

### Community 66 - "Community 66"
Cohesion: 1.0
Nodes (1): Citation Grounded Response Model

## Ambiguous Edges - Review These
- `Public Resume PDF Asset` → `Root Resume PDF Asset`  [AMBIGUOUS]
  resume.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **27 isolated node(s):** `sync-content Script`, `RetrievedChunk`, `npm start Command`, `npm run build Command`, `Assistant Backend Architecture` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 9`** (4 nodes): `App()`, `logCredits()`, `App.js`, `logCredits.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (4 nodes): `__init__.py`, `__init__.py`, `__init__.py`, `Test package for backend.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (3 nodes): `getAssistantChatUrl()`, `normalizeBaseUrl()`, `assistant-api.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (2 nodes): `Robots Sitemap Declaration`, `SEO Metadata and Structured Data`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (2 nodes): `Graphify Agent Rules`, `Graph Report Summary`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (2 nodes): `Retro CRT 'Sahil' icon (16x16 favicon)`, `Retro CRT 'Sahil' icon (16x16 favicon)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (2 nodes): `Retro CRT 'Sahil' icon (SVG with embedded raster image)`, `Retro CRT 'Sahil' icon (SVG with embedded raster image)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (2 nodes): `Retro CRT 'Sahil' icon (96x96 favicon)`, `Retro CRT 'Sahil' icon (96x96 favicon)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `sync-content Script`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `npm start Command`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `npm run build Command`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `Assistant Backend Architecture`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `Hybrid Retrieval RRF Reranker Pipeline`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `Citation Grounded Response Model`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Public Resume PDF Asset` and `Root Resume PDF Asset`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `AssistantService` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `DocumentRecord` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `ContentChunk` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `AssistantService` (e.g. with `Settings` and `ContentChunk`) actually correct?**
  _`AssistantService` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `DocumentRecord` (e.g. with `Citation` and `ChatResult`) actually correct?**
  _`DocumentRecord` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `ContentChunk` (e.g. with `Citation` and `ChatResult`) actually correct?**
  _`ContentChunk` has 8 INFERRED edges - model-reasoned connections that need verification._