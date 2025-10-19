// ============================================================================
// HOW TO ADD FULL BLOG POST CONTENT
// ============================================================================
//
// For each blog post, add an entry with the slug as the key:
//
// "your-blog-slug": {
//   id: 1,
//   title: "Your Blog Title",
//   date: "October 19, 2025",
//   author: "Your Name",
//   tags: ["Tag1", "Tag2"],
//   readTime: "5 min read",
//   content: `
// Your blog content goes here...
//
// ## This is a heading
//
// This is a paragraph with **bold text** and \`inline code\`.
//
// \`\`\`javascript
// // Code block
// const example = "code";
// \`\`\`
//
// - Bullet point 1
// - Bullet point 2
//
// > This is a quote or tip
//   `,
// }
//
// FORMATTING TIPS:
// - Use ## for main headings (H2)
// - Use ### for sub-headings (H3)
// - Use **text** for bold
// - Use \`code\` for inline code
// - Use \`\`\` for code blocks
// - Use - for bullet points
// - Use > for quotes/tips
// - Leave blank lines between paragraphs
//
// Example:
// "getting-started-with-react": {
//   id: 1,
//   title: "Getting Started with React",
//   date: "October 19, 2025",
//   author: "Sahil Kumar",
//   tags: ["React", "JavaScript", "Tutorial"],
//   readTime: "8 min read",
//   content: \`
// React is a powerful JavaScript library for building user interfaces.
//
// ## Why React?
//
// React makes it easy to build interactive UIs. Here are the main benefits:
// - Component-based architecture
// - Fast and efficient
// - Large community
//
// ## Your First Component
//
// Here's a simple React component:
//
// \\\`\\\`\\\`javascript
// function Welcome() {
//   return <h1>Hello, React!</h1>;
// }
// \\\`\\\`\\\`
//
// > Pro Tip: Start small and gradually build more complex projects!
//   \`,
// }
//
// For detailed guide, check ADDING_CONTENT.md or QUICK_GUIDE.md
// ============================================================================

export const blogPosts = {
  // ADD YOUR FULL BLOG POSTS HERE
  // The key (slug) must match the slug in blogs.js
};
