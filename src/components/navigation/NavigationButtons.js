import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// Hash targets are root-relative ("/#terminal") so they also work from
// /learn, /blog and /projects: off the home page the anchor performs a real
// navigation back to "/" and the browser scrolls to the section itself.
const NAV_LINKS = [
    { label: "Terminal", to: "/#terminal" },
    { label: "Projects", to: "/#projects" },
    { label: "Experience", to: "/#experience" },
    { label: "Certifications", to: "/#certifications" },
    { label: "Blog", to: "/#blogs" },
    { label: "Connect", to: "/#connect" },
    // Real route (not a hash anchor) so react-snapshot crawls + prerenders it.
    { label: "Learn", to: "/learn", route: true },
];

// "/#terminal" -> "terminal". Route entries have no hash and return "".
const sectionId = (to) => (to.includes("#") ? to.split("#")[1] : "");

const useStyles = makeStyles(() => ({
    nav: {
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        right: "2.5rem",
        display: "flex",
        flexDirection: "column",
        // Pills differ in width; flush their right edges to the rail.
        alignItems: "flex-end",
        gap: "12px",
        "@media (max-height: 860px)": { gap: "6px" },
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
        color: "var(--text-primary)",
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
        // Seven vertical pills outgrow short laptop screens and cover the
        // theme toggle, so they compact below 860px of height.
        "@media (max-height: 860px)": {
            padding: "10px 7px",
            fontSize: "0.72rem",
        },
    },
    // Solid fill: accent text on the teal-tinted glass read at ~1.5:1.
    pillActive: {
        color: "#fff",
        background: "var(--accent-primary)",
        borderColor: "transparent",
        "&:hover": { color: "#fff", background: "var(--accent-primary)" },
    },
}));

export const NavigationButtons = () => {
    const classes = useStyles();
    const [activeHash, setActiveHash] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = NAV_LINKS.map(l => sectionId(l.to)).filter(Boolean);
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 300) {
                    current = "/#" + section;
                }
            }
            setActiveHash(current);
        };
        // One layout read per frame at most, not per scroll event.
        let frame = 0;
        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => { frame = 0; handleScroll(); });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <nav className={classes.nav} aria-label="Main navigation">
            {NAV_LINKS.map(({ label, to, route }) =>
                route ? (
                    <Link key={to} to={to} className={classes.pill}>
                        {label}
                    </Link>
                ) : (
                        <a
                            key={to}
                            href={to}
                            onClick={(e) => {
                                // Already on home: intercept for a smooth scroll.
                                // Anywhere else: let the browser navigate to
                                // "/" and land on the section natively.
                                const target = document.getElementById(sectionId(to));
                                if (!target) return;
                                e.preventDefault();
                                target.scrollIntoView({ behavior: 'smooth' });
                                window.history.pushState(null, '', to);
                            }}
                            className={`${classes.pill} ${activeHash === to ? classes.pillActive : ""}`}
                            aria-current={activeHash === to ? "location" : undefined}
                        >
                            {label}
                        </a>
                )
            )}
        </nav>
    );
};

export default NavigationButtons;
