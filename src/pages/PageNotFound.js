import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { ThemeToggle } from "../components/theme/ThemeToggle";

const useStyles = makeStyles(() => ({
    root: {
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
    },
    bgImage: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        zIndex: 0,
    },
    overlay: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)",
        zIndex: 1,
    },
    content: {
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
        paddingBottom: "clamp(3rem, 8vh, 6rem)",
        textAlign: "center",
    },
    errorCode: {
        fontSize: "clamp(5rem, 15vw, 10rem)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        marginBottom: "0.5rem",
        background: "linear-gradient(135deg, #0A84FF, #BF5AF2)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textShadow: "none",
        animation: "$fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
    },
    title: {
        fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "-0.02em",
        marginBottom: "0.5rem",
        animation: "$fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
    },
    description: {
        fontSize: "clamp(0.85rem, 2vw, 1rem)",
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.7)",
        fontWeight: 400,
        marginBottom: "2rem",
        maxWidth: "400px",
        padding: "0 1.5rem",
        animation: "$fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
    },
    buttonRow: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center",
        animation: "$fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
    },
    "@keyframes fadeInUp": {
        from: { opacity: 0, transform: "translateY(24px)" },
        to: { opacity: 1, transform: "translateY(0)" },
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
        background: "rgba(10,132,255,0.85)",
        backdropFilter: "blur(12px) saturate(180%)",
        WebkitBackdropFilter: "blur(12px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 2px 16px rgba(10,132,255,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
        textDecoration: "none",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 28px rgba(10,132,255,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
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
        color: "rgba(255,255,255,0.9)",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        textDecoration: "none",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
            transform: "translateY(-2px)",
            background: "rgba(255,255,255,0.18)",
            color: "#fff",
        },
        "&:active": { transform: "scale(0.97)" },
    },
}));

const PageNotFound = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <img
                src="/images/404.png"
                alt=""
                className={classes.bgImage}
                onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className={classes.overlay} />
            <ThemeToggle />

            <div className={classes.content}>
                <div className={classes.errorCode}>404</div>
                <div className={classes.title}>Page not found</div>
                <p className={classes.description}>
                    The page you're looking for doesn't exist or has been moved.
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
