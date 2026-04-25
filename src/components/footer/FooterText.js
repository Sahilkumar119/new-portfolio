import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Resume from "../../settings/resume.json";

const useStyles = makeStyles(() => ({
    wrapper: {
        position: "fixed",
        top: "auto",
        bottom: "2.5rem",
        left: "clamp(4rem, 8vw, 8rem)",
        zIndex: 9999,
        animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both",
    },
    link: {
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 24px",
        borderRadius: "24px",
        background: "var(--matte-turquoise)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        textDecoration: "none",
        color: "var(--text-secondary)",
        fontSize: "0.85rem",
        fontWeight: 500,
        letterSpacing: "0.01em",
        fontFamily: "'SF Mono','Fira Code','Fira Mono','Roboto Mono',monospace",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
            transform: "translateY(-2px)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
            color: "var(--accent-primary)",
            textDecoration: "none",
        },
        "&:active": { transform: "scale(0.97)" },
    },
    icon: {
        width: "16px",
        height: "16px",
        opacity: 0.65,
        flexShrink: 0,
    },
}));

export const FooterText = () => {
    const classes = useStyles();
    const resumeUrl = Resume.basics.resume || "/resume.pdf";
    return (
        <div className={classes.wrapper}>
            <a
                href={`${process.env.PUBLIC_URL}${resumeUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
            >
                <svg className={classes.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <polyline points="9 15 12 18 15 15"/>
                </svg>
                Resume
            </a>
        </div>
    );
};
