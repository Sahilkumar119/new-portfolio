// Course catalogue for the /learn page.
//
// Hand-authored config (NOT a generated `src/data/` file — safe to edit).
// Each course drives one giant name in the scroll list, its accent colour,
// the page tint when it's active, and the logo that slides in from the side.
//
// `status: "live"`  -> name is a link to `href` (a static course under public/).
// `status: "soon"`  -> name shows a "Coming soon" tag and is not clickable.
//
// Logos are monochrome SVGs in public/images/learn/. They are tinted to each
// course's accent at render time via CSS `mask` (see CourseVisual), so they
// stay crisp at any size and recolour for free.

export const COURSES = [
  {
    slug: "docker",
    name: "Docker",
    accent: "#2496ED",
    tint: "#e9f2fc",
    text: "#0a1a2f",
    blurb:
      "Containers from first principles — images, Dockerfiles, volumes, networking, Compose, registries, and security. Eight hands-on modules.",
    status: "live",
    href: "/learn/docker/",
    logo: "/images/learn/docker.svg",
  },
  {
    slug: "sql",
    name: "SQL",
    accent: "#E48E00",
    tint: "#fbf3e6",
    text: "#2a1c05",
    blurb:
      "Query data like you mean it — joins, aggregation, subqueries and CTEs, window functions, and the indexing intuition behind fast queries. Six hands-on modules.",
    status: "live",
    href: "/learn/sql/",
    logo: "/images/learn/sql.svg",
  },
  {
    slug: "linux",
    name: "Linux",
    accent: "#1E66F5",
    tint: "#e8f0ff",
    text: "#0a1733",
    blurb:
      "Live in the terminal — navigating the filesystem, finding things, permissions, processes, packages, networking, services, and the shell. One field guide, eleven sections.",
    status: "live",
    href: "/learn/linux/",
    logo: "/images/learn/linux.svg",
    fullColor: true,
  },
  {
    slug: "kubernetes",
    name: "Kubernetes",
    accent: "#326CE5",
    tint: "#e9edfb",
    text: "#0a1430",
    blurb:
      "Orchestrate containers at scale — pods, deployments, services, scaling, and self-healing.",
    status: "soon",
    logo: "/images/learn/kubernetes.svg",
  },
  {
    slug: "git",
    name: "Git",
    accent: "#F05133",
    tint: "#fbeee9",
    text: "#2a1206",
    blurb:
      "Version control that finally clicks — branches, merges, rebases, and history surgery.",
    status: "soon",
    logo: "/images/learn/git.svg",
  },
  {
    slug: "system-design",
    name: "System Design",
    accent: "#8B5CF6",
    tint: "#f1ecfb",
    text: "#1a0f30",
    blurb:
      "Design systems that scale — load balancing, caching, sharding, queues, and the trade-offs behind them.",
    status: "soon",
    logo: "/images/learn/system-design.svg",
  },
];
