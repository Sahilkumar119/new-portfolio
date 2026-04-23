# Graph Report - /home/ladliju/Developer/new-portfolio  (2026-04-22)

## Corpus Check
- 66 files · ~58,677 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 220 nodes · 233 edges · 71 communities detected
- Extraction: 75% EXTRACTED · 24% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]

## God Nodes (most connected - your core abstractions)
1. `AssistantService` - 16 edges
2. `DocumentRecord` - 9 edges
3. `ContentChunk` - 9 edges
4. `_load_blogs()` - 8 edges
5. `Settings` - 7 edges
6. `_load_resume()` - 7 edges
7. `load_all_sources()` - 6 edges
8. `_load_json_collection()` - 6 edges
9. `_load_terminal()` - 6 edges
10. `LightweightReranker` - 6 edges

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
Cohesion: 0.36
Nodes (9): bm25_sparse_rank(), dense_lexical_rank(), hybrid_rank(), reciprocal_rank_fusion(), tokenize(), _ids(), test_bm25_prefers_rare_term_match(), test_dense_lexical_rank_prefers_high_overlap() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.29
Nodes (4): ColorOrb(), DockBar(), useFormContext(), cn()

### Community 5 - "Community 5"
Cohesion: 0.29
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 0.33
Nodes (3): DisplacementSphere(), useInViewport(), usePrefersReducedMotion()

### Community 7 - "Community 7"
Cohesion: 0.4
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 0.5
Nodes (2): App(), logCredits()

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 0.5
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 0.5
Nodes (1): Test package for backend.

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (4): Retro CRT 'Sahil' icon (Apple touch), Retro CRT 'Sahil' icon (Apple touch), Retro CRT 'Sahil' icon (32x32 favicon), Retro CRT 'Sahil' icon (32x32 favicon)

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (4): Retro CRT 'Sahil' icon (Android Chrome 192x192), Retro CRT 'Sahil' icon (Android Chrome 512x512), Retro CRT 'Sahil' icon (web app manifest 192x192), Retro CRT 'Sahil' icon (web app manifest 512x512)

### Community 15 - "Community 15"
Cohesion: 0.67
Nodes (0): 

### Community 16 - "Community 16"
Cohesion: 0.67
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (2): getAssistantChatUrl(), normalizeBaseUrl()

### Community 18 - "Community 18"
Cohesion: 0.67
Nodes (3): Public Resume PDF Asset, Resume Download Instructions, Root Resume PDF Asset

### Community 19 - "Community 19"
Cohesion: 0.67
Nodes (3): Backend Deployment Wiring Pending, Frontend Chat Widget Integration Pending, Project Status Known Issues

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (3): Generation Verification Loop, Human AI Augmentation, Iron Man Suits Not Robot Army Rationale

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (2): Robots Sitemap Declaration, SEO Metadata and Structured Data

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (2): Graphify Agent Rules, Graph Report Summary

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (2): Retro CRT 'Sahil' icon (96x96 favicon), Retro CRT 'Sahil' icon (96x96 favicon)

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (2): Retro CRT 'Sahil' icon (SVG with embedded raster image), Retro CRT 'Sahil' icon (SVG with embedded raster image)

### Community 49 - "Community 49"
Cohesion: 1.0
Nodes (2): Retro CRT 'Sahil' icon (16x16 favicon), Retro CRT 'Sahil' icon (16x16 favicon)

### Community 50 - "Community 50"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "Community 52"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "Community 53"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Community 54"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Community 55"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Community 56"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Community 57"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Community 58"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Community 59"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Community 61"
Cohesion: 1.0
Nodes (0): 

### Community 62 - "Community 62"
Cohesion: 1.0
Nodes (0): 

### Community 63 - "Community 63"
Cohesion: 1.0
Nodes (0): 

### Community 64 - "Community 64"
Cohesion: 1.0
Nodes (0): 

### Community 65 - "Community 65"
Cohesion: 1.0
Nodes (1): sync-content Script

### Community 66 - "Community 66"
Cohesion: 1.0
Nodes (1): npm start Command

