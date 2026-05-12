import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { ThemeToggle } from "../components/theme/ThemeToggle";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "2rem",
    },
    glowBlue: {
        position: "fixed",
        top: "-20vh",
        right: "-15vw",
        width: "clamp(400px, 60vw, 900px)",
        height: "clamp(400px, 60vw, 900px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--glow-blue) 0%, transparent 70%)",
        filter: "blur(60px)",
        zIndex: 0,
        pointerEvents: "none",
        animation: "$glowPulse 9s ease-in-out infinite",
    },
    glowPurple: {
        position: "fixed",
        bottom: "-20vh",
        left: "-10vw",
        width: "clamp(300px, 50vw, 700px)",
        height: "clamp(300px, 50vw, 700px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--glow-purple) 0%, transparent 70%)",
        filter: "blur(60px)",
        zIndex: 0,
        pointerEvents: "none",
        animation: "$glowPulse 11s ease-in-out 2s infinite",
    },
    "@keyframes glowPulse": {
        "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
        "50%": { opacity: 0.95, transform: "scale(1.08)" },
    },
    card: {
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "520px",
        width: "100%",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        borderRadius: "24px",
        padding: "3rem 2.5rem",
        animation: "$fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        overflow: "hidden",
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
    "@keyframes fadeInUp": {
        from: { opacity: 0, transform: "translateY(24px)" },
        to: { opacity: 1, transform: "translateY(0)" },
    },
    illustration: {
        width: "clamp(180px, 40vw, 260px)",
        height: "auto",
        marginBottom: "2rem",
        opacity: 0.92,
        filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))",
    },
    errorCode: {
        fontSize: "clamp(4rem, 12vw, 7rem)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        color: "var(--text-primary)",
        marginBottom: "0.5rem",
        background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary, #BF5AF2))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    title: {
        fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
        fontWeight: 600,
        color: "var(--text-primary)",
        letterSpacing: "-0.02em",
        marginBottom: "0.75rem",
    },
    description: {
        fontSize: "0.95rem",
        lineHeight: 1.7,
        color: "var(--text-secondary)",
        fontWeight: 400,
        letterSpacing: "-0.005em",
        marginBottom: "2rem",
        maxWidth: "380px",
    },
    buttonRow: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    btnPrimary: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "11px 22px",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: "#fff",
        background: "var(--accent-primary)",
        backdropFilter: "blur(8px) saturate(180%)",
        WebkitBackdropFilter: "blur(8px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 2px 12px rgba(10,132,255,0.28), inset 0 1px 0 rgba(255,255,255,0.25)",
        textDecoration: "none",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            pointerEvents: "none",
        },
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 28px rgba(10,132,255,0.42), inset 0 1px 0 rgba(255,255,255,0.3)",
        },
        "&:active": { transform: "scale(0.97)" },
    },
    btnSecondary: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: 500,
        letterSpacing: "-0.01em",
        color: "var(--text-secondary)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        textDecoration: "none",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
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
            transform: "translateY(-2px)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
            color: "var(--text-primary)",
        },
        "&:active": { transform: "scale(0.97)" },
    },
}));

const PageNotFound = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <div className={classes.glowBlue} aria-hidden="true" />
            <div className={classes.glowPurple} aria-hidden="true" />
            <ThemeToggle />

            <div className={classes.card}>
                <img
                    src="/images/404.png"
                    alt="Page not found"
                    className={classes.illustration}
                    onError={(e) => { e.target.style.display = "none"; }}
                />
                <div className={classes.errorCode}>404</div>
                <div className={classes.title}>Page not found</div>
                <p className={classes.description}>
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>
                <div className={classes.buttonRow}>
                    <button
                        className={classes.btnPrimary}
                        onClick={() => history.push("/")}
                        type="button"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Go Home
                    </button>
                    <button
                        className={classes.btnSecondary}
                        onClick={() => history.goBack()}
                        type="button"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
