import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { blogPosts } from "../../data/blogPosts";
import { topProjects, stepProjects } from "../../data/projects";
import { certifications } from "../../data/certifications";

const USER = "sahil";
const HOST = "archlinux";
const HOME = `/home/${USER}`;
const PROMPT_USER_HOST = `${USER}@${HOST}`;

const ABOUT_TXT = [
    "Linux Enthusiast | Developer | Lifelong Learner",
    "I thrive in the terminal, optimizing workflows and building robust software.",
    "Arch Linux is my daily driver because absolute control is beautiful.",
].join("\n");

const SKILLS_TXT = [
    "> Core      : C++, Python, JavaScript",
    "> ML / AI   : TensorFlow, PyTorch",
    "> Embedded  : Robotics control, IoT protocols",
    "> OS        : Linux (Arch, Debian), Shell Scripting",
].join("\n");

function buildFs() {
    const blogsDir = {};
    Object.entries(blogPosts).forEach(([slug, post]) => {
        const header = `# ${post.title}\nAuthor : ${post.author}\nDate   : ${post.date}\nTags   : ${(post.tags || []).join(", ")}\nRead   : ${post.readTime}\n\n`;
        blogsDir[`${slug}.md`] = header + (post.content || "");
    });

    const projectsDir = {};
    [...topProjects, ...stepProjects].forEach((p) => {
        const slug = (p.title || `project-${p.id}`).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        projectsDir[`${slug}.txt`] = [
            `Title       : ${p.title}`,
            `Description : ${p.description}`,
            `Tech        : ${(p.technologies || []).join(", ")}`,
            p.link ? `Link        : ${p.link}` : null,
            p.github ? `GitHub      : ${p.github}` : null,
        ].filter(Boolean).join("\n");
    });

    const certsTxt = certifications
        .map((c) => `- ${c.title}  (${c.issuer}, ${c.date})`)
        .join("\n");

    return {
        "about.txt": ABOUT_TXT,
        "skills.txt": SKILLS_TXT,
        "blogs": blogsDir,
        "projects": projectsDir,
        "certifications": { "all.txt": certsTxt },
    };
}

function isDir(node) {
    return node && typeof node === "object" && !Array.isArray(node);
}

function splitPath(p) {
    return p.split("/").filter(Boolean);
}

function resolvePath(cwd, target) {
    if (!target) return cwd;
    if (target === "~") return HOME;
    if (target.startsWith("~/")) return resolvePath(HOME, target.slice(2));
    const base = target.startsWith("/") ? [] : splitPath(cwd);
    for (const part of splitPath(target)) {
        if (part === ".") continue;
        if (part === "..") {
            if (base.length > 0) base.pop();
            continue;
        }
        base.push(part);
    }
    return "/" + base.join("/");
}

function lookup(fs, absPath) {
    if (absPath === HOME || absPath === HOME + "/") return fs;
    if (!absPath.startsWith(HOME)) return null;
    const rel = absPath.slice(HOME.length);
    let node = fs;
    for (const part of splitPath(rel)) {
        if (!isDir(node)) return null;
        if (!(part in node)) return null;
        node = node[part];
    }
    return node;
}

