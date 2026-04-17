import React, { lazy, Suspense, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";
import { initGA, AnalyticsTracker } from "../utils/Analytics";

import { Home } from "../pages/Home";

const BlogPost = lazy(() => import("../pages/BlogPost"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

export const App = () => {
  logCredits();

  useEffect(() => {
    initGA("G-XXXXXXXXXX"); // Dummy measurement ID
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <AnalyticsTracker />
        <HelmetMeta />
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};
