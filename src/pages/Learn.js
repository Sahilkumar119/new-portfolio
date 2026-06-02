import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Resume from "../settings/resume.json";
import { COURSES } from "../components/learn/courses";
import { CourseList } from "../components/learn/CourseList";
import { CourseVisual } from "../components/learn/CourseVisual";

const SITE = Resume.basics.url || "https://sahilkumar.dev";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  // Full-screen colour wash that animates as the active course changes.
  tint: {
    position: "fixed",
    inset: 0,
    zIndex: -2,
    transition: "background-color 600ms cubic-bezier(.16,1,.3,1)",
    "@media (prefers-reduced-motion: reduce)": {
      transition: "background-color 160ms linear",
    },
  },
  // Faint oversized course name sitting behind everything (desktop flair).
  watermark: {
    position: "fixed",
    right: "-2vw",
    bottom: "-6vh",
    zIndex: -1,
    fontFamily: '"Inter", system-ui, sans-serif',
    fontWeight: 800,
    fontSize: "26vw",
    letterSpacing: "-0.04em",
    lineHeight: 1,
    opacity: 0.04,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    userSelect: "none",
    transition: "color 600ms ease",
    [theme.breakpoints.down("sm")]: { display: "none" },
  },
  header: {
    position: "fixed",
    top: "2rem",
    left: "2.5rem",
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("xs")]: { left: "1.25rem", top: "1.25rem" },
  },
  back: {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: "0.95rem",
    textDecoration: "none",
    color: "inherit",
    opacity: 0.7,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4em",
    transition: "opacity 200ms",
    "&:hover": { opacity: 1 },
  },
  eyebrow: {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: "0.95rem",
    opacity: 0.45,
    paddingLeft: "1rem",
    borderLeft: "1px solid currentColor",
  },
  content: {
    position: "relative",
    zIndex: 2,
    paddingLeft: "max(2.5rem, 6vw)",
    [theme.breakpoints.down("xs")]: { paddingLeft: "1.25rem" },
  },
  // Sub-headline blurb under the names, tied to the active course.
  blurb: {
    position: "fixed",
    right: "7vw",
    bottom: "2.5rem",
    maxWidth: "32ch",
    textAlign: "right",
    zIndex: 20,
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: "1rem",
    lineHeight: 1.5,
    opacity: 0.72,
    transition: "opacity 300ms ease",
    [theme.breakpoints.down("md")]: { display: "none" },
  },
}), { name: "Learn" });

export const Learn = () => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const active = COURSES[activeIndex] || COURSES[0];

  // Render the interactive body on the client only. react-snapshot prerenders
  // this page without MUI's runtime (JSS) styles, so the static HTML served on
  // direct loads collapsed into a broken, stuck layout. Gating the body behind
  // a mount flag keeps the prerender a clean tinted placeholder and lets the
  // client paint the real, fully styled page (the same path as in-app nav).
  useEffect(() => setMounted(true), []);

  // Direct loads of /learn can restore a stale scroll position from history,
  // which makes the page open in the middle of the course stack. Always start
  // this landing page from the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Warm the cache + force-decode every course logo once on mount. The logos
  // render as CSS masks (see CourseVisual); if the SVG isn't decoded before
  // first reveal the mask paints at the SVG's tiny intrinsic size, then snaps
  // to `mask-size: contain` once decode finishes — the "small then enlarges"
  // flash. Preloading removes that gap.
  useEffect(() => {
    COURSES.forEach((c) => {
      const img = new Image();
      img.src = c.logo;
      if (img.decode) img.decode().catch(() => {});
    });
  }, []);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Courses by Sahil Kumar",
    itemListElement: COURSES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: c.href ? `${SITE}${c.href}` : `${SITE}/learn`,
    })),
  };

  const dockerCourse = COURSES.find((c) => c.slug === "docker");
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Docker from Scratch",
    description: dockerCourse.blurb,
    url: `${SITE}${dockerCourse.href}`,
    provider: {
      "@type": "Person",
      name: Resume.basics.name,
      url: SITE,
    },
  };

  return (
    <div
      className={classes.root}
      style={{ color: active.text, backgroundColor: active.tint, minHeight: "100vh" }}
    >
      <Helmet>
        <html lang="en" />
        <title>Learn — Docker, Kubernetes, Git &amp; System Design | {Resume.basics.name}</title>
        <meta
          name="description"
          content="Hands-on engineering courses by Sahil Kumar — Docker from first principles, with Kubernetes, Git, and System Design on the way."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE}/learn`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/learn`} />
        <meta property="og:title" content={`Learn | ${Resume.basics.name}`} />
        <meta
          property="og:description"
          content="Hands-on engineering courses — Docker, Kubernetes, Git, System Design."
        />
        <meta property="og:image" content={`${SITE}/android-chrome-512x512.png`} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`Learn | ${Resume.basics.name}`} />
        <meta
          property="twitter:description"
          content="Hands-on engineering courses — Docker, Kubernetes, Git, System Design."
        />
        <meta property="twitter:image" content={`${SITE}/android-chrome-512x512.png`} />

        {/* Inter — the bpowell-style display face for the names. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
          rel="stylesheet"
        />

        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
      </Helmet>

      {mounted && (
        <>
          <div className={classes.tint} style={{ backgroundColor: active.tint }} aria-hidden="true" />
          <div className={classes.watermark} style={{ color: active.accent }} aria-hidden="true">
            {active.name}
          </div>

          <header className={classes.header}>
            <Link to="/" className={classes.back}>
              ← Portfolio
            </Link>
            <span className={classes.eyebrow}>Learn</span>
          </header>

          <CourseVisual course={active} />

          <main className={classes.content}>
            <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              Learn, courses by {Resume.basics.name}
            </h1>
            <CourseList
              courses={COURSES}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </main>

          <p className={classes.blurb} style={{ color: active.text }}>
            {active.blurb}
          </p>
        </>
      )}
    </div>
  );
};

export default Learn;
