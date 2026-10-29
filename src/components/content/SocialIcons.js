import React from 'react';
import { Link, Tooltip, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Resume from '../../settings/resume.json';
import { Icon } from './icons';

const useStyles = makeStyles(() => ({
    // Left-edge rail mirroring the section nav on the right, so nothing floats
    // over the content column. Resume leads because it is the main ask.
    rail: {
        position: 'fixed',
        top: '50%',
        left: 'clamp(1rem, 2vw, 2.5rem)',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '12px 10px',
        borderRadius: '20px',
        background: 'var(--matte-turquoise)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        overflow: 'visible',
        animation: 'slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '8%',
            bottom: '8%',
            left: 0,
            width: '1px',
            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.35), transparent)',
            pointerEvents: 'none',
            borderRadius: 'inherit',
        },
    },
    divider: {
        width: '20px',
        height: '1px',
        background: 'rgba(255, 255, 255, 0.18)',
    },
    iconLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '11px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--glass-shadow)',
        color: 'var(--text-secondary)',
        fontSize: '0.88rem',
        textDecoration: 'none',
        transition: 'all 240ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        '&:hover': {
            transform: 'scale(1.08) translateX(2px)',
            background: 'var(--glass-bg-hover)',
            boxShadow: 'var(--glass-shadow-hover)',
            color: 'var(--accent-primary)',
            textDecoration: 'none',
        },
    },
}));

export const SocialIcons = () => {
    const classes = useStyles();
    const profiles = Resume.basics.profiles || [];
    const resumeUrl = `${process.env.PUBLIC_URL}${Resume.basics.resume || '/resume.pdf'}`;

    const item = (label, href, external = true) => (
        <Tooltip key={label} title={label} placement="right" TransitionComponent={Zoom} arrow>
            <Link
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                underline="none"
                className={classes.iconLink}
                aria-label={label}
            >
                <Icon name={label} size={17} />
            </Link>
        </Tooltip>
    );

    return (
        <nav className={classes.rail} aria-label="Resume and profiles">
            {item('Resume', resumeUrl)}
            <span className={classes.divider} aria-hidden="true" />
            {profiles.map((p) => item(p.network, p.url, !p.url.startsWith('mailto:')))}
        </nav>
    );
};
