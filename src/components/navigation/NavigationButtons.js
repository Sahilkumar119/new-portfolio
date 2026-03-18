import React, { useState, useEffect } from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const NAV_LINKS = [
    { label: "Terminal", to: "#terminal" },
    { label: "Projects", to: "#projects" },
    { label: "Certifications", to: "#certifications" },
    { label: "Blog", to: "#blogs" },
    { label: "Connect", to: "#connect" },
];

const useStyles = makeStyles(() => ({
    nav: {
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        right: "2.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        zIndex: 9999,
        animation: "slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both",
    },
    pill: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 10px",
        borderRadius: "11px",
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        color: "var(--text-secondary)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        textDecoration: "none",
        writingMode: "vertical-rl",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
            color: "var(--text-primary)",
            transform: "translateX(-4px)",
            textDecoration: "none",
        },
    },
    pillActive: {
        color: "var(--accent-primary)",
        background: "var(--glass-bg-hover)",
        borderColor: "rgba(10,132,255,0.25)",
    },
}));

export const NavigationButtons = () => {
    const classes = useStyles();
    const [activeHash, setActiveHash] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = NAV_LINKS.map(l => l.to.replace("#", ""));
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 300) {
                    current = "#" + section;
                }
            }
            setActiveHash(current);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={classes.nav} aria-label="Main navigation">
            {NAV_LINKS.map(({ label, to }) => (
                <Tooltip title={label} placement="left" arrow key={to}>
                    <a
                        href={to}
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector(to)?.scrollIntoView({ behavior: 'smooth' });
                            window.history.pushState(null, '', to);
                        }}
                        className={`${classes.pill} ${activeHash === to ? classes.pillActive : ""}`}
                    >
                        {label}
                    </a>
                </Tooltip>
            ))}
        </nav>
    );
};

export default NavigationButtons;
