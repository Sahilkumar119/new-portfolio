import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { education, experience, achievements } from "../../data/experience";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const useStyles = makeStyles(() => ({
    section: {
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "clamp(4rem, 8vw, 8rem)",
        paddingRight: "clamp(4rem, 8vw, 8rem)",
        position: "relative",
        "@media (max-width: 768px)": {
            paddingTop: "4rem",
            paddingBottom: "4rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
        },
    },
    header: {
        marginBottom: "4rem",
        textAlign: "center",
    },
    eyebrow: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--accent-primary)",
        display: "block",
        marginBottom: "1rem",
    },
    title: {
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        color: "var(--text-primary)",
        margin: 0,
    },
    inner: {
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
    },
    group: {
        width: "100%",
        marginBottom: "3.5rem",
        "&:last-child": {
            marginBottom: 0,
        },
    },
    groupHeading: {
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        fontSize: "0.8rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-primary)",
        margin: "0 0 1.75rem",
        "&::after": {
            content: '""',
            flex: 1,
            height: "1px",
            background: "var(--glass-border)",
        },
    },
    // --- Timeline rail ---
    timeline: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        paddingLeft: "1.75rem",
        "&::before": {
            content: '""',
            position: "absolute",
            top: "0.5rem",
            bottom: "0.5rem",
            left: "5px",
            width: "1px",
            background: "var(--divider)",
        },
        "@media (max-width: 768px)": {
            paddingLeft: "1.25rem",
        },
    },
    entry: {
        position: "relative",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        borderRadius: "14px",
        boxShadow: "var(--glass-shadow)",
        padding: "1.5rem 1.75rem",
        overflow: "hidden",
        transition: "transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1), background 280ms ease, box-shadow 280ms ease, border-color 280ms ease",
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
            transform: "translateY(-3px) translateX(4px)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
        },
        "@media (max-width: 768px)": {
            padding: "1.25rem 1.25rem",
        },
    },
    dot: {
        position: "absolute",
        left: "-1.75rem",
        top: "1.9rem",
        width: "11px",
        height: "11px",
        borderRadius: "50%",
        background: "var(--accent-primary)",
        border: "2px solid var(--glass-border)",
        transition: "transform 280ms ease",
        "$entry:hover &": {
            transform: "scale(1.25)",
        },
        "@media (max-width: 768px)": {
            left: "-1.25rem",
        },
    },
    entryTop: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: "1rem",
        marginBottom: "0.4rem",
        "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.25rem",
        },
    },
    entryTitle: {
        fontSize: "1.1rem",
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
        color: "var(--text-primary)",
        margin: 0,
    },
    period: {
        flexShrink: 0,
        fontSize: "0.75rem",
        fontWeight: 500,
        whiteSpace: "nowrap",
        color: "var(--text-tertiary)",
        fontFamily: "'SF Mono', monospace",
    },
    org: {
        display: "block",
        fontSize: "0.85rem",
        fontWeight: 500,
        color: "var(--accent-tertiary)",
        marginBottom: "0.9rem",
    },
    points: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
    point: {
        position: "relative",
        paddingLeft: "1rem",
        fontSize: "0.85rem",
        lineHeight: 1.6,
        color: "var(--text-secondary)",
        "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "0.62em",
            width: "5px",
            height: "1px",
            background: "var(--accent-primary)",
        },
    },
    eduDegree: {
        fontSize: "0.85rem",
        lineHeight: 1.6,
        color: "var(--text-secondary)",
        margin: 0,
    },
    // --- Achievements ---
    achievementGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.25rem",
        width: "100%",
    },
    achievement: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        borderRadius: "14px",
        boxShadow: "var(--glass-shadow)",
        padding: "1.25rem 1.4rem",
        overflow: "hidden",
        transition: "transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1), background 280ms ease, box-shadow 280ms ease",
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
            transform: "translateY(-4px)",
            background: "var(--glass-bg-hover)",
            boxShadow: "var(--glass-shadow-hover)",
        },
    },
    achievementYear: {
        fontSize: "0.68rem",
        fontWeight: 600,
        fontFamily: "'SF Mono', monospace",
        color: "var(--accent-primary)",
        letterSpacing: "0.05em",
        marginBottom: "0.5rem",
    },
    achievementTitle: {
        fontSize: "0.95rem",
        fontWeight: 700,
        lineHeight: 1.35,
        color: "var(--text-primary)",
        margin: "0 0 0.45rem",
    },
    achievementDetail: {
        fontSize: "0.8rem",
        lineHeight: 1.55,
        color: "var(--text-secondary)",
        margin: 0,
    },
    "@media (prefers-reduced-motion: reduce)": {
        entry: { transition: "none" },
        dot: { transition: "none" },
        achievement: { transition: "none" },
    },
}));

