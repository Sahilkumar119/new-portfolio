import React, { useEffect } from "react";
import { Container, Hidden } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { FooterText } from "../components/footer/FooterText";
import { SocialIcons } from "../components/content/SocialIcons";
import { NavigationButtons } from "../components/navigation/NavigationButtons";
import DisplacementSphere from "../components/background/DisplacementSphere";
import { makeStyles } from "@material-ui/core/styles";
import { blogPosts } from "../data/blogPosts";
import { marked } from "marked";
import DOMPurify from "dompurify";

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
        paddingTop: "7rem",
        paddingBottom: "6rem",
        zIndex: 10,
        flex: 1,
    },

    backBtn: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.8rem",
        fontWeight: 500,
        color: "var(--text-secondary)",
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
        marginBottom: "2.5rem",
        fontFamily: "inherit",
        transition: "color 180ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1)",
        "&:hover": {
            color: "var(--text-primary)",
            transform: "translateX(-3px)",
        },
    },

    article: {
        position: "relative",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        borderRadius: "20px",
        padding: "clamp(2rem, 5vw, 3.5rem)",
        overflow: "hidden",
        animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0, left: "8%", right: "8%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        },
    },

    articleTitle: {
        fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        lineHeight: 1.15,
        color: "var(--text-primary)",
        marginBottom: "1.5rem",
    },

    articleMeta: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
        paddingBottom: "1.5rem",
        marginBottom: "2rem",
        borderBottom: "1px solid var(--divider)",
    },
    metaItem: {
        fontSize: "0.75rem",
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: "var(--text-tertiary)",
        textTransform: "uppercase",
    },
    metaDot: {
        width: "3px",
        height: "3px",
        borderRadius: "50%",
        background: "var(--divider)",
        flexShrink: 0,
    },

    // Blog content rendering
    bodyText: {
        fontSize: "1.02rem",
        lineHeight: 1.8,
        color: "var(--text-secondary)",
        "& p": {
            marginBottom: "1.5rem",
            color: "var(--text-secondary)",
        },
        "& h2": {
            fontSize: "1.4rem",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            marginTop: "2.5rem",
            marginBottom: "1rem",
        },
        "& h3": {
            fontSize: "1.1rem",
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: "var(--text-primary)",
            marginTop: "2rem",
            marginBottom: "0.75rem",
        },
        "& code": {
            fontFamily: "'SF Mono','Fira Code','Fira Mono',monospace",
            fontSize: "0.88em",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            padding: "2px 7px",
            borderRadius: "5px",
            color: "var(--accent-primary)",
        },
        "& pre": {
            background: "var(--glass-bg)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--glass-border)",
            borderRadius: "12px",
            padding: "1.5rem",
            overflow: "auto",
            margin: "1.5rem 0",
            "& code": {
                background: "none",
                border: "none",
                padding: 0,
                color: "var(--text-primary)",
            },
        },
        "& img": {
            maxWidth: "100%",
            borderRadius: "12px",
            margin: "1.5rem 0",
        },
        "& ul, & ol": {
            paddingLeft: "1.5rem",
            marginBottom: "1.5rem",
            "& li": { marginBottom: "0.5rem", lineHeight: 1.75 },
        },
        "& blockquote": {
            borderLeft: "3px solid var(--accent-primary)",
            marginLeft: 0,
            padding: "0.75rem 1.5rem",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
            background: "var(--glass-bg)",
            borderRadius: "0 10px 10px 0",
            fontStyle: "italic",
            "& p": { marginBottom: 0, color: "var(--text-secondary)" },
        },
        "& strong": {
            fontWeight: 700,
            color: "var(--text-primary)",
        },
        "& a": {
            color: "var(--accent-primary)",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
        },
    },

    // iframe embeds
    iframeWrapper: {
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        margin: "2rem 0",
        borderRadius: "12px",
        border: "1px solid var(--glass-border)",
        "& iframe": {
            position: "absolute",
            top: 0, left: 0,
            width: "100%", height: "100%",
        },
    },

    notFound: {
        textAlign: "center",
        padding: "6rem 2rem",
        color: "var(--text-tertiary)",
    },
    notFoundTitle: {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--text-primary)",
        marginBottom: "0.75rem",
    },
    notFoundSub: {
        fontSize: "0.95rem",
        lineHeight: 1.6,
    },
}));

export const BlogPost = () => {
    const classes = useStyles();
    const { slug } = useParams();
    const post     = blogPosts[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const renderContent = () => {
        if (!post?.content) return null;
        // Parse markdown to HTML and sanitize
        const rawHtml = marked.parse(post.content);
        // Allow iframes (e.g. youtube) while avoiding XSS
        const sanitizedHtml = DOMPurify.sanitize(rawHtml, { ADD_TAGS: ["iframe"], ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"] });
        return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
    };

    const chrome = (
        <>
            <DisplacementSphere />
            <Hidden smDown><NavigationButtons /></Hidden>
            <ThemeToggle />
            <Hidden smDown><SocialIcons /></Hidden>
        </>
    );

    if (!post) {
        return (
            <div className={classes.root}>
                <div className={classes.glowBlue} aria-hidden="true" />
                <div className={classes.glowPurple} aria-hidden="true" />
                {chrome}
                <Container className={classes.content} maxWidth="md" component="main">
                    <Link to="/#blogs" className={classes.backBtn}>
                        ← Back to Blog
                    </Link>
                    <div className={classes.notFound}>
                        <p className={classes.notFoundTitle}>Post not found</p>
                        <p className={classes.notFoundSub}>This post doesn't exist or may have moved.</p>
                    </div>
                </Container>
                <FooterText />
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.glowBlue} aria-hidden="true" />
            <div className={classes.glowPurple} aria-hidden="true" />
            {chrome}

            <Container className={classes.content} maxWidth="md" component="main">
                <Link to="/#blogs" className={classes.backBtn}>
                    ← Back to Blog
                </Link>

                <article className={classes.article}>
                    <h1 className={classes.articleTitle}>{post.title}</h1>
                    <div className={classes.articleMeta}>
                        <span className={classes.metaItem}>{post.date}</span>
                        <span className={classes.metaDot} />
                        <span className={classes.metaItem}>{post.readTime}</span>
                        <span className={classes.metaDot} />
                        <span className={classes.metaItem}>By {post.author}</span>
                        {post.tags?.length > 0 && (
                            <>
                                <span className={classes.metaDot} />
                                <span className={classes.metaItem}>{post.tags.join(" · ")}</span>
                            </>
                        )}
                    </div>
                    <div className={classes.bodyText}>{renderContent()}</div>
                </article>
            </Container>

            <FooterText />
        </div>
    );
};

export default BlogPost;
