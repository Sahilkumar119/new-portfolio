import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

/**
 * Initialize Google Analytics 4
 * @param {string} measurementId - Your GA4 Measurement ID
 */
export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId);
};

/**
 * Track a page view
 * @param {string} path - The path to track
 */
export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

/**
 * Component that tracks page views on every route change
 */
export const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const analytics = {
  initGA,
  trackPageView,
  AnalyticsTracker,
};

export default analytics;