export const Experience = () => {
    const classes = useStyles();
    const [sectionRef, visible] = useScrollReveal({ threshold: 0.1 });

    const roles = Array.isArray(experience) ? experience : [];
    const schools = Array.isArray(education) ? education : [];
    const awards = Array.isArray(achievements) ? achievements : [];

    return (
        <section
            id="experience"
            ref={sectionRef}
            className={`${classes.section} reveal-section${visible ? " is-visible" : ""}`}
        >
            <div className={classes.header}>
                <span className={classes.eyebrow}>Background</span>
                <h2 className={classes.title}>Experience &amp; Education</h2>
            </div>

            <div className={classes.inner}>
                {roles.length > 0 && (
                    <div className={classes.group}>
                        <h3 className={classes.groupHeading}>Roles</h3>
                        <div className={classes.timeline}>
                            {roles.map((role, i) => (
                                <article
                                    key={i}
                                    className={`${classes.entry} reveal-child`}
                                    style={{ "--reveal-delay": i }}
                                >
                                    <span className={classes.dot} aria-hidden="true" />
                                    <div className={classes.entryTop}>
                                        <h4 className={classes.entryTitle}>{role.role}</h4>
                                        {role.period && <span className={classes.period}>{role.period}</span>}
                                    </div>
                                    {role.org && <span className={classes.org}>{role.org}</span>}
                                    {Array.isArray(role.points) && role.points.length > 0 && (
                                        <ul className={classes.points}>
                                            {role.points.map((point, idx) => (
                                                <li key={idx} className={classes.point}>{point}</li>
                                            ))}
                                        </ul>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                {schools.length > 0 && (
                    <div className={classes.group}>
                        <h3 className={classes.groupHeading}>Education</h3>
                        <div className={classes.timeline}>
                            {schools.map((school, i) => (
                                <article
                                    key={i}
                                    className={`${classes.entry} reveal-child`}
                                    style={{ "--reveal-delay": i }}
                                >
                                    <span className={classes.dot} aria-hidden="true" />
                                    <div className={classes.entryTop}>
                                        <h4 className={classes.entryTitle}>{school.institution}</h4>
                                        {school.period && <span className={classes.period}>{school.period}</span>}
                                    </div>
                                    {school.location && <span className={classes.org}>{school.location}</span>}
                                    {school.degree && <p className={classes.eduDegree}>{school.degree}</p>}
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                {awards.length > 0 && (
                    <div className={classes.group}>
                        <h3 className={classes.groupHeading}>Achievements</h3>
                        <div className={classes.achievementGrid}>
                            {awards.map((award, i) => (
                                <article
                                    key={i}
                                    className={`${classes.achievement} reveal-child`}
                                    style={{ "--reveal-delay": i }}
                                >
                                    {award.year && <span className={classes.achievementYear}>{award.year}</span>}
                                    <h4 className={classes.achievementTitle}>{award.title}</h4>
                                    {award.detail && <p className={classes.achievementDetail}>{award.detail}</p>}
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
