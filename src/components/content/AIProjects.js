import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { topProjects } from "../../data/projects";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const VISIBLE_COUNT = 6;

const useStyles = makeStyles(() => ({
    section: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "8rem",
        paddingBottom: "4rem",
        paddingLeft: "clamp(4rem, 8vw, 8rem)",
        paddingRight: "clamp(4rem, 8vw, 8rem)",
        position: "relative",
    },
    header: {
        marginBottom: "2rem",
        textAlign: "center",
        flexShrink: 0,
    },
    eyebrow: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--accent-primary)",
        display: "block",
        marginBottom: "1rem",
    },
    title: {
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        color: "var(--text-primary)",
        margin: 0,
    },
    // --- Segmented capsule toggle ---
    capsule: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        margin: "1.75rem auto 3rem",
        padding: "4px",
        borderRadius: "999px",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
    },
    capsuleIndicator: {
        position: "absolute",
        top: "4px",
        bottom: "4px",
        width: "calc(50% - 4px)",
        borderRadius: "999px",
        background: "var(--accent-primary)",
        transition: "left 280ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: 0,
    },
    capsuleBtn: {
        position: "relative",
        zIndex: 1,
        appearance: "none",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        minWidth: "120px",
        padding: "0.55rem 1.5rem",
        borderRadius: "999px",
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: "var(--text-secondary)",
        transition: "color 220ms ease",
        "&:focus-visible": {
            outline: "2px solid var(--accent-primary)",
            outlineOffset: "3px",
        },
    },
    capsuleBtnActive: {
        color: "#fff",
    },
    // --- Grid + cards ---
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
    },
    card: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        borderRadius: "14px",
        padding: "1.4rem",
        overflow: "hidden",
        boxShadow: "var(--glass-shadow)",
        transition: "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), background 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "8%",
            right: "8%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
            pointerEvents: "none",
            zIndex: 1,
        },
        "&:hover": {
            transform: "translateY(-5px)",
            background: "var(--glass-bg-hover)",
            borderColor: "rgba(10, 132, 255, 0.3)",
            boxShadow: "var(--glass-shadow-hover)",
            textDecoration: "none",
        },
        "&:hover $cardDesc": {
            WebkitLineClamp: "unset",
        },
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "0.75rem",
        marginBottom: "0.75rem",
    },
    cardTitle: {
        fontSize: "1.05rem",
        fontWeight: 700,
        lineHeight: 1.3,
        color: "var(--text-primary)",
        margin: 0,
    },
    cardDesc: {
        fontSize: "0.82rem",
        lineHeight: 1.55,
        color: "var(--text-secondary)",
        margin: "0 0 1.1rem",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        transition: "max-height 350ms ease",
    },
    techRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.4rem",
        marginTop: "auto",
    },
    techToken: {
        fontSize: "0.68rem",
        fontFamily: "'SF Mono', monospace",
        color: "var(--accent-primary)",
        background: "rgba(10, 132, 255, 0.1)",
        padding: "3px 7px",
        borderRadius: "4px",
    },
    links: {
        display: "flex",
        gap: "1rem",
        flexShrink: 0,
    },
    linkIcon: {
        color: "var(--text-tertiary)",
        transition: "color 200ms ease",
        "&:hover": { color: "var(--accent-primary)" },
    },
    // --- Category view ---
    catGroup: {
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto 2.5rem",
    },
    catHeading: {
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        fontSize: "0.8rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-primary)",
        margin: "0 0 1.1rem",
        "&::after": {
            content: '""',
            flex: 1,
            height: "1px",
            background: "var(--glass-border)",
        },
    },
    catCount: {
        fontFamily: "'SF Mono', monospace",
        fontSize: "0.7rem",
        fontWeight: 600,
        color: "var(--accent-primary)",
        background: "rgba(10, 132, 255, 0.1)",
        padding: "2px 8px",
        borderRadius: "999px",
        letterSpacing: 0,
    },
    // --- Blurred peek + See more ---
    peekWrap: {
        position: "relative",
        width: "100%",
        maxWidth: "1100px",
        margin: "1.5rem auto 0",
        maxHeight: "150px",
        overflow: "hidden",
    },
    peekGrid: {
        filter: "blur(3px)",
        opacity: 0.5,
        pointerEvents: "none",
        userSelect: "none",
        transform: "scale(0.98)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
    },
    seeMoreWrap: {
        display: "flex",
        justifyContent: "center",
        marginTop: "1.75rem",
    },
    seeMoreOverlay: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
    },
    seeMoreBtn: {
        appearance: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.7rem 1.5rem",
        borderRadius: "999px",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--text-primary)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        transition: "transform 220ms ease, border-color 220ms ease, background 220ms ease",
        "&:hover": {
            transform: "translateY(-2px)",
            borderColor: "rgba(10, 132, 255, 0.4)",
            background: "var(--glass-bg-hover)",
        },
        "&:focus-visible": {
            outline: "2px solid var(--accent-primary)",
            outlineOffset: "3px",
        },
    },
    chevron: {
        transition: "transform 250ms ease",
    },
    chevronUp: {
        transform: "rotate(180deg)",
    },
    "@media (prefers-reduced-motion: reduce)": {
        capsuleIndicator: { transition: "none" },
        card: { transition: "none" },
        cardDesc: { transition: "none" },
    },
}));

const GithubIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
);

export const AIProjects = () => {
    const classes = useStyles();
    const [sectionRef, visible] = useScrollReveal({ threshold: 0.1 });
    const [view, setView] = useState("all"); // "all" | "category"
    const [expanded, setExpanded] = useState(false);

    const projects = Array.isArray(topProjects) ? topProjects : [];

    const renderCard = (project, i, reveal = true) => (
        <a
            key={project.id ?? i}
            href={project.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`${classes.card}${reveal ? " reveal-child-scale" : ""}`}
            style={reveal ? { "--reveal-delay": i } : undefined}
        >
            <div className={classes.cardHeader}>
                <h3 className={classes.cardTitle}>{project.title}</h3>
                <div className={classes.links}>
                    {project.github && project.github !== "#" && (
                        <span className={classes.linkIcon} aria-label="GitHub repository">
                            <GithubIcon />
                        </span>
                    )}
                </div>
            </div>
            <p className={classes.cardDesc}>{project.description}</p>
            <div className={classes.techRow}>
                {Array.isArray(project.technologies) &&
                    project.technologies.map((tech, idx) => (
                        <span key={idx} className={classes.techToken}>{tech}</span>
                    ))}
            </div>
        </a>
    );

    // Ordered unique categories (preserves project file order)
    const categories = [];
    projects.forEach((p) => {
        const c = p.category || "Other";
        if (!categories.includes(c)) categories.push(c);
    });

    const visibleProjects = projects.slice(0, VISIBLE_COUNT);
    const extraProjects = projects.slice(VISIBLE_COUNT);
    const hasExtra = extraProjects.length > 0;

    return (
        <section
            id="projects"
            ref={sectionRef}
            className={`${classes.section} reveal-section${visible ? " is-visible" : ""}`}
        >
            <div className={classes.header}>
                <span className={classes.eyebrow}>Architecture &amp; Algorithms</span>
                <h2 className={classes.title}>Selected Projects</h2>
            </div>

            <div className={classes.capsule} role="tablist" aria-label="Project view">
                <span
                    className={classes.capsuleIndicator}
                    style={{ left: view === "all" ? "4px" : "50%" }}
                    aria-hidden="true"
                />
                <button
                    role="tab"
                    aria-selected={view === "all"}
                    className={`${classes.capsuleBtn}${view === "all" ? " " + classes.capsuleBtnActive : ""}`}
                    onClick={() => setView("all")}
                >
                    All
                </button>
                <button
                    role="tab"
                    aria-selected={view === "category"}
                    className={`${classes.capsuleBtn}${view === "category" ? " " + classes.capsuleBtnActive : ""}`}
                    onClick={() => setView("category")}
                >
                    Category
                </button>
            </div>

            {view === "all" ? (
                <>
                    <div className={classes.grid}>
                        {visibleProjects.map((p, i) => renderCard(p, i))}
                    </div>

                    {hasExtra && !expanded && (
                        <div className={classes.peekWrap}>
                            <div className={`${classes.grid} ${classes.peekGrid}`} aria-hidden="true">
                                {extraProjects.map((p, i) => renderCard(p, i, false))}
                            </div>
                            <div className={classes.seeMoreOverlay}>
                                <button className={classes.seeMoreBtn} onClick={() => setExpanded(true)}>
                                    See more ({extraProjects.length})
                                    <svg className={classes.chevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {hasExtra && expanded && (
                        <>
                            <div className={classes.grid} style={{ marginTop: "1.5rem" }}>
                                {extraProjects.map((p, i) => renderCard(p, i))}
                            </div>
                            <div className={classes.seeMoreWrap}>
                                <button className={classes.seeMoreBtn} onClick={() => setExpanded(false)}>
                                    Show less
                                    <svg className={`${classes.chevron} ${classes.chevronUp}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                                </button>
                            </div>
                        </>
                    )}
                </>
            ) : (
                categories.map((cat) => {
                    const inCat = projects.filter((p) => (p.category || "Other") === cat);
                    return (
                        <div key={cat} className={classes.catGroup}>
                            <h3 className={classes.catHeading}>
                                {cat}
                                <span className={classes.catCount}>{inCat.length}</span>
                            </h3>
                            <div className={classes.grid}>
                                {inCat.map((p, i) => renderCard(p, i))}
                            </div>
                        </div>
                    );
                })
            )}
        </section>
    );
};
