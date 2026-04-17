import React from "react";
import Helmet from "react-helmet";
import Resume from "../settings/resume.json";
import Settings from "../settings/settings.json";

export const HelmetMeta = () => {
    return (
        <Helmet>
            <meta name="theme-color" content={Settings.colors.primary} />
            <title>{Resume.basics.name} | {Resume.basics.label}</title>
            <meta name="author" content={Resume.basics.name} />
            <meta name="description" content={Resume.basics.description} />
            <meta name="keywords" content={Resume.basics.keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={Resume.basics.url} />
            <meta property="og:title" content={`${Resume.basics.name} | ${Resume.basics.label}`} />
            <meta property="og:description" content={Resume.basics.description} />
            <meta property="og:image" content={`${Resume.basics.url}/android-chrome-512x512.png`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={Resume.basics.url} />
            <meta property="twitter:title" content={`${Resume.basics.name} | ${Resume.basics.label}`} />
            <meta property="twitter:description" content={Resume.basics.description} />
            <meta property="twitter:image" content={`${Resume.basics.url}/android-chrome-512x512.png`} />
            
            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <link rel="canonical" href={Resume.basics.url} />
        </Helmet>
    );
};
