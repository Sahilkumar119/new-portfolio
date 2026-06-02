import React, { useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";
import { initGA, AnalyticsTracker } from "../utils/Analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject as injectVercelAnalytics } from "@vercel/analytics";

import { Home } from "../pages/Home";
import BlogPost from "../pages/BlogPost";
import PageNotFound from "../pages/PageNotFound";
import Learn from "../pages/Learn";

export const App = () => {
  logCredits();

  useEffect(() => {
    initGA("G-XXXXXXXXXX"); // Dummy measurement ID
    injectSpeedInsights(); // Vercel Speed Insights (Core Web Vitals)
    injectVercelAnalytics(); // Vercel Web Analytics (page views)
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <AnalyticsTracker />
        <HelmetMeta />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/learn" exact component={Learn} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
