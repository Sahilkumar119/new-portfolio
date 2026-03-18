import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Resume from "../../settings/resume.json";

const useStyles = makeStyles(() => ({
    section: {
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "clamp(4rem, 8vw, 8rem)",
        paddingRight: "clamp(4rem, 8vw, 8rem)",
        position: "relative",
        textAlign: "center",
    },
    eyebrow: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--accent-primary)",
        display: "block",
        marginBottom: "1.5rem",
    },
    title: {
        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        color: "var(--text-primary)",
        margin: "0 0 1.5rem 0",
        lineHeight: 1.1,
    },
    subtitle: {
        fontSize: "1.1rem",
        lineHeight: 1.6,
        color: "var(--text-secondary)",
        maxWidth: "600px",
        margin: "0 auto 3rem auto",
    },
    ctaWrap: {
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    btnPrimary: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "14px 28px",
        borderRadius: "12px",
        fontSize: "0.95rem",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: "#fff",
        background: "var(--accent-primary)",
        boxShadow: "0 4px 14px rgba(10,132,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
        textDecoration: "none",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 22px rgba(10,132,255,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
            color: "#fff",
            textDecoration: "none",
        },
    },
    btnSecondary: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "13px 26px",
        borderRadius: "12px",
        fontSize: "0.95rem",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: "var(--text-primary)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        textDecoration: "none",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
            transform: "translateY(-2px)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
            textDecoration: "none",
        },
    },
}));

export const Connect = () => {
    const classes = useStyles();
    const github = Resume.basics.profiles.find(p => p.network === "GitHub")?.url || "#";

    return (
        <section id="connect" className={classes.section}>
            <span className={classes.eyebrow}>Open Source & Collaboration</span>
            <h2 className={classes.title}>Let's build<br />the future.</h2>
            <p className={classes.subtitle}>
                Whether you're working on the next generation of robotics, advancing AI architectures, or just want to talk Linux/open-source — my inbox is always open.
            </p>
            <div className={classes.ctaWrap}>
                <a href={`mailto:${Resume.basics.email}`} className={classes.btnPrimary} rel="noopener noreferrer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Say Hello
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer" className={classes.btnSecondary}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                </a>
            </div>
        </section>
    );
};
