# GEMINI.md

This file provides context and instructions for the Gemini CLI agent when working with the **personal-website-react** project.

## Project Overview
This project is a clean, customizable portfolio template for developers built with **React**. It features a single-page scrolling architecture with interactive elements like a Three.js background, a simulated Linux terminal, and dynamic content sections.

### Key Technologies
- **Frontend Framework**: React (v16.13.1)
- **UI Library**: Material UI (v4.x)
- **Background Effects**: Three.js
- **Routing**: React Router DOM (v5.2.0)
- **Content Management**: Static JSON/JS data files
- **Animations**: Popmotion, React Transition Group, React Typical
- **Metadata**: React Helmet

## Getting Started

### Development Commands
- **Start Development Server**: `npm start` (Runs the app at `http://localhost:3000`)
- **Build for Production**: `npm run build` (Creates a `build` folder with optimized assets)
- **Run Tests**: `npm test` (Launches the test runner)
- **Eject**: `npm run eject` (One-way operation to expose configuration)

### Building and Deployment
The project is configured for deployment on platforms like Vercel (see `vercel.json`). It uses `react-snapshot` for static site generation to improve SEO and performance.

## Content Automation System

You can now update your portfolio without editing any JavaScript code. Simply drop files into the `content/` folder.

### How to use:
1.  **Blogs**: Add a `.md` file to `content/blogs/`. Use the YAML frontmatter for metadata (title, date, tags, etc.).
2.  **Projects**: Add a `.json` file to `content/projects/`. Use `"type": "top"` or `"type": "step"` to categorize.
3.  **Certifications**: Add a `.json` file to `content/certifications/`.

### Automation Script:
- **Command**: `npm run sync` (automatically runs on `npm start` and `npm run build`).
- **Script**: `scripts/sync-content.js`.
- **Dependencies**: Uses `gray-matter` for markdown parsing.

---

## Project Structure
```text
content/               # NEW: Drop your .md and .json files here!
├── blogs/
├── projects/
└── certifications/
scripts/
└── sync-content.js    # NEW: The automation engine
src/
├── app/               # Application-level components (App.js, HelmetMeta)
├── components/        # Reusable UI components
│   ├── background/    # Three.js DisplacementSphere
│   ├── content/       # Page sections (AIProjects, LinuxTerminal, etc.)
│   ├── theme/         # ThemeProvider and ThemeToggle
│   └── ...
├── data/              # Static content definitions (Auto-generated!)
│   ├── projects.js    # Project list
│   ├── blogs.js       # Blog summaries
│   ├── blogPosts.js   # Full blog content
│   └── certifications.js # Certifications list
├── pages/             # Main view components
├── settings/          # Global configuration (resume.json, settings.json)
├── hooks/             # Custom React hooks
└── utils/             # Helper functions and Three.js utilities
```

## Development Conventions

### Content Management
The portfolio is data-driven. To update content, modify the files in `src/data/` and `src/settings/`:

1.  **Personal Information**: Edit `src/settings/resume.json` and `src/settings/settings.json`.
2.  **Projects**: Add new project objects to `src/data/projects.js`.
3.  **Blogs**: 
    - Add a summary to `src/data/blogs.js` with a unique `slug`.
    - Add the full post content to `src/data/blogPosts.js` using the *same slug* as the key.

### Styling
- **Material UI**: The project uses `makeStyles` (JSS) for component-level styling.
- **Global Styles**: Defined in `src/index.css`.
- **Themes**: Support for Light and Dark modes is handled via `ThemeProvider`.

### Performance & SEO
- Use `lazy` and `Suspense` for page-level component loading.
- Update metadata in `src/app/HelmetMeta.js` or via the `basics` section in `src/settings/resume.json`.

## Documentation Reference
For detailed instructions, refer to:
- `README.md`: General info.
- `ADDING_CONTENT.md`: Detailed guide for adding projects and blogs.
- `QUICK_GUIDE.md`: Short version of the setup guide.
- `CLAUDE.md`: Guidance for Claude Code interactions.