### Community 67 - "Community 67"
Cohesion: 1.0
Nodes (1): npm run build Command

### Community 68 - "Community 68"
Cohesion: 1.0
Nodes (1): Assistant Backend Architecture

### Community 69 - "Community 69"
Cohesion: 1.0
Nodes (1): Hybrid Retrieval RRF Reranker Pipeline

### Community 70 - "Community 70"
Cohesion: 1.0
Nodes (1): Citation Grounded Response Model

## Ambiguous Edges - Review These
- `Public Resume PDF Asset` → `Root Resume PDF Asset`  [AMBIGUOUS]
  resume.pdf · relation: conceptually_related_to

## Knowledge Gaps
- **27 isolated node(s):** `sync-content Script`, `RetrievedChunk`, `npm start Command`, `npm run build Command`, `Assistant Backend Architecture` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 21`** (2 nodes): `HelmetMeta()`, `HelmetMeta.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `TextDecrypt.js`, `TextDecrypt()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `Today.js`, `Today()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `Certifications()`, `Certifications.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `Connect()`, `Connect.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (2 nodes): `Content()`, `Content.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `LatestBlogs.js`, `LatestBlogs()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `SocialIcons.js`, `SocialIcons()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `AIProjects()`, `AIProjects.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (2 nodes): `LinuxTerminal.js`, `LinuxTerminal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (2 nodes): `FooterText()`, `FooterText.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (2 nodes): `Logo.js`, `Logo()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (2 nodes): `LogoLink.js`, `LogoLink()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (2 nodes): `SpeedDial.js`, `SpeedDials()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (2 nodes): `ThemeProvider.js`, `ThemeProvider()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (2 nodes): `Themes.js`, `overrides()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (2 nodes): `NavigationButtons.js`, `NavigationButtons()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (2 nodes): `PageNotFound.js`, `PageNotFound()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (2 nodes): `Resume.js`, `Resume()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (2 nodes): `BlogPost()`, `BlogPost.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (2 nodes): `Blogs()`, `Blogs.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (2 nodes): `Home()`, `Home.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (2 nodes): `test_api_e2e.py`, `test_e2e_ingest_and_chat_flow()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (2 nodes): `test_main_root.py`, `test_root_route_exposes_backend_info()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (2 nodes): `Robots Sitemap Declaration`, `SEO Metadata and Structured Data`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (2 nodes): `Graphify Agent Rules`, `Graph Report Summary`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (2 nodes): `Retro CRT 'Sahil' icon (96x96 favicon)`, `Retro CRT 'Sahil' icon (96x96 favicon)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (2 nodes): `Retro CRT 'Sahil' icon (SVG with embedded raster image)`, `Retro CRT 'Sahil' icon (SVG with embedded raster image)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (2 nodes): `Retro CRT 'Sahil' icon (16x16 favicon)`, `Retro CRT 'Sahil' icon (16x16 favicon)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (1 nodes): `tailwind.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (1 nodes): `index.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `setupProxy.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (1 nodes): `sphereFragShader.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `sphereVertShader.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (1 nodes): `SponsorButton.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `button.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `data.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `getName.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `blogPosts.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `blogs.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `projects.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `certifications.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `terminal.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `sync-content Script`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `npm start Command`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (1 nodes): `npm run build Command`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (1 nodes): `Assistant Backend Architecture`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `Hybrid Retrieval RRF Reranker Pipeline`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `Citation Grounded Response Model`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Public Resume PDF Asset` and `Root Resume PDF Asset`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `AssistantService` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `DocumentRecord` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `ContentChunk` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `AssistantService` (e.g. with `Settings` and `ContentChunk`) actually correct?**
  _`AssistantService` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `DocumentRecord` (e.g. with `Citation` and `ChatResult`) actually correct?**
  _`DocumentRecord` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `ContentChunk` (e.g. with `Citation` and `ChatResult`) actually correct?**
  _`ContentChunk` has 8 INFERRED edges - model-reasoned connections that need verification._