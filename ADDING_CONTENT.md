# 📝 Quick Guide: Adding Content to Your Portfolio

This guide shows you the **easiest way** to add projects and blog posts to your portfolio.

---

## 🚀 Adding Projects (Super Simple!)

### Step 1: Open the file

Open `src/data/projects.js` in your code editor (VS Code, etc.)

### Step 2: Copy & Paste this template

**For Top Projects (your best work):**

```javascript
{
  id: 1,
  title: "Project Name Here",
  description: "Describe what your project does in 2-3 sentences. Be clear and engaging!",
  technologies: ["React", "Node.js", "MongoDB"],  // List all tech used
  link: "https://myproject.com",                   // Live demo URL
  github: "https://github.com/username/repo",      // GitHub repo
},
```

**For Step Projects (learning projects):**
Same template, just add it to the `stepProjects` array instead.

### Step 3: Fill in YOUR details

- Change the `id` to a unique number (1, 2, 3, etc.)
- Add your project title
- Write a brief description
- List technologies you used
- Add your links (use `"#"` if you don't have a link yet)

### Example:

```javascript
export const topProjects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description:
      "Built a full-featured online store with shopping cart, payment integration, and admin dashboard. Handles 100+ products with smooth performance.",
    technologies: ["React", "Node.js", "Stripe", "MongoDB"],
    link: "https://mystore.com",
    github: "https://github.com/myusername/store",
  },
  {
    id: 2,
    title: "Weather App",
    description:
      "Real-time weather application with location detection and 7-day forecast. Clean UI with animated weather icons.",
    technologies: ["React", "OpenWeather API", "CSS3"],
    link: "https://myweather.netlify.app",
    github: "https://github.com/myusername/weather-app",
  },
];
```

### That's it! Save the file and your projects appear! ✅

---

## 📰 Adding Blog Posts (2 Easy Steps!)

Blog posts require updating **2 files** (but it's super easy!)

### Step 1: Add Blog Preview (what people see on /blogs page)

Open `src/data/blogs.js` and add:

```javascript
{
  id: 1,
  title: "My First Blog Post",
  date: "October 19, 2025",                    // Publication date
  excerpt: "Short summary of your post...",    // 2-3 sentence preview
  slug: "my-first-blog-post",                  // URL-friendly (lowercase, hyphens only)
  tags: ["JavaScript", "Tutorial"],            // Topic tags
},
```

**Important:** The `slug` is what appears in the URL: `/blog/my-first-blog-post`

### Step 2: Add Full Blog Content

Open `src/data/blogPosts.js` and add:

```javascript
"my-first-blog-post": {  // ⚠️ MUST match the slug from Step 1
  id: 1,
  title: "My First Blog Post",
  date: "October 19, 2025",
  author: "Your Name",
  tags: ["JavaScript", "Tutorial"],
  readTime: "5 min read",
  content: `
Your blog content goes here. You can write normally.

## Use This for Main Headings

Just write paragraphs normally. **Make text bold** like this.
Use \`inline code\` for technical terms.

### This is a smaller heading

You can make lists:
- Point one
- Point two
- Point three

Or numbered lists:
1. First step
2. Second step
3. Third step

\`\`\`javascript
// Add code blocks like this
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> Add tips or important notes in quotes like this!

Write as much as you want. Just keep the format simple.
  `,
},
```

### Complete Blog Example:

**In blogs.js:**

```javascript
export const blogs = [
  {
    id: 1,
    title: "Getting Started with React",
    date: "October 19, 2025",
    excerpt:
      "Learn the basics of React in this beginner-friendly tutorial. We'll build a simple app together and cover all the fundamentals.",
    slug: "getting-started-with-react",
    tags: ["React", "JavaScript", "Beginner"],
  },
];
```

**In blogPosts.js:**

```javascript
export const blogPosts = {
  "getting-started-with-react": {
    id: 1,
    title: "Getting Started with React",
    date: "October 19, 2025",
    author: "Sahil Kumar",
    tags: ["React", "JavaScript", "Beginner"],
    readTime: "8 min read",
    content: `
React is a powerful JavaScript library for building user interfaces. In this tutorial, we'll learn the basics.

## Why React?

React makes it easy to build interactive UIs. Here are the main benefits:
- Component-based architecture
- Fast and efficient
- Large community and ecosystem
- Easy to learn

## Your First Component

Here's a simple React component:

\`\`\`javascript
function Welcome() {
  return <h1>Hello, React!</h1>;
}
\`\`\`

This component displays a greeting. Simple, right?

## Next Steps

Now that you know the basics:
1. Practice building small components
2. Learn about props and state
3. Build a complete app

> Pro Tip: Start small and gradually build more complex projects!
    `,
  },
};
```

---

## 📋 Quick Checklist

### Before adding a project:

- [ ] Choose unique `id` number
- [ ] Write clear description (2-3 sentences)
- [ ] List all technologies used
- [ ] Have links ready (or use `"#"`)

### Before adding a blog:

- [ ] Create unique `slug` (lowercase, hyphens)
- [ ] Write engaging excerpt (2-3 sentences)
- [ ] Write full content with headings
- [ ] Same `slug` in both files
- [ ] Choose relevant tags

---

## 🎨 Formatting Quick Reference

| What you want     | How to write it                 |
| ----------------- | ------------------------------- |
| **Main heading**  | `## Heading Text`               |
| **Sub heading**   | `### Heading Text`              |
| **Bold text**     | `**bold words**`                |
| **Inline code**   | `` `code here` ``               |
| **Code block**    | `javascript<br/>code here<br/>` |
| **Bullet list**   | `- Item`                        |
| **Numbered list** | `1. Item`                       |
| **Quote/Tip**     | `> Your tip here`               |

---

## ⚡ Pro Tips

1. **Projects:**

   - Add projects as you build them
   - Update descriptions when you add features
   - Put your best work in `topProjects`
   - Put learning projects in `stepProjects`

2. **Blogs:**

   - Write content in your editor first
   - Keep slugs simple (e.g., "react-tutorial")
   - Use headings to organize long posts
   - Add code examples for technical posts

3. **Both:**
   - Save files after editing
   - Check for typos before saving
   - Use descriptive titles
   - Add relevant tags

---

## 🆘 Common Mistakes to Avoid

❌ **DON'T:**

- Use the same `id` twice
- Forget quotes around strings
- Use spaces in slugs (use hyphens: `my-post` not `my post`)
- Forget commas between items in arrays
- Mismatch slugs between blogs.js and blogPosts.js

✅ **DO:**

- Keep ids sequential (1, 2, 3...)
- Use double quotes `"text"` or backticks for content
- Test links before adding them
- Write clear descriptions
- Save both files when adding blogs

---

## 📱 Testing Your Content

After adding content:

1. **Save all files**
2. **Refresh your browser**
3. **Check:**
   - Projects appear on `/projects`
   - Blogs appear on `/blogs`
   - Blog posts open when clicked
   - All links work

---

## 🎯 Quick Start Templates

### Copy-Paste Project Template:

```javascript
{
  id: 1,  // CHANGE THIS
  title: "YOUR PROJECT NAME",
  description: "What does it do? What makes it special? Any impressive features?",
  technologies: ["Tech1", "Tech2", "Tech3"],
  link: "https://yourproject.com",
  github: "https://github.com/username/project",
},
```

### Copy-Paste Blog Template:

**blogs.js:**

```javascript
{
  id: 1,  // CHANGE THIS
  title: "YOUR BLOG TITLE",
  date: "October 19, 2025",  // CHANGE THIS
  excerpt: "Brief summary that makes people want to read more...",
  slug: "your-blog-title",  // CHANGE THIS
  tags: ["Tag1", "Tag2"],  // CHANGE THIS
},
```

**blogPosts.js:**

```javascript
"your-blog-title": {  // MUST MATCH SLUG ABOVE
  id: 1,  // CHANGE THIS
  title: "YOUR BLOG TITLE",
  date: "October 19, 2025",
  author: "Your Name",
  tags: ["Tag1", "Tag2"],
  readTime: "X min read",
  content: `
Write your blog content here...

## Add Headings Like This

Write normally. Make things **bold**. Add \`code\`.

\`\`\`javascript
// Code blocks
console.log("Hello!");
\`\`\`
  `,
},
```

---

## 🚀 You're Ready!

That's all you need to know. The system is designed to be simple:

1. Open the right file
2. Copy a template
3. Fill in your content
4. Save

Your content will appear automatically! No database, no complex setup, just edit and go! 🎉

---

**Questions?** Check the files for examples or refer back to this guide anytime.
