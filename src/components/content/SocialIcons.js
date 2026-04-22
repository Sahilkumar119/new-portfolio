import React from 'react';
import { Link, Tooltip, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Resume from '../../settings/resume.json';
import { MorphPanel } from '../ui/ai-input';

const useStyles = makeStyles(() => ({
    rail: {
        position: 'fixed',
        bottom: '2.5rem',
        left: 0,
        right: 0,
        margin: '0 auto',
        width: 'max-content',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '10px 16px',
        borderRadius: '20px',
        background: 'var(--matte-turquoise)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        animation: 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both',
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
            transform: 'scale(1.12) translateX(-3px)',
            background: 'var(--glass-bg-hover)',
            boxShadow: 'var(--glass-shadow-hover)',
            color: 'var(--accent-primary)',
            textDecoration: 'none',
        },
    },
    aiWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 2px',
    },
}));

export const SocialIcons = () => {
    const classes = useStyles();
    const profiles = Resume.basics.profiles || [];
    const insertAt = Math.ceil(profiles.length / 2);

    return (
        <div className={classes.rail}>
            {profiles.map((item, index) => (
                <React.Fragment key={item.network}>
                    {index === insertAt && (
                        <div className={classes.aiWrap}>
                            <MorphPanel />
                        </div>
                    )}
                    <Tooltip title={item.network} placement="top" TransitionComponent={Zoom} arrow>
                        <Link
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="none"
                            className={classes.iconLink}
                            aria-label={item.network}
                        >
                            <i className={item.x_icon} aria-hidden="true" />
                        </Link>
                    </Tooltip>
                </React.Fragment>
            ))}
        </div>
    );
};
