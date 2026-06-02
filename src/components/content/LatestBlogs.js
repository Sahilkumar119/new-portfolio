import React from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { blogs } from "../../data/blogs";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const useStyles = makeStyles(() => ({
    section: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "8rem",
        paddingBottom: "4rem",
        paddingLeft: "clamp(4rem, 8vw, 8rem)",
        paddingRight: "clamp(4rem, 8vw, 8rem)",
        position: "relative",
    },
    header: {
        marginBottom: "3rem",
        textAlign: "center",
        flexShrink: 0,
    },
    eyebrow: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--accent-primary)",
        display: "block",
        marginBottom: "0.75rem",
    },
    title: {
        fontSize: "clamp(2.5rem, 6vw, 4rem)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.0,
        color: "var(--text-primary)",
        margin: 0,
    },
    
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
    },

    entry: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        textDecoration: "none",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        borderRadius: "20px",
        boxShadow: "var(--glass-shadow)",
        overflow: "hidden",
        transition: "all 280ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "8%",
            right: "8%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
            pointerEvents: "none",
        },
        "&:hover": {
            textDecoration: "none",
            transform: "translateY(-4px)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
        },
        "&:hover $entryArrow": { transform: "translateX(4px)", opacity: 1 },
        "&:hover $entryTitle": { color: "#ff9f1c" },
        "@media (max-width: 767px)": {
            flexDirection: "column",
        },
    },
    imageContainer: {
        width: "36%",
        minWidth: "220px",
        position: "relative",
        flexShrink: 0,
        overflow: "hidden",
        borderRight: "1px solid var(--glass-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0c",
        "@media (max-width: 767px)": {
            width: "100%",
            minWidth: "auto",
            height: "180px",
            borderRight: "none",
            borderBottom: "1px solid var(--glass-border)",
        },
    },
    coverImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center center",
        display: "block",
    },
    featuredBadge: {
        position: "absolute",
        top: "12px",
        left: "12px",
        background: "linear-gradient(135deg, #ff9f1c 0%, #ff8c00 100%)",
        color: "#fff",
        fontSize: "0.68rem",
        fontWeight: 700,
        padding: "3.5px 9.5px",
        borderRadius: "20px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        boxShadow: "0 2px 8px rgba(255, 140, 0, 0.4)",
        zIndex: 2,
    },
    contentArea: {
        width: "64%",
        minWidth: 0,
        padding: "1.5rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1,
        "@media (max-width: 767px)": {
            width: "100%",
            padding: "1.25rem",
        },
    },
    entryMeta: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.85rem",
        marginBottom: "0.6rem",
        color: "var(--text-tertiary)",
        fontSize: "0.75rem",
        fontWeight: 500,
    },
    metaItem: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
    },
    entryTitle: {
        fontSize: "clamp(1.15rem, 2.4vw, 1.4rem)",
        fontWeight: 700,
        letterSpacing: "-0.025em",
        color: "var(--text-primary)",
        lineHeight: 1.25,
        margin: "0 0 0.6rem 0",
        transition: "color 180ms ease",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
    },
    entryArrow: {
        fontSize: "1.1rem",
        color: "var(--accent-primary)",
        opacity: 0,
        transition: "transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 180ms ease",
        flexShrink: 0,
        marginTop: "2px",
    },
    entryExcerpt: {
        fontSize: "0.88rem",
        lineHeight: 1.6,
        color: "var(--text-secondary)",
        margin: "0 0 1.25rem 0",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },
    entryTags: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginTop: "auto",
    },
    entryTag: {
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "0.72rem",
        fontWeight: 500,
        color: "var(--text-secondary)",
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid var(--glass-border)",
        padding: "3px 9px",
        borderRadius: "20px",
        letterSpacing: "0.02em",
        transition: "all 180ms ease",
    },
    emptyState: {
        padding: "3rem 0",
        color: "var(--text-tertiary)",
        fontSize: "0.9rem",
        fontStyle: "italic",
    },
}));

