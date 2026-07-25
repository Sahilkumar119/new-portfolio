import React, { useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject as injectVercelAnalytics } from "@vercel/analytics";

import { Home } from "../pages/Home";
import BlogPost from "../pages/BlogPost";
import PageNotFound from "../pages/PageNotFound";
import Learn from "../pages/Learn";
import Blogs from "../pages/Blogs";
import Projects from "../pages/Projects";

export const App = () => {
  logCredits();

  // GA4 was wired to a placeholder measurement ID, so it only ever shipped
  // gtag.js and posted to a dead property. Vercel Analytics already covers
  // page views, so the whole GA path is gone.
  useEffect(() => {
    injectSpeedInsights(); // Vercel Speed Insights (Core Web Vitals)
    injectVercelAnalytics(); // Vercel Web Analytics (page views)
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <HelmetMeta />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/learn" exact component={Learn} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/blog" exact component={Blogs} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
