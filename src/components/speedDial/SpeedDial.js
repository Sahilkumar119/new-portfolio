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
        color: "var(--text-secondary)",
        fontSize: "0.88rem",
    },
}));

export const SpeedDials = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <SpeedDial
            ariaLabel="Social links"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="down"
        >
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
