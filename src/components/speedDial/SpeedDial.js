import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import Resume from "../../settings/resume.json";
import { Icon } from "../content/icons";

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
    },
}));

// NavigationButtons is desktop-only (Hidden smDown), so without these entries
// /projects, /blog and /learn are unreachable from a phone. Plain hrefs on
// purpose: a full navigation is predictable and needs no router plumbing.
const PAGES = [
    { label: "All Projects", url: "/projects", icon: "Projects" },
    { label: "All Posts", url: "/blog", icon: "Posts" },
    { label: "Learn", url: "/learn", icon: "Learn" },
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
                    icon={<Icon name={page.icon} className={classes.icon} />}
                    tooltipTitle={page.label}
                    onClick={() => setOpen(false)}
                    href={page.url}
                />
            ))}
            {Resume.basics.profiles.map((action) => (
                <SpeedDialAction
                    key={action.network}
                    icon={<Icon name={action.network} className={classes.icon} />}
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
