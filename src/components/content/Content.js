import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "./TextDecrypt";
import Resume from "../../settings/resume.json";
import { FirstName, LastName } from "../../utils/getName";

const useStyles = makeStyles(() => ({
    wrapper: {
        marginTop: "auto",
        marginBottom: "auto",
        paddingLeft: "clamp(4rem, 8vw, 8rem)",
        paddingRight: "clamp(4rem, 8vw, 8rem)",
        maxWidth: "680px",
        zIndex: 10,
        "@media (max-width: 768px)": {
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            maxWidth: "100%",
        },
    },

    // Availability indicator
    eyebrow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "2rem",
        animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
    },
    eyebrowDot: {
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        background: "var(--accent-tertiary)",
        boxShadow: "0 0 6px var(--accent-tertiary)",
        animation: "pulseDot 2.8s ease-in-out infinite",
        flexShrink: 0,
    },
    eyebrowText: {
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--text-tertiary)",
    },

    // Name headline
    headlineWrapper: {
        marginBottom: "2rem",
        animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
    },
    greeting: {
        display: "block",
        fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
        fontWeight: 400,
        color: "var(--text-secondary)",
        letterSpacing: "0.01em",
        "& p": { margin: 0 },
    },
    name: {
        display: "block",
        fontSize: "clamp(3rem, 8vw, 5.5rem)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.0,
        color: "var(--text-primary)",
        "& p": { margin: 0 },
    },

    // Clean typographic meta — no boxes, no pills
    metaRow: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "2.25rem",
        animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
    },
    metaText: {
        fontSize: "0.88rem",
        fontWeight: 400,
        color: "var(--text-secondary)",
        letterSpacing: "0.005em",
    },
    metaDivider: {
        width: "1px",
        height: "13px",
        background: "var(--divider)",
        flexShrink: 0,
    },

    // Bio glass card
    bioCard: {
        position: "relative",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        borderRadius: "18px",
        padding: "1.5rem 1.75rem",
        marginBottom: "2.25rem",
        overflow: "hidden",
        animation: "fadeInUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "8%",
            right: "8%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        },
    },
    bioText: {
        fontSize: "0.95rem",
        lineHeight: 1.7,
        color: "var(--text-secondary)",
        fontWeight: 400,
        letterSpacing: "-0.005em",
        margin: 0,
    },
    locationRow: {
        display: "flex",
        alignItems: "center",
        gap: "7px",
        marginTop: "1.1rem",
        paddingTop: "1.1rem",
        borderTop: "1px solid var(--divider)",
    },
    locationPin: {
        width: "12px",
        height: "12px",
        color: "var(--text-tertiary)",
        flexShrink: 0,
    },
    locationText: {
        fontSize: "0.7rem",
        fontWeight: 500,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--text-tertiary)",
    },

    // CTAs
    ctaRow: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
        animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
    },
    ctaPrimary: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "11px 22px",
        borderRadius: "10px",
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: "#fff",
        background: "var(--accent-primary)",
        boxShadow: "0 2px 12px rgba(10,132,255,0.28), inset 0 1px 0 rgba(255,255,255,0.18)",
        textDecoration: "none",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 22px rgba(10,132,255,0.42), inset 0 1px 0 rgba(255,255,255,0.22)",
            color: "#fff",
            textDecoration: "none",
        },
        "&:active": { transform: "scale(0.97)" },
    },
    ctaSecondary: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        borderRadius: "10px",
        fontSize: "0.85rem",
        fontWeight: 500,
        letterSpacing: "-0.01em",
        color: "var(--text-secondary)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        textDecoration: "none",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
            transform: "translateY(-2px)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
            color: "var(--text-primary)",
            textDecoration: "none",
        },
        "&:active": { transform: "scale(0.97)" },
    },
}));

export const Content = () => {
    const classes = useStyles();
    const github = Resume.basics.profiles.find(p => p.network === "GitHub")?.url || "#";

    return (
        <main className={classes.wrapper}>
            <div className={classes.eyebrow}>
                <span className={classes.eyebrowDot} />
                <span className={classes.eyebrowText}>Available for opportunities</span>
            </div>

            <div className={classes.headlineWrapper}>
                <span className={classes.greeting}>
                    <TextDecrypt text={Resume.basics.x_title} />
                </span>
                <span className={classes.name}>
                    <TextDecrypt text={`${FirstName} ${LastName || ""}`} />
                </span>
            </div>

            {/* Role + location — clean typographic line, no chips */}
            <div className={classes.metaRow}>
                <span className={classes.metaText}>{Resume.basics.job}</span>
                <span className={classes.metaDivider} />
                <span className={classes.metaText}>{Resume.basics.location.country}</span>
            </div>

            <div className={classes.bioCard}>
                <p className={classes.bioText}>{Resume.basics.description}</p>
                <div className={classes.locationRow}>
                    <svg className={classes.locationPin} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span className={classes.locationText}>{Resume.basics.location.country}</span>
                </div>
            </div>

            <div className={classes.ctaRow}>
                <a href={`mailto:${Resume.basics.email}`} className={classes.ctaPrimary} rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Get in touch
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer" className={classes.ctaSecondary}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                </a>
            </div>
        </main>
    );
};