function displayCwd(absPath) {
    if (absPath === HOME) return "~";
    if (absPath.startsWith(HOME + "/")) return "~" + absPath.slice(HOME.length);
    return absPath;
}

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
        height: "clamp(360px, 70vh, 520px)",
        display: "flex",
        flexDirection: "column",
        background: "rgba(10, 10, 12, 0.82)",
        backdropFilter: "blur(20px) saturate(170%)",
        WebkitBackdropFilter: "blur(20px) saturate(170%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow), 0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        borderRadius: "14px",
        overflow: "hidden",
        fontFamily: "'SF Mono', 'Fira Code', 'Menlo', monospace",
        color: "#e2e8f0",
        cursor: "text",
        contain: "layout paint",
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
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        background: "rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    dots: { display: "flex", gap: "8px" },
    dot: { width: "12px", height: "12px", borderRadius: "50%" },
    dotRed: { background: "#ff5f56" },
    dotYellow: { background: "#ffbd2e" },
    dotGreen: { background: "#27c93f" },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: "0.8rem",
        color: "rgba(255, 255, 255, 0.4)",
        fontWeight: 500,
        marginRight: "44px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    body: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        overflowX: "hidden",
        padding: "1.25rem 1.5rem",
        fontSize: "0.92rem",
        lineHeight: 1.6,
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,0.18) transparent",
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.18)",
            borderRadius: "4px",
        },
    },
    line: {
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    },
    promptRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.4ch",
    },
    user: { color: "#10b981" },
    path: { color: "#3b82f6" },
    out: { color: "#cbd5e1" },
    err: { color: "#f87171" },
    muted: { color: "#94a3b8" },
    cursor: {
        display: "inline-block",
        width: "0.5ch",
        height: "1.1em",
        background: "var(--accent-primary, #10b981)",
        verticalAlign: "middle",
        animation: "$blink 1s step-end infinite",
        marginLeft: "2px",
        borderRadius: "1px",
    },
    hiddenInput: {
        position: "absolute",
        left: "-9999px",
        top: 0,
        opacity: 0,
        width: 1,
        height: 1,
        pointerEvents: "none",
    },
    "@keyframes blink": {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0 },
    },
}));

