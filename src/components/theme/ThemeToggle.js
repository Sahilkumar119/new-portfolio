import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { Tooltip, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    wrapper: {
        position: "fixed",
        bottom: "2.5rem",
        right: "2.5rem",
        zIndex: 20,
        animation: "scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s both",
    },
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        cursor: "pointer",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        color: "var(--text-secondary)",
        outline: "none",
        "& svg": {
            width: "17px",
            height: "17px",
            transition: "transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
        "&:hover": {
            transform: "scale(1.1) translateY(-2px)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
            color: "var(--accent-primary)",
            "& svg": { transform: "rotate(25deg) scale(1.1)" },
        },
        "&:active": { transform: "scale(0.93)" },
    },
}));

const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
);

const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
);

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Tooltip
                title={theme === "light" ? "Dark mode" : "Light mode"}
                placement="left"
                TransitionComponent={Zoom}
                arrow
            >
                <button onClick={toggleTheme} aria-label="Toggle theme" className={classes.btn}>
                    {theme === "light" ? <MoonIcon /> : <SunIcon />}
                </button>
            </Tooltip>
        </div>
    );
};
