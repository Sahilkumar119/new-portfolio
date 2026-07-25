import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import Resume from "../../settings/resume.json";

const useStyles = makeStyles(() => ({
    speedDial: {
        position: "absolute",
        top: "clamp(1.5rem, 4vw, 3rem)",
        right: "clamp(1.5rem, 4vw, 3rem)",
        zIndex: 20,
        "& .MuiSpeedDial-fab": {
            width: "42px",
            height: "42px",
            minHeight: "42px",
            borderRadius: "12px",
            background: "var(--glass-bg)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid var(--glass-border)",
            boxShadow: "var(--glass-shadow)",
            color: "var(--text-primary)",
            "&:hover": {
                background: "var(--glass-bg-hover)",
                transform: "scale(1.08)",
            },
        },
    },
    icon: {
        color: "var(--text-primary)",
        fontSize: "0.88rem",
    },
}));

// NavigationButtons is desktop-only (Hidden smDown), so without these entries
// /projects, /blog and /learn are unreachable from a phone. Plain hrefs on
// purpose: a full navigation is predictable and needs no router plumbing.
const PAGES = [
    { label: "All Projects", url: "/projects", icon: "fas fa-folder-open" },
    { label: "All Posts", url: "/blog", icon: "fas fa-newspaper" },
    { label: "Learn", url: "/learn", icon: "fas fa-graduation-cap" },
];

export const SpeedDials = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <SpeedDial
            ariaLabel="Menu"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="down"
        >
            {PAGES.map((page) => (
                <SpeedDialAction
                    key={page.url}
                    icon={<i className={`${page.icon} ${classes.icon}`} aria-hidden="true" />}
                    tooltipTitle={page.label}
                    onClick={() => setOpen(false)}
                    href={page.url}
                />
            ))}
            {Resume.basics.profiles.map((action) => (
                <SpeedDialAction
                    key={action.network}
                    icon={<i className={`${action.x_icon} ${classes.icon}`} aria-hidden="true" />}
                    tooltipTitle={action.network}
                    onClick={() => setOpen(false)}
                    href={action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            ))}
        </SpeedDial>
    );
};