const NetworkSvg = () => (
    <svg width="100%" height="100%" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: '#0a0a0c', display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}>
        <style>{`
            @keyframes pulseCenter {
                0%, 100% { transform: scale(1); opacity: 0.9; }
                50% { transform: scale(1.08); opacity: 1; }
            }
            @keyframes pulseTiny {
                0%, 100% { opacity: 0.25; }
                50% { opacity: 0.75; }
            }
            @keyframes dashMove {
                to { stroke-dashoffset: -20; }
            }
            @keyframes pulseGlow {
                0%, 100% { opacity: 0.15; }
                50% { opacity: 0.3; }
            }
            .center-node {
                transform-origin: 200px 125px;
                animation: pulseCenter 4s ease-in-out infinite;
            }
            .tiny-node {
                animation: pulseTiny 3s ease-in-out infinite;
            }
            .tiny-node-delayed {
                animation: pulseTiny 3.5s ease-in-out infinite 1s;
            }
            .dashed-line {
                stroke-dasharray: 4, 4;
                animation: dashMove 1.5s linear infinite;
            }
            .glow-bg {
                animation: pulseGlow 6s ease-in-out infinite;
            }
        `}</style>
        <defs>
            <radialGradient id="netGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#00bfbf" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
            </radialGradient>
        </defs>
        <rect width="400" height="250" fill="url(#netGlow)" className="glow-bg" />
        
        {/* Network arcs */}
        <path d="M 50,50 Q 200,20 350,50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
        <path d="M 50,200 Q 200,230 350,200" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
        <path d="M 100,50 Q 200,125 100,200" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
        <path d="M 300,50 Q 200,125 300,200" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
        
        {/* Network connections */}
        <line x1="200" y1="125" x2="100" y2="80" stroke="rgba(0, 191, 191, 0.4)" strokeWidth="1.2" className="dashed-line" />
        <line x1="200" y1="125" x2="300" y2="70" stroke="rgba(0, 191, 191, 0.5)" strokeWidth="1.5" />
        <line x1="200" y1="125" x2="120" y2="180" stroke="rgba(0, 191, 191, 0.5)" strokeWidth="1.5" className="dashed-line" />
        <line x1="200" y1="125" x2="280" y2="170" stroke="rgba(0, 191, 191, 0.3)" strokeWidth="1" />
        <line x1="100" y1="80" x2="220" y2="50" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
        <line x1="300" y1="70" x2="220" y2="50" stroke="rgba(0, 191, 191, 0.4)" strokeWidth="1.2" />
        <line x1="120" y1="180" x2="280" y2="170" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
        <line x1="100" y1="80" x2="120" y2="180" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
        <line x1="300" y1="70" x2="280" y2="170" stroke="rgba(0, 191, 191, 0.3)" strokeWidth="1.2" />

        {/* Nodes */}
        <circle cx="200" cy="125" r="9" stroke="#00bfbf" strokeWidth="2" fill="#0a0a0c" className="center-node" />
        <circle cx="200" cy="125" r="3" fill="#00bfbf" className="center-node" />
        
        <circle cx="100" cy="80" r="6" stroke="#005757" strokeWidth="1.5" fill="#0a0a0c" />
        <circle cx="100" cy="80" r="2" fill="#005757" />
        
        <circle cx="300" cy="70" r="7" stroke="#00bfbf" strokeWidth="1.8" fill="#0a0a0c" />
        <circle cx="300" cy="70" r="2.5" fill="#00bfbf" />
        
        <circle cx="120" cy="180" r="7" stroke="#00bfbf" strokeWidth="1.8" fill="#0a0a0c" />
        <circle cx="120" cy="180" r="2.5" fill="#00bfbf" />
        
        <circle cx="280" cy="170" r="5" stroke="#005757" strokeWidth="1.5" fill="#0a0a0c" />
        <circle cx="280" cy="170" r="1.8" fill="#005757" />
        
        <circle cx="220" cy="50" r="5" stroke="#005757" strokeWidth="1.5" fill="#0a0a0c" />
        <circle cx="220" cy="50" r="1.8" fill="#005757" />
        
        <circle cx="70" cy="130" r="2" fill="rgba(255, 255, 255, 0.15)" className="tiny-node" />
        <circle cx="340" cy="130" r="2.5" fill="rgba(0, 191, 191, 0.2)" className="tiny-node-delayed" />
        <circle cx="150" cy="90" r="2" fill="rgba(0, 191, 191, 0.15)" className="tiny-node" />
        <circle cx="250" cy="150" r="1.5" fill="rgba(255, 255, 255, 0.1)" className="tiny-node-delayed" />
    </svg>
);

export const LatestBlogs = () => {
    const classes = useStyles();
    const [sectionRef, visible] = useScrollReveal({ threshold: 0.08 });

    return (
        <section
            ref={sectionRef}
            className={`${classes.section} reveal-section${visible ? ' is-visible' : ''}`}
            aria-label="Latest Writing"
        >
            <Container maxWidth="md">
                <header className={classes.header}>
                    <span className={classes.eyebrow}>Writing</span>
                    <h2 className={classes.title}>Latest Explorations</h2>
                </header>

                {(!Array.isArray(blogs) || blogs.length === 0) ? (
                    <p className={classes.emptyState}>No posts yet — check back soon.</p>
                ) : (
                    <div className={classes.list} role="list">
                        {blogs.map((blog, i) => (
                            <Link
                                key={blog.id}
                                to={`/blog/${blog.slug}`}
                                className={`${classes.entry} reveal-child`}
                                style={{ '--reveal-delay': i }}
                                role="listitem"
                            >
                                <div className={classes.imageContainer}>
                                    {(blog.featured || i === 0) && (
                                        <div className={classes.featuredBadge}>Featured</div>
                                    )}
                                    {blog.coverImage || blog.cover || blog.image ? (
                                        <img src={blog.coverImage || blog.cover || blog.image} alt={blog.title} className={classes.coverImage} />
                                    ) : (
                                        <NetworkSvg />
                                    )}
                                </div>
                                <div className={classes.contentArea}>
                                    <div>
                                        <div className={classes.entryMeta}>
                                            <span className={classes.metaItem}>
                                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.8 }}>
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                                                    <line x1="3" y1="10" x2="21" y2="10" />
                                                </svg>
                                                {blog.date}
                                            </span>
                                            <span className={classes.metaItem}>
                                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.8 }}>
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12 6 12 12 16 14" />
                                                </svg>
                                                {blog.readTime || "5 min read"}
                                            </span>
                                        </div>
                                        <h3 className={classes.entryTitle}>{blog.title}</h3>
                                        <p className={classes.entryExcerpt}>{blog.excerpt}</p>
                                    </div>
                                    {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                                        <div className={classes.entryTags}>
                                            {blog.tags.map(tag => (
                                                <span key={tag} className={classes.entryTag}>
                                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: "rotate(45deg)", marginRight: "1px", opacity: 0.85 }}>
                                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                                        <circle cx="7" cy="7" r="0.5" fill="currentColor" />
                                                    </svg>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
};
