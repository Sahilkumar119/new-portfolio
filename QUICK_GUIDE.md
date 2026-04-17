# 🎯 Quick Guide: Content Automation

Adding content to your portfolio is now fully automated! Just drop files into the `content/` folder.

## 1. Adding a Project (JSON)

Create a file like `content/projects/my-project.json`:

```json
{
  "title": "My Awesome App",
  "description": "What it does...",
  "technologies": ["React", "Node.js"],
  "link": "https://myapp.com",
  "github": "https://github.com/me/app",
  "type": "top" 
}
```
*(Use `"type": "step"` for minor/learning projects)*

---

## 2. Adding a Blog Post (Markdown)

Create a file like `content/blogs/my-blog.md`:

```markdown
---
title: "My Awesome Blog Post"
date: "2026-04-17"
tags: ["React", "Coding"]
---

Write your full blog content here using **standard Markdown**!
```

---

## 3. Adding a Certification (JSON)

Create a file like `content/certifications/my-cert.json`:

```json
{
  "title": "React Developer Certificate",
  "issuer": "Meta",
  "date": "2026"
}
```

---

## Syncing Changes
You don't need to run any special commands. Just start your development server as usual:

```bash
npm start
```

The sync script (`scripts/sync-content.js`) runs automatically and securely updates the frontend data. If you make a mistake in a file, the terminal will warn you without crashing the app.
