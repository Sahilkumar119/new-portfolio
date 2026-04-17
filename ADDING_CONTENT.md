# 📝 Detailed Guide: Adding Content (Automated Workflow)

This guide shows you how to add projects, blog posts, and certifications using the **Automated Content System**.

You **do not** need to edit JavaScript files anymore!

---

## 🚀 Adding Projects

Drop a new `.json` file into the `content/projects/` directory.

**Example: `content/projects/ecommerce.json`**

```json
{
  "title": "E-Commerce Website",
  "description": "A full-featured online store with shopping cart and payment integration.",
  "technologies": ["React", "Node.js", "Stripe"],
  "link": "https://mystore.com",
  "github": "https://github.com/myusername/store",
  "type": "top" 
}
```

*Note: Use `"type": "top"` for your best work, and `"type": "step"` for learning projects.*

---

## 📰 Adding Blog Posts

Drop a new `.md` (Markdown) file into the `content/blogs/` directory. The system will read the YAML frontmatter at the top of the file for metadata.

**Example: `content/blogs/my-first-post.md`**

```markdown
---
title: "My First Blog Post"
date: "October 19, 2025"
author: "Your Name"
tags: ["JavaScript", "Tutorial"]
excerpt: "A short summary of what this post is about."
slug: "my-first-blog-post"
readTime: "5 min read"
---

Your blog content goes here. You can write normally.

## Use This for Main Headings

Just write paragraphs normally. **Make text bold** like this.
Use \`inline code\` for technical terms.

### This is a smaller heading

You can make lists:
- Point one
- Point two

\`\`\`javascript
// Add code blocks like this
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> Add tips or important notes in quotes like this!
```

**Tips:**
- The `slug` must be unique. If omitted, the script will generate one from the title.
- The `excerpt` and `readTime` are optional and will be auto-generated if omitted.

---

## 🎓 Adding Certifications

Drop a new `.json` file into the `content/certifications/` directory.

**Example: `content/certifications/aws-certified.json`**

```json
{
  "title": "AWS Certified Solutions Architect",
  "issuer": "Amazon Web Services",
  "date": "2024"
}
```

---

## ⚡ How it Works

The project uses a Node.js script (`scripts/sync-content.js`) that automatically runs whenever you start the development server (`npm start`) or build the project (`npm run build`). 

The script reads your `.md` and `.json` files in the `content/` folder and automatically generates the necessary `src/data/*.js` files for the React frontend to consume.

If there is an error (e.g., malformed JSON or missing frontmatter), the script will log a warning in the terminal and skip the file rather than crashing your entire build.
