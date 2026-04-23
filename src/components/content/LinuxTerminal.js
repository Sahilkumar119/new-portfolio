import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "./TextDecrypt";
import { terminalData } from "../../data/terminal";
import { useScrollReveal } from "../../hooks/useScrollReveal";

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
        position: "relative",
        width: "100%",
        maxWidth: "800px",
        background: "rgba(10, 10, 12, 0.82)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow), 0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        borderRadius: "14px",
        overflow: "hidden",
        fontFamily: "'SF Mono', 'Fira Code', 'Menlo', monospace",
        color: "#e2e8f0",
        animation: 'none',
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "8%",
            right: "8%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            pointerEvents: "none",
            zIndex: 2,
        },
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
    const [sectionRef, visible] = useScrollReveal({ threshold: 0.2 });

    const { user, host, commands } = terminalData;
    const identifier = `${user}@${host}:~`;

    useEffect(() => {
        if (!visible) return;
        if (!Array.isArray(commands) || commands.length === 0) return;
        
        const timers = commands.flatMap((_, i) => [
            setTimeout(() => setStep(i * 2 + 1), (i * 1200) + 800), // Input
            setTimeout(() => setStep(i * 2 + 2), (i * 1200) + 2000), // Output
        ]);
        
        timers.push(setTimeout(() => setStep(commands.length * 2 + 1), (commands.length * 1200) + 1200));

        return () => timers.forEach(clearTimeout);
    }, [commands, visible]);

    return (
        <section id="terminal" className={classes.section}>
            <div
                ref={sectionRef}
                className={`${classes.terminalBox} reveal-terminal${visible ? ' is-visible' : ''}`}
            >
                <div className={classes.topBar}>
                    <div className={classes.dots}>
                        <div className={`${classes.dot} ${classes.dotRed}`} />
                        <div className={`${classes.dot} ${classes.dotYellow}`} />
                        <div className={`${classes.dot} ${classes.dotGreen}`} />
                    </div>
                    <div className={classes.title}>{identifier}</div>
                </div>
                <div className={classes.content}>
                    {Array.isArray(commands) && commands.map((cmd, i) => (
                        <React.Fragment key={i}>
                            {step >= (i * 2 + 1) && (
                                <div className={classes.promptRow}>
                                    <span className={classes.pathInfo}>{identifier}</span>
                                    <span>$ {cmd.input}</span>
                                </div>
                            )}
                            {step >= (i * 2 + 2) && (
                                <div className={classes.responseText}>
                                    <TextDecrypt text={cmd.output.split('\n')[0]} />
                                    {cmd.output.split('\n').length > 1 && (
                                        <>
                                            <br />
                                            {cmd.output.split('\n').slice(1).join('\n')}
                                        </>
                                    )}
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                    {step >= (commands.length * 2 + 1) && (
                        <div className={classes.promptRow}>
                            <span className={classes.pathInfo}>{identifier}</span>
                            <span>$ <span className={classes.cursor} /></span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
