import React, { lazy, Suspense } from 'react';
import { Content } from '../components/content/Content';
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DisplacementSphere from '../components/background/DisplacementSphere';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { FooterText } from '../components/footer/FooterText';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { NavigationButtons } from '../components/navigation/NavigationButtons';

const LinuxTerminal = lazy(() => import('../components/content/LinuxTerminal').then(module => ({ default: module.LinuxTerminal })));
const AIProjects = lazy(() => import('../components/content/AIProjects').then(module => ({ default: module.AIProjects })));
const Certifications = lazy(() => import('../components/content/Certifications').then(module => ({ default: module.Certifications })));
const LatestBlogs = lazy(() => import('../components/content/LatestBlogs').then(module => ({ default: module.LatestBlogs })));
const Connect = lazy(() => import('../components/content/Connect').then(module => ({ default: module.Connect })));

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        // removed overflow: hidden so we can scroll
        minHeight: '100vh',
    },
    heroWrapper: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
    },
    glowBlue: {
        position: 'fixed',
        top: '-20vh',
        right: '-15vw',
        width: 'clamp(400px, 60vw, 900px)',
        height: 'clamp(400px, 60vw, 900px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--glow-blue) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none',
        animation: '$glowPulse 9s ease-in-out infinite',
        willChange: 'transform, opacity',
    },
    glowPurple: {
        position: 'fixed',
        bottom: '-20vh',
        left: '-10vw',
        width: 'clamp(300px, 50vw, 700px)',
        height: 'clamp(300px, 50vw, 700px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--glow-purple) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none',
        animation: '$glowPulse 11s ease-in-out 2s infinite',
        willChange: 'transform, opacity',
    },
    '@keyframes glowPulse': {
        '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
        '50%':       { opacity: 0.95, transform: 'scale(1.08)' },
    },
}));

export const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.glowBlue}  aria-hidden="true" />
            <div className={classes.glowPurple} aria-hidden="true" />
            
            {/* Chrome (Fixed elements) */}
            <Hidden smDown><NavigationButtons /></Hidden>
            <ThemeToggle />
            <Hidden smDown><SocialIcons /></Hidden>
            <Hidden mdUp><SpeedDials /></Hidden>
            
            {/* Scrollable Content */}
            <div className={classes.heroWrapper}>
                <DisplacementSphere /> {/* Hero background */}
                <Content /> {/* Hero content */}
            </div>
            
            <Suspense fallback={<div />}>
                <LinuxTerminal />
                <AIProjects />
                <Certifications />
                <section id="blogs"><LatestBlogs /></section>
                <Connect />
            </Suspense>
            
            <FooterText />
        </div>
    );
};
