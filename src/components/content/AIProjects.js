import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { topProjects } from "../../data/projects";

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
        marginBottom: "3rem",
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
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
    },
    card: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        background: "rgba(20, 20, 25, 0.4)", // slightly darker/blueish for AI vibe
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "2rem",
        overflow: "hidden",
        transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&::before": {
            // subtle neural grid or data line aesthetic
            content: '""',
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            zIndex: -1,
            opacity: 0.5,
        },
        "&:hover": {
            transform: "translateY(-5px)",
            background: "rgba(30, 30, 40, 0.6)",
            border: "1px solid rgba(10, 132, 255, 0.3)",
            boxShadow: "0 10px 40px -10px rgba(10, 132, 255, 0.15)",
            textDecoration: "none",
        },
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "1rem",
    },
    cardTitle: {
        fontSize: "1.2rem",
        fontWeight: 700,
        color: "var(--text-primary)",
        margin: 0,
    },
    cardDesc: {
        fontSize: "0.9rem",
        lineHeight: 1.6,
        color: "var(--text-secondary)",
        marginBottom: "1.5rem",
    },
    techRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginTop: "auto",
    },
    techToken: {
        fontSize: "0.7rem",
        fontFamily: "'SF Mono', monospace",
        color: "var(--accent-primary)",
        background: "rgba(10, 132, 255, 0.1)",
        padding: "4px 8px",
        borderRadius: "4px",
    },
    links: {
        display: "flex",
        gap: "1rem",
    },
    linkIcon: {
        color: "var(--text-tertiary)",
        transition: "color 200ms ease",
        "&:hover": { color: "var(--accent-primary)" },
    },
}));

export const AIProjects = () => {
    const classes = useStyles();

    return (
        <section id="projects" className={classes.section}>
            <div className={classes.header}>
                <span className={classes.eyebrow}>Architecture & Algorithms</span>
                <h2 className={classes.title}>Selected Systems</h2>
            </div>
            
            <div className={classes.grid}>
                {Array.isArray(topProjects) && topProjects.slice(0, 4).map((project, i) => (
                    <a 
                        key={i} 
                        href={project.link || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={classes.card}
                    >
                        <div className={classes.cardHeader}>
                            <h3 className={classes.cardTitle}>{project.title}</h3>
                            <div className={classes.links}>
                                {project.github && project.github !== "#" && (
                                    <div className={classes.linkIcon}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className={classes.cardDesc}>{project.description}</p>
                        <div className={classes.techRow}>
                            {Array.isArray(project.technologies) && project.technologies.map((tech, idx) => (
                                <span key={idx} className={classes.techToken}>{tech}</span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};