export const LinuxTerminal = () => {
    const classes = useStyles();
    const [sectionRef, visible] = useScrollReveal({ threshold: 0.2 });
    const fs = useMemo(buildFs, []);

    const [cwd, setCwd] = useState(HOME);
    const [history, setHistory] = useState([
        { type: "out", text: `Welcome to ${PROMPT_USER_HOST}. Type \`help\` to see what you can do.` },
    ]);
    const [input, setInput] = useState("");
    const [cmdLog, setCmdLog] = useState([]);
    const [logIdx, setLogIdx] = useState(-1);
    const [focused, setFocused] = useState(false);

    const bodyRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history, input]);

    const focusInput = useCallback(() => {
        inputRef.current?.focus({ preventScroll: true });
    }, []);

    const run = useCallback((raw) => {
        const trimmed = raw.trim();
        const echo = { type: "prompt", cwd, text: raw };

        if (!trimmed) {
            setHistory((h) => [...h, echo]);
            return;
        }

        const [cmd, ...args] = trimmed.split(/\s+/);
        const arg = args.join(" ");

        if (cmd === "clear") {
            setHistory([]);
            return;
        }

        const lines = [];
        let nextCwd = cwd;

        switch (cmd) {
            case "help":
                lines.push({ type: "out", text: "Available commands:" });
                lines.push({ type: "out", text: "  help                 show this message" });
                lines.push({ type: "out", text: "  pwd                  print working directory" });
                lines.push({ type: "out", text: "  ls [path]            list directory contents" });
                lines.push({ type: "out", text: "  cd <path>            change directory" });
                lines.push({ type: "out", text: "  cat <file>           print file contents" });
                lines.push({ type: "out", text: "  whoami               who am i" });
                lines.push({ type: "out", text: "  neofetch             print skill summary" });
                lines.push({ type: "out", text: "  clear                clear the terminal" });
                lines.push({ type: "muted", text: "Hint: try `cd blogs` then `ls` then `cat <file>`." });
                break;
            case "pwd":
                lines.push({ type: "out", text: cwd });
                break;
            case "whoami":
                lines.push({ type: "out", text: USER });
                break;
            case "neofetch":
                lines.push({ type: "out", text: SKILLS_TXT });
                break;
            case "ls": {
                const target = arg ? resolvePath(cwd, arg) : cwd;
                const node = lookup(fs, target);
                if (node === null) {
                    lines.push({ type: "err", text: `ls: cannot access '${arg || target}': No such file or directory` });
                    break;
                }
                if (!isDir(node)) {
                    lines.push({ type: "out", text: arg || target.split("/").pop() });
                    break;
                }
                const names = Object.keys(node).sort();
                if (names.length === 0) {
                    lines.push({ type: "muted", text: "(empty)" });
                } else {
                    lines.push({
                        type: "out",
                        text: names.map((n) => (isDir(node[n]) ? `${n}/` : n)).join("  "),
                    });
                }
                break;
            }
            case "cd": {
                if (!arg || arg === "~") {
                    nextCwd = HOME;
                    break;
                }
                const target = resolvePath(cwd, arg);
                const node = lookup(fs, target);
                if (node === null) {
                    lines.push({ type: "err", text: `cd: ${arg}: No such file or directory` });
                    break;
                }
                if (!isDir(node)) {
                    lines.push({ type: "err", text: `cd: ${arg}: Not a directory` });
                    break;
                }
                nextCwd = target;
                break;
            }
            case "cat": {
                if (!arg) {
                    lines.push({ type: "err", text: "cat: missing operand" });
                    break;
                }
                const target = resolvePath(cwd, arg);
                const node = lookup(fs, target);
                if (node === null) {
                    lines.push({ type: "err", text: `cat: ${arg}: No such file or directory` });
                    break;
                }
                if (isDir(node)) {
                    lines.push({ type: "err", text: `cat: ${arg}: Is a directory` });
                    break;
                }
                lines.push({ type: "out", text: node });
                break;
            }
            default:
                lines.push({ type: "err", text: `${cmd}: command not found` });
        }

        setHistory((h) => [...h, echo, ...lines]);
        if (nextCwd !== cwd) setCwd(nextCwd);
    }, [cwd, fs]);

    const onKeyDown = useCallback((e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const raw = input;
            setInput("");
            if (raw.trim().length > 0) {
                setCmdLog((log) => [...log, raw]);
            }
            setLogIdx(-1);
            run(raw);
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (cmdLog.length === 0) return;
            const next = logIdx === -1 ? cmdLog.length - 1 : Math.max(0, logIdx - 1);
            setLogIdx(next);
            setInput(cmdLog[next] ?? "");
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (logIdx === -1) return;
            const next = logIdx + 1;
            if (next >= cmdLog.length) {
                setLogIdx(-1);
                setInput("");
            } else {
                setLogIdx(next);
                setInput(cmdLog[next] ?? "");
            }
            return;
        }
        if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            setHistory([]);
        }
    }, [input, logIdx, cmdLog, run]);

    const renderLine = useCallback((entry, idx) => {
        if (entry.type === "prompt") {
            return (
                <div key={idx} className={classes.promptRow}>
                    <span className={classes.user}>{PROMPT_USER_HOST}</span>
                    <span>:</span>
                    <span className={classes.path}>{displayCwd(entry.cwd)}</span>
                    <span>$ </span>
                    <span className={classes.line}>{entry.text}</span>
                </div>
            );
        }
        const style = entry.type === "err" ? classes.err : entry.type === "muted" ? classes.muted : classes.out;
        return (
            <div key={idx} className={`${classes.line} ${style}`}>
                {entry.text}
            </div>
        );
    }, [classes]);

    return (
        <section id="terminal" className={classes.section}>
            <div
                ref={sectionRef}
                className={`${classes.terminalBox} reveal-terminal${visible ? " is-visible" : ""}`}
                onClick={focusInput}
            >
                <div className={classes.topBar}>
                    <div className={classes.dots}>
                        <div className={`${classes.dot} ${classes.dotRed}`} />
                        <div className={`${classes.dot} ${classes.dotYellow}`} />
                        <div className={`${classes.dot} ${classes.dotGreen}`} />
                    </div>
                    <div className={classes.title}>{PROMPT_USER_HOST}: {displayCwd(cwd)}</div>
                </div>
                <div ref={bodyRef} className={classes.body}>
                    {history.map(renderLine)}
                    <div className={classes.promptRow}>
                        <span className={classes.user}>{PROMPT_USER_HOST}</span>
                        <span>:</span>
                        <span className={classes.path}>{displayCwd(cwd)}</span>
                        <span>$ </span>
                        <span className={classes.line}>{input}</span>
                        {focused && <span className={classes.cursor} aria-hidden="true" />}
                    </div>
                </div>
                <input
                    ref={inputRef}
                    className={classes.hiddenInput}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    aria-label="Interactive terminal input"
                />
            </div>
        </section>
    );
};
