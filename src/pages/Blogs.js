import React from "react";
import { Container, Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";
import { LogoLink } from "../components/logo/LogoLink";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { FooterText } from "../components/footer/FooterText";
import { SocialIcons } from "../components/content/SocialIcons";
import { NavigationButtons } from "../components/navigation/NavigationButtons";
import DisplacementSphere from "../components/background/DisplacementSphere";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../components/content/TextDecrypt";
import { blogs } from "../data/blogs";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
    },
    glowBlue: {
        position: "fixed",
        top: "-20vh", right: "-15vw",
        width: "clamp(400px,60vw,900px)", height: "clamp(400px,60vw,900px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--glow-blue) 0%, transparent 70%)",
        filter: "blur(60px)", zIndex: 0, pointerEvents: "none",
        animation: "$glowPulse 9s ease-in-out infinite",
    },
    glowPurple: {
        position: "fixed",
        bottom: "-20vh", left: "-10vw",
        width: "clamp(300px,50vw,700px)", height: "clamp(300px,50vw,700px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--glow-purple) 0%, transparent 70%)",
        filter: "blur(60px)", zIndex: 0, pointerEvents: "none",
        animation: "$glowPulse 11s ease-in-out 2s infinite",
    },
    "@keyframes glowPulse": {
        "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
        "50%":       { opacity: 0.95, transform: "scale(1.08)" },
    },

    content: {
        paddingTop: "8rem",
        paddingBottom: "6rem",
        zIndex: 10,
        flex: 1,
    },

    pageHeader: {
        marginBottom: "3.5rem",
        animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
    },
    pageEyebrow: {
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--text-tertiary)",
        display: "block",
        marginBottom: "0.75rem",
    },
    pageTitle: {
        fontSize: "clamp(2.5rem, 6vw, 4rem)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.0,
        color: "var(--text-primary)",
        marginBottom: "0.75rem",
        "& p": { margin: 0 },
    },
    pageSubtitle: {
        fontSize: "1rem",
        color: "var(--text-secondary)",
        fontWeight: 400,
        lineHeight: 1.6,
        maxWidth: "480px",
        margin: 0,
    },

    list: {
        display: "flex",
        flexDirection: "column",
        gap: "1px",
    },

    // Blog entry — editorial list format, not a card grid
    entry: {
        display: "block",
        textDecoration: "none",
        padding: "1.75rem 0",
        borderBottom: "1px solid var(--divider)",
        transition: "all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:first-child": { borderTop: "1px solid var(--divider)" },
        "&:hover $entryTitle": { color: "var(--accent-primary)" },
        "&:hover $entryArrow": { transform: "translateX(4px)", opacity: 1 },
        "&:hover": { textDecoration: "none" },
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
    entryBody: {
        display: "flex",
        gap: "1rem",
        alignItems: "flex-start",
    },
    entryTitle: {
        fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        color: "var(--text-primary)",
        lineHeight: 1.3,
        flex: 1,
        transition: "color 180ms ease",
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
    entryThumb: {
        width: "120px",
        height: "72px",
        objectFit: "cover",
        borderRadius: "8px",
        border: "1px solid var(--glass-border)",
        flexShrink: 0,
        marginTop: "0.35rem",
        "@media (max-width: 600px)": {
            display: "none",
        },
    },

    emptyState: {
        padding: "3rem 0",
        color: "var(--text-tertiary)",
        fontSize: "0.9rem",
        fontStyle: "italic",
    },
}));

export const Blogs = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.glowBlue}  aria-hidden="true" />
            <div className={classes.glowPurple} aria-hidden="true" />
            <DisplacementSphere />
            <LogoLink />
            <Hidden smDown><NavigationButtons /></Hidden>
            <ThemeToggle />
            <Hidden smDown><SocialIcons /></Hidden>

            <Container className={classes.content} maxWidth="md" component="main">
                <header className={classes.pageHeader}>
                    <span className={classes.pageEyebrow}>Writing</span>
                    <div className={classes.pageTitle}>
                        <TextDecrypt text="Blog" />
                    </div>
                    <p className={classes.pageSubtitle}>
                        Thoughts, tutorials, and explorations on my learning journey.
                    </p>
                </header>

                {blogs.length === 0 ? (
                    <p className={classes.emptyState}>No posts yet — check back soon.</p>
                ) : (
                    <div className={classes.list} role="list">
                        {blogs.map((blog) => (
                            <Link
                                key={blog.id}
                                to={`/blog/${blog.slug}`}
                                className={classes.entry}
                                role="listitem"
                            >
                                <div className={classes.entryMeta}>
                                    <span className={classes.entryDate}>{blog.date}</span>
                                    {blog.tags?.length > 0 && (
                                        <div className={classes.entryTags}>
                                            {blog.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className={classes.entryTag}>{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className={classes.entryRow}>
                                    <h2 className={classes.entryTitle}>{blog.title}</h2>
                                    <span className={classes.entryArrow} aria-hidden="true">→</span>
                                </div>
                                <div className={classes.entryBody}>
                                    <p className={classes.entryExcerpt}>{blog.excerpt}</p>
                                    {(blog.coverImage || blog.cover || blog.image) && (
                                        <img
                                            src={blog.coverImage || blog.cover || blog.image}
                                            alt={`${blog.title} cover`}
                                            className={classes.entryThumb}
                                        />
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>

            <FooterText />
        </div>
    );
};

export default Blogs;
