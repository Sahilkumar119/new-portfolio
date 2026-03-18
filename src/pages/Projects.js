import React from "react";
import { Container, Hidden } from "@material-ui/core";
import { LogoLink } from "../components/logo/LogoLink";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { FooterText } from "../components/footer/FooterText";
import { SocialIcons } from "../components/content/SocialIcons";
import { NavigationButtons } from "../components/navigation/NavigationButtons";
import DisplacementSphere from "../components/background/DisplacementSphere";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../components/content/TextDecrypt";
import { topProjects, stepProjects } from "../data/projects";

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

    // Page header
    pageHeader: {
        marginBottom: "4rem",
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
        maxWidth: "520px",
    },

    // Section
    section: {
        marginBottom: "4rem",
    },
    sectionLabel: {
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--text-tertiary)",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        "&::after": {
            content: '""',
            flex: 1,
            height: "1px",
            background: "var(--divider)",
        },
    },

    // Project grid
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.25rem",
        "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr",
        },
    },

    // Project card — glass but restrained
    card: {
        position: "relative",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        borderRadius: "18px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "all 260ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0, left: "10%", right: "10%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        },
        "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "var(--glass-shadow-hover)",
            background: "var(--glass-bg-hover)",
        },
    },
    cardTitle: {
        fontSize: "1.05rem",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        color: "var(--text-primary)",
        marginBottom: "0.6rem",
    },
    cardDesc: {
        fontSize: "0.88rem",
        lineHeight: 1.65,
        color: "var(--text-secondary)",
        flex: 1,
        marginBottom: "1.25rem",
    },

    // Tech stack — just plain text tokens, no chip boxes
    techRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginBottom: "1.5rem",
    },
    techToken: {
        fontSize: "0.7rem",
        fontWeight: 500,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "var(--text-tertiary)",
        fontFamily: "'SF Mono','Fira Code',monospace",
    },
    techSep: {
        fontSize: "0.7rem",
        color: "var(--divider)",
        userSelect: "none",
    },

    // Card links
    cardLinks: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginTop: "auto",
        paddingTop: "1.25rem",
        borderTop: "1px solid var(--divider)",
    },
    cardLinkPrimary: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.8rem",
        fontWeight: 600,
        color: "var(--accent-primary)",
        textDecoration: "none",
        transition: "opacity 200ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1)",
        "&:hover": { opacity: 0.8, transform: "translateY(-1px)", textDecoration: "none" },
    },
    cardLinkSecondary: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.8rem",
        fontWeight: 500,
        color: "var(--text-tertiary)",
        textDecoration: "none",
        marginLeft: "auto",
        transition: "color 200ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1)",
        "&:hover": { color: "var(--text-secondary)", transform: "translateY(-1px)", textDecoration: "none" },
    },

    // Empty state
    emptyState: {
        padding: "3rem 0",
        color: "var(--text-tertiary)",
        fontSize: "0.9rem",
        fontStyle: "italic",
    },
}));

const ProjectCard = ({ project, classes }) => {
    const hasLink   = project.link   && project.link   !== "#";
    const hasGithub = project.github && project.github !== "#";

    return (
        <div className={classes.card}>
            <h2 className={classes.cardTitle}>{project.title}</h2>
            <p className={classes.cardDesc}>{project.description}</p>
            {project.technologies?.length > 0 && (
                <div className={classes.techRow}>
                    {project.technologies.map((tech, i) => (
                        <React.Fragment key={tech}>
                            <span className={classes.techToken}>{tech}</span>
                            {i < project.technologies.length - 1 && (
                                <span className={classes.techSep} aria-hidden="true">·</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
            {(hasLink || hasGithub) && (
                <div className={classes.cardLinks}>
                    {hasLink && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={classes.cardLinkPrimary}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            View live
                        </a>
                    )}
                    {hasGithub && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={classes.cardLinkSecondary}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export const Projects = () => {
    const classes = useStyles();
    const allEmpty = topProjects.length === 0 && stepProjects.length === 0;

    return (
        <div className={classes.root}>
            <div className={classes.glowBlue}  aria-hidden="true" />
            <div className={classes.glowPurple} aria-hidden="true" />
            <DisplacementSphere />
            <LogoLink />
            <Hidden smDown><NavigationButtons /></Hidden>
            <ThemeToggle />
            <Hidden smDown><SocialIcons /></Hidden>

            <Container className={classes.content} maxWidth="lg" component="main">
                <header className={classes.pageHeader}>
                    <span className={classes.pageEyebrow}>Selected work</span>
                    <div className={classes.pageTitle}>
                        <TextDecrypt text="Projects" />
                    </div>
                    <p className={classes.pageSubtitle}>
                        A journey through code, creativity, and continuous learning.
                    </p>
                </header>

                {allEmpty ? (
                    <p className={classes.emptyState}>Projects coming soon — check back later.</p>
                ) : (
                    <>
                        {topProjects.length > 0 && (
                            <section className={classes.section}>
                                <h2 className={classes.sectionLabel}>Top projects</h2>
                                <div className={classes.grid}>
                                    {topProjects.map(p => <ProjectCard key={p.id} project={p} classes={classes} />)}
                                </div>
                            </section>
                        )}
                        {stepProjects.length > 0 && (
                            <section className={classes.section}>
                                <h2 className={classes.sectionLabel}>Learning projects</h2>
                                <div className={classes.grid}>
                                    {stepProjects.map(p => <ProjectCard key={p.id} project={p} classes={classes} />)}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </Container>

            <FooterText />
        </div>
    );
};

export default Projects;
