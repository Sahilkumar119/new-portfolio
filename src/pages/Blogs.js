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
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: `1px solid ${theme.palette.divider}`,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  blogDate: {
    display: "inline-block",
    fontSize: "0.875rem",
    marginBottom: theme.spacing(2),
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
  },
  readMore: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    "&:after": {
      content: '"→"',
      marginLeft: theme.spacing(1),
      transition: "margin-left 0.3s ease",
    },
    "&:hover:after": {
      marginLeft: theme.spacing(2),
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
              <CardActionArea href={blog.link}>
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
                    variant="outlined"
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
                        color="primary"
                        variant="outlined"
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
