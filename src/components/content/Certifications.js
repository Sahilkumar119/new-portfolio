import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { certifications } from "../../data/certifications";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const useStyles = makeStyles(() => ({
    section: {
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "clamp(4rem, 8vw, 8rem)",
        paddingRight: "clamp(4rem, 8vw, 8rem)",
        position: "relative",
    },
    header: {
        marginBottom: "4rem",
        textAlign: "center",
    },
    eyebrow: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--accent-tertiary)",
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
    list: {
        maxWidth: "800px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    item: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.5rem 2rem",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        borderRadius: "14px",
        boxShadow: "var(--glass-shadow)",
        textDecoration: "none",
        overflow: "hidden",
        transition: "all 280ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "8%",
            right: "8%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
            pointerEvents: "none",
        },
        "&:hover": {
            transform: "translateY(-3px) translateX(4px)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
            textDecoration: "none",
        },
        "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.5rem",
        }
    },
    itemTitle: {
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "var(--text-primary)",
        margin: 0,
    },
    itemIssuer: {
        fontSize: "0.85rem",
        color: "var(--text-secondary)",
    },
    itemDate: {
        fontSize: "0.8rem",
        fontWeight: 500,
        color: "var(--text-tertiary)",
        fontFamily: "'SF Mono', monospace",
    },
    itemRight: {
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        "@media (max-width: 600px)": {
            width: "100%",
            justifyContent: "space-between",
        },
    },
    viewBtn: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        fontSize: "0.8rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
        color: "var(--accent-tertiary)",
        padding: "0.45rem 0.9rem",
        borderRadius: "999px",
        border: "1px solid var(--glass-border)",
        background: "rgba(255,255,255,0.04)",
        transition: "all 220ms ease",
        "& svg": {
            transition: "transform 220ms ease",
        },
        "$item:hover &": {
            color: "var(--text-primary)",
            background: "var(--accent-tertiary)",
            borderColor: "transparent",
        },
        "$item:hover & svg": {
            transform: "translateX(3px)",
        },
    },
}));

export const Certifications = () => {
    const classes = useStyles();
    const [sectionRef, visible] = useScrollReveal({ threshold: 0.1 });

    return (
        <section
            id="certifications"
            ref={sectionRef}
            className={`${classes.section} reveal-section${visible ? ' is-visible' : ''}`}
        >
            <div className={classes.header}>
                <span className={classes.eyebrow}>Verified Credentials</span>
                <h2 className={classes.title}>Certifications</h2>
            </div>
            
            <div className={classes.list}>
                {Array.isArray(certifications) && certifications.map((cert, i) => (
                    <a 
                        key={i} 
                        href={cert.link || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`${classes.item} reveal-child`}
                        style={{ '--reveal-delay': i }}
                    >
                        <div>
                            <h3 className={classes.itemTitle}>{cert.title}</h3>
                            <span className={classes.itemIssuer}>{cert.issuer}</span>
                        </div>
                        <div className={classes.itemRight}>
                            <span className={classes.itemDate}>{cert.date}</span>
                            {cert.link && (
                                <span className={classes.viewBtn}>
                                    View Certificate
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M7 17L17 7M17 7H8M17 7v9" />
                                    </svg>
                                </span>
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};
