import React from "react";
import { Tooltip, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Resume from "../../settings/resume.json";
import { Logo } from "./Logo";

const useStyles = makeStyles(() => ({
    wrapper: {
        position: "fixed",
        top: "clamp(1.5rem, 4vw, 3rem)",
        left: "clamp(1.5rem, 4vw, 3rem)",
        zIndex: 20,
        animation: "scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both",
    },
    link: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        textDecoration: "none",
        padding: "9px",
        transition: "all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "& svg": { width: "100%", height: "100%" },
        "&:hover": {
            transform: "scale(1.1) rotate(-4deg)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
        },
        "&:active": { transform: "scale(0.93) rotate(0deg)" },
    },
}));

export const LogoLink = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Tooltip title={Resume.basics.name} placement="right" TransitionComponent={Zoom} arrow>
                <a
                    href={Resume.basics.url}
                    aria-label={`${Resume.basics.name} — home`}
                    className={classes.link}
                    rel="noopener noreferrer"
                >
                    <Logo />
                </a>
            </Tooltip>
        </div>
    );
};
