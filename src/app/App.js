import React, { lazy, Suspense } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";

import { Home } from "../pages/Home";

const Resume = lazy(() => import("../pages/Resume"));
const Projects = lazy(() => import("../pages/Projects"));
const Blogs = lazy(() => import("../pages/Blogs"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

export const App = () => {
  logCredits();

  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <HelmetMeta />
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/resume" component={Resume} />
            <Route path="/projects" component={Projects} />
            <Route path="/blogs" exact component={Blogs} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};
