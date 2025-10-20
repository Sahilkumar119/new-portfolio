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
  "software-3-karpathy": {
    id: 1,
    title: "Andrej Karpathy Just Redefined Software, and It Blew My Mind",
    date: "October 20, 2025",
    author: "Archie",
    tags: ["Software 3.0", "AI", "LLM", "Andrej Karpathy"],
    readTime: "5 min read",
    content: `
I just watched a talk by Andrej Karpathy (formerly of Tesla and OpenAI), and I have to say, it's fundamentally shifted how I see the future of coding. He argues that we're in the middle of a massive change, the biggest in 70 years. He calls it **Software 3.0**.

If you're a developer, an engineering student, or just tech savvy, this is a concept you need to understand.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/LCEmiRjPEtQ" title="Andrej Karpathy on Software 3.0" style="border: 0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
  <p>Your browser does not support iframes. <a href="https://www.youtube.com/watch?v=LCEmiRjPEtQ" target="_blank" rel="noopener noreferrer">Watch the video on YouTube</a>.</p>
</iframe>

## The Evolution: From 1.0 to 3.0

Karpathy's breakdown is brilliant in its simplicity. I believe he's nailed it:

- **Software 1.0:** This is the code we write by hand. \`if/else\` statements, functions, classes. It's the world of Python, C++, and Java that we all know.
- **Software 2.0:** This was the deep learning revolution. The "program" isn't our script; it's the millions of weights in a trained neural network. We became curators of data, not just writers of logic.
- **Software 3.0:** This is the new frontier, and it's powered by LLMs. Here, the computer itself is a general purpose reasoning engine. And the programming language? **English.** A simple prompt is now a program.

## LLMs Aren't Just Tools—They're a New Kind of OS

This is the part that really clicked for me. Karpathy suggests we stop thinking of LLMs as just another API. We should see them as a new kind of Operating System.

- The **LLM** is the CPU.
- The **Context Window** is its RAM.
- **Prompting** is like using the command line.

We're basically back in the 1960s mainframe era—compute is expensive, centralized, and we're all just "time sharing" on a massive, intelligent machine. From this perspective, it all makes sense.

## The Superhuman Intern with Amnesia

So, what are we programming? Karpathy calls LLMs "people spirits"—stochastic simulations of humans. I agree, and that means they come with some serious quirks.

They have superpowers (encyclopedic knowledge) but also huge deficits: they hallucinate, are terrible at simple logic, and, most importantly, **they have no long term memory.** Every conversation starts from scratch. They are brilliant but flawed, like a superhuman intern who forgets everything every morning.

## The Real Opportunity: Iron Man Suits, Not a Robot Army

So, if full automation is still a long way off, what's our job now?

Karpathy's answer is perfect: we should be building **Iron Man suits, not an army of Iron Man robots.**

We need to create tools that *augment* humans, not replace them. Think of the coding assistant Cursor—it gives the developer an "autonomy slider." You can ask for a little help or a lot, but you are always in control.

The goal is to speed up the **generation verification loop**. Let the AI generate, but make it incredibly fast and easy for a human to verify. This is where great UI/UX becomes more important than ever. A visual diff in a code editor is infinitely better than a wall of text from a chatbot.

## My Final Take

Karpathy's talk confirmed what many of us have been feeling: the ground is shifting beneath our feet. Our job is evolving from just writing code to architecting human-AI systems. We need to build our apps, our docs, and our APIs to be understood by both humans and these new "people spirits."

It's a massive challenge, but I find it incredibly exciting.

**What do you think?** Are you already building "Iron Man suits"? Is Software 3.0 just hype, or is it the future?
`,
  },
};
