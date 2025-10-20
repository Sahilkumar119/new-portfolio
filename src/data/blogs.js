// ============================================================================
// HOW TO ADD YOUR BLOG POSTS
// ============================================================================
//
// For blog list items (shown on /blogs page):
//
// {
//   id: 1,                            // Unique number for each blog
//   title: "Your Blog Title",         // Blog post title
//   date: "October 19, 2025",        // Publication date
//   excerpt: "Short description...",  // 2-3 sentence summary
//   slug: "your-blog-title",         // URL-friendly version (lowercase, hyphens)
//   tags: ["Tag1", "Tag2"],          // Array of relevant tags
// }
//
// IMPORTANT: The slug must match the key in blogPosts object in blogPosts.js
//
// Example:
// {
//   id: 1,
//   title: "Getting Started with React",
//   date: "October 19, 2025",
//   excerpt: "Learn the basics of React in this beginner-friendly tutorial. We'll build a simple app together.",
//   slug: "getting-started-with-react",
//   tags: ["React", "JavaScript", "Tutorial"],
// }
//
// For detailed guide, check ADDING_CONTENT.md or QUICK_GUIDE.md
// ============================================================================

export const blogs = [
  {
    id: 1,
    title: "Andrej Karpathy Just Redefined Software, and It Blew My Mind",
    date: "October 20, 2025",
    excerpt:
      "I just watched a talk by Andrej Karpathy that fundamentally shifted how I see the future of coding. He argues that we're in the middle of the biggest change in 70 years. He calls it Software 3.0.",
    slug: "software-3-karpathy",
    tags: ["Software 3.0", "AI", "LLM", "Andrej Karpathy"],
  },
];
