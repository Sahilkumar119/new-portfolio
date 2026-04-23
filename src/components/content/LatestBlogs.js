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
        gap: "1rem",
    },

    entry: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        padding: "1.75rem 2rem",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        borderRadius: "14px",
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
        "&:hover $entryTitle": { color: "var(--accent-primary)" },
        "&:hover $entryArrow": { transform: "translateX(4px)", opacity: 1 },
        "&:hover": {
            textDecoration: "none",
            transform: "translateY(-3px)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
        },
    },
    entryMeta: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "0.5rem",
    },
    entryDate: {
        fontSize: "0.72rem",
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: "var(--text-tertiary)",
        textTransform: "uppercase",
    },
    entryTags: {
        display: "flex",
        gap: "0.5rem",
    },
    entryTag: {
        fontSize: "0.7rem",
        fontWeight: 500,
        color: "var(--text-tertiary)",
        letterSpacing: "0.03em",
        background: "none",
        "&:not(:last-child)::after": {
            content: '"·"',
            marginLeft: "0.5rem",
            color: "var(--divider)",
        },
    },
    entryRow: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1rem",
    },
    entryTitle: {
        fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        color: "var(--text-primary)",
        lineHeight: 1.3,
        flex: 1,
        transition: "color 180ms ease",
        margin: 0,
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
        lineHeight: 1.65,
        color: "var(--text-secondary)",
        marginTop: "0.5rem",
        maxWidth: "640px",
    },
    emptyState: {
        padding: "3rem 0",
        color: "var(--text-tertiary)",
        fontSize: "0.9rem",
        fontStyle: "italic",
    },
}));

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
                                <div className={classes.entryMeta}>
                                    <span className={classes.entryDate}>{blog.date}</span>
                                    {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                                        <div className={classes.entryTags}>
                                            {blog.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className={classes.entryTag}>{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className={classes.entryRow}>
                                    <h3 className={classes.entryTitle}>{blog.title}</h3>
                                    <span className={classes.entryArrow} aria-hidden="true">→</span>
                                </div>
                                <p className={classes.entryExcerpt}>{blog.excerpt}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
};
