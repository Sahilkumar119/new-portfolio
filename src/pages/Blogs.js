import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Hidden,
} from "@material-ui/core";
import { LogoLink } from "../components/logo/LogoLink";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { FooterText } from "../components/footer/FooterText";
import { SocialIcons } from "../components/content/SocialIcons";
import { NavigationButtons } from "../components/navigation/NavigationButtons";
import DisplacementSphere from "../components/background/DisplacementSphere";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../components/content/TextDecrypt";
import { blogs } from "../data/blogs";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  content: {
    marginTop: "auto",
    marginBottom: "auto",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    zIndex: 1,
  },
  header: {
    marginBottom: theme.spacing(6),
    textAlign: "center",
  },
  headerTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  blogCard: {
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(10px)",
    border: `1px solid rgba(255, 255, 255, 0.08)`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: "rgba(255, 255, 255, 0.06)",
      border: `1px solid rgba(255, 255, 255, 0.15)`,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transition: "color 0.2s ease",
    ".MuiCardActionArea-root:hover &": {
      color: theme.palette.primary.light,
    },
  },
  blogDate: {
    display: "inline-block",
    fontSize: "0.875rem",
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    border: "none",
    backgroundColor: "transparent",
  },
  blogExcerpt: {
    lineHeight: 1.7,
    marginBottom: theme.spacing(2),
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  chip: {
    fontSize: "0.75rem",
    height: "24px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    color: theme.palette.text.secondary,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      border: `1px solid rgba(255, 255, 255, 0.2)`,
    },
  },
  readMore: {
    color: theme.palette.primary.light,
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    transition: "color 0.2s ease",
    "&:after": {
      content: '"→"',
      marginLeft: theme.spacing(1),
      transition: "margin-left 0.2s ease",
    },
    "&:hover:after": {
      marginLeft: theme.spacing(1.5),
    },
  },
}));

export const Blogs = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <DisplacementSphere />
        <LogoLink />
        <ThemeToggle />
        <Hidden smDown>
          <SocialIcons />
          <NavigationButtons />
        </Hidden>

        <Container className={classes.content} maxWidth="md">
          <Box className={classes.header}>
            <Typography
              variant="h2"
              component="h1"
              className={classes.headerTitle}
            >
              <TextDecrypt text="Blog & Insights" />
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Thoughts, tutorials, and explorations in my learning journey
            </Typography>
          </Box>

          {blogs.map((blog) => (
            <Card key={blog.id} className={classes.blogCard}>
              <CardActionArea href={`/blog/${blog.slug}`}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.blogTitle}
                  >
                    {blog.title}
                  </Typography>
                  <Chip
                    label={blog.date}
                    size="small"
                    className={classes.blogDate}
                  />
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    className={classes.blogExcerpt}
                  >
                    {blog.excerpt}
                  </Typography>
                  <Box className={classes.tagContainer}>
                    {blog.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        className={classes.chip}
                      />
                    ))}
                  </Box>
                  <Typography className={classes.readMore}>
                    Read More
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Container>

        <FooterText />
      </div>
    </>
  );
};

export default Blogs;
