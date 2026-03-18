import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { TextDecrypt } from "./TextDecrypt";

const useStyles = makeStyles(() => ({
    section: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "clamp(4rem, 8vw, 8rem)",
        paddingRight: "clamp(4rem, 8vw, 8rem)",
        position: "relative",
    },
    terminalBox: {
        width: "100%",
        maxWidth: "800px",
        background: "rgba(10, 10, 12, 0.8)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "'SF Mono', 'Fira Code', 'Menlo', monospace",
        color: "#e2e8f0",
        animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
    },
    topBar: {
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        background: "rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    dots: {
        display: "flex",
        gap: "8px",
    },
    dot: {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
    },
    dotRed: { background: "#ff5f56" },
    dotYellow: { background: "#ffbd2e" },
    dotGreen: { background: "#27c93f" },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: "0.8rem",
        color: "rgba(255, 255, 255, 0.4)",
        fontWeight: 500,
        marginRight: "44px", // to perfectly center accounting for the dots
    },
    content: {
        padding: "2rem",
        fontSize: "0.95rem",
        lineHeight: 1.7,
    },
    promptRow: {
        display: "flex",
        marginBottom: "8px",
        color: "#10b981", // green prompt
    },
    pathInfo: {
        color: "#3b82f6", // blue path
        marginRight: "8px",
    },
    responseText: {
        color: "#94a3b8",
        marginBottom: "1.5rem",
        whiteSpace: "pre-wrap",
    },
    cursor: {
        display: "inline-block",
        width: "8px",
        height: "18px",
        background: "var(--accent-primary)",
        verticalAlign: "middle",
        animation: "$blink 1s step-end infinite",
    },
    "@keyframes blink": {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0 },
    },
}));

export const LinuxTerminal = () => {
    const classes = useStyles();
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Simple sequence to reveal lines over time
        const timers = [
            setTimeout(() => setStep(1), 800),
            setTimeout(() => setStep(2), 2000),
            setTimeout(() => setStep(3), 3200),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <section id="terminal" className={classes.section}>
            <div className={classes.terminalBox}>
                <div className={classes.topBar}>
                    <div className={classes.dots}>
                        <div className={`${classes.dot} ${classes.dotRed}`} />
                        <div className={`${classes.dot} ${classes.dotYellow}`} />
                        <div className={`${classes.dot} ${classes.dotGreen}`} />
                    </div>
                    <div className={classes.title}>sahil@archlinux:~</div>
                </div>
                <div className={classes.content}>
                    
                    <div className={classes.promptRow}>
                        <span className={classes.pathInfo}>sahil@archlinux:~</span>
                        <span>$ cat whoami.txt</span>
                    </div>
                    {step >= 1 && (
                        <div className={classes.responseText}>
                            <TextDecrypt text="Linux Enthusiast | Developer | Lifelong Learner" />
                            <br />
                            I thrive in the terminal, optimizing workflows and building robust software. 
                            Arch Linux is my daily driver because absolute control is beautiful.
                        </div>
                    )}

                    {step >= 2 && (
                        <>
                            <div className={classes.promptRow}>
                                <span className={classes.pathInfo}>sahil@archlinux:~</span>
                                <span>$ neofetch --skills</span>
                            </div>
                            <div className={classes.responseText}>
                                <TextDecrypt text="> Core: C++, Python, JavaScript" />
                                <br />
                                {">"} ML/AI: TensorFlow, PyTorch<br />
                                {">"} Embedded: Robotics control, IoT protocols<br />
                                {">"} OS: Linux (Arch, Debian), Shell Scripting
                            </div>
                        </>
                    )}

                    {step >= 3 && (
                        <div className={classes.promptRow}>
                            <span className={classes.pathInfo}>sahil@archlinux:~</span>
                            <span>$ <span className={classes.cursor} /></span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
