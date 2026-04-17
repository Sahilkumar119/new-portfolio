# Architecture

## System Overview
The project is a React-based single-page application (SPA) designed as a personal portfolio. It features a heavy emphasis on visual aesthetics through Three.js and Material UI.

## Data Layer
- **Automated Ingestion**: Content is authored in Markdown (blogs) and JSON (projects, certifications) within the root `content/` directory.
- **Sync Script**: `scripts/sync-content.js` runs pre-build to transform raw content into ESM-compatible JavaScript files in `src/data/`.
- **Static Assets**: Images and PDFs are served from the `public/` directory.

## Frontend Architecture
- **Pages**: Defined in `src/pages/`. The `Home` page is the primary entry point, using section IDs for navigation.
- **Components**: Atomic and composite UI components in `src/components/`.
- **Theming**: Custom ThemeProvider wrapping the app to handle Light/Dark mode transitions via CSS variables and Material UI's theme object.
- **Routing**: `react-router-dom` v5 handles deep linking for blog posts.

## Deployment
- Optimized for **Vercel** with static snapshots (`react-snapshot`) for SEO.
