# Project Status

## Current State
Functional prototype with automated content management. All core sections (Terminal, Projects, Certifications, Blogs) are implemented and data-driven. The entire UI features consistent Apple-style glassmorphism with optimized site-wide text and button contrast. Recent updates include a premium horizontal blog card split layout with animated vector network graphics covers (matching user screenshot spec), high-contrast text styling for all themes, a new blog post explaining micro-ROS and XRCE-DDS, and a conversational AI Assistant upgrade with friendly LLM routing and greeting detection.

Backend assistant service is implemented under `backend/` with working ingest/chat/health endpoints, a root info route, CORS support, and passing backend tests.

## Known Issues
- [x] SEO Optimization: Dynamic sitemaps, page-specific Helmet metadata, and JSON-LD schemas have been implemented and validated via static crawl. (Resolved: 2026-05-27)
- [x] Blog Card Layout: Redesigned the blog post list to match a split 2-column layout with animated network graphic covers and orange titles. (Resolved: 2026-05-27)
- [ ] Duplicate `resume.pdf` in project root (identical copy of `public/resume.pdf`) — root copy unused, safe to remove
- [ ] Frontend bundle 291KB gzipped — could benefit from code-splitting Three.js

## Versioning
- **Current Version**: 1.3.1 (Blog Card Split Layout & Button Contrast Release)
- **Stability**: Production Ready

