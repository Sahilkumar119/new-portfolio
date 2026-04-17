import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { certifications } from "../../data/certifications";

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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.5rem 2rem",
        background: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--glass-border)",
        borderRadius: "12px",
        transition: "transform 200ms ease, background 200ms ease",
        "&:hover": {
            transform: "translateX(8px)",
            background: "var(--glass-bg-hover)",
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
}));

export const Certifications = () => {
    const classes = useStyles();

    return (
        <section id="certifications" className={classes.section}>
            <div className={classes.header}>
                <span className={classes.eyebrow}>Verified Credentials</span>
                <h2 className={classes.title}>Certifications</h2>
            </div>
            
            <div className={classes.list}>
                {certifications.map((cert, i) => (
                    <div key={i} className={classes.item}>
                        <div>
                            <h3 className={classes.itemTitle}>{cert.title}</h3>
                            <span className={classes.itemIssuer}>{cert.issuer}</span>
                        </div>
                        <span className={classes.itemDate}>{cert.date}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
