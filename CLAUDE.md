# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
This project uses Create React App (`react-scripts`).

*   **Development Server**: `npm start`
*   **Build for Production**: `npm run build`
*   **Run Tests**: `npm test`
*   **Eject**: `npm run eject` (Use with caution)

## Code Architecture

This is a React portfolio application. Key directories include:

*   `src/components`: Reusable UI components.
*   `src/pages`: Top-level page components representing different views (e.g., Home, About, Projects).
*   `src/data`: Contains the static data powering the portfolio content.
    *   `src/data/projects.js`: Project definitions.
    *   `src/data/blogs.js`: Blog post summaries.
    *   `src/data/blogPosts.js`: Full blog post content.
*   `src/hooks`: Custom React hooks.
*   `src/utils`: Helper functions and utilities.
*   `src/settings`: Configuration files.
*   `src/app`: Application level configurations or wrappers.

## Content Management Workflow
The portfolio relies on static data files rather than a backend database. When adding new content, follow these conventions:

*   **Projects**: Add new entries to `src/data/projects.js`. Ensure each project has a unique `id`.
*   **Blog Posts**: Adding a blog post requires updating two files:
    1.  Add a summary entry to `src/data/blogs.js`, including a unique `slug`.
    2.  Add the full content entry to `src/data/blogPosts.js` using the *exact same* `slug` as the key. Ensure the `id` is also unique.

Refer to `QUICK_GUIDE.md` or `ADDING_CONTENT.md` for more detailed examples of adding content.
