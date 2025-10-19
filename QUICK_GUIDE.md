# 🎯 Super Simple Method: Adding Content

## Adding a Project (30 seconds!)

```
Step 1: Open src/data/projects.js
   ↓
Step 2: Copy this:
   {
     id: 1,
     title: "My Project",
     description: "What it does...",
     technologies: ["React", "Node.js"],
     link: "https://myproject.com",
     github: "https://github.com/me/project",
   },
   ↓
Step 3: Change the values to YOUR project
   ↓
Step 4: Save file
   ↓
✅ DONE! Your project appears instantly!
```

---

## Adding a Blog Post (1 minute!)

```
Step 1: Open src/data/blogs.js
   ↓
Step 2: Add this:
   {
     id: 1,
     title: "My Blog Title",
     date: "October 19, 2025",
     excerpt: "Summary...",
     slug: "my-blog-title",  ← Remember this!
     tags: ["JavaScript"],
   },
   ↓
Step 3: Open src/data/blogPosts.js
   ↓
Step 4: Add this (use SAME slug):
   "my-blog-title": {  ← Same as above!
     id: 1,
     title: "My Blog Title",
     date: "October 19, 2025",
     author: "Your Name",
     tags: ["JavaScript"],
     readTime: "5 min read",
     content: `Your blog text here...`,
   },
   ↓
Step 5: Save both files
   ↓
✅ DONE! Your blog is live!
```

---

## File Locations (Quick Reference)

```
new-portfolio/
└── src/
    └── data/
        ├── projects.js       ← Add projects here
        ├── blogs.js          ← Add blog summaries here
        └── blogPosts.js      ← Add full blog content here
```

---

## Rules (Only 3!)

1. **Use unique IDs** - Each item needs different number (1, 2, 3...)
2. **Match slugs** - Blog slug must be same in both files
3. **Save files** - Remember to save after editing!

---

## That's It!

No complicated setup. No database. Just:

1. Open file
2. Add content
3. Save

**Need detailed examples?** Check `ADDING_CONTENT.md`
