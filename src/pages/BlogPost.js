import React from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  Hidden,
  Divider,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { LogoLink } from "../components/logo/LogoLink";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { FooterText } from "../components/footer/FooterText";
import { SocialIcons } from "../components/content/SocialIcons";
import { NavigationButtons } from "../components/navigation/NavigationButtons";
import DisplacementSphere from "../components/background/DisplacementSphere";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../components/content/TextDecrypt";
import { blogPosts } from "../data/blogPosts";

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
  article: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  header: {
    marginBottom: theme.spacing(4),
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    lineHeight: 1.3,
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    flexWrap: "wrap",
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
  backButton: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    transition: "all 0.3s ease",
    "&:hover": {
      textDecoration: "underline",
      transform: "translateX(-5px)",
    },
    "&:before": {
      content: '"← "',
      marginRight: theme.spacing(1),
    },
  },
  contentText: {
    lineHeight: 1.8,
    fontSize: "1.1rem",
    marginTop: theme.spacing(4),
    "& p": {
      marginBottom: theme.spacing(3),
    },
    "& h2": {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(2),
      fontWeight: 600,
      fontSize: "2rem",
    },
    "& h3": {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    "& code": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      padding: "3px 8px",
      borderRadius: "4px",
      fontFamily: "'Courier New', monospace",
      fontSize: "0.9em",
      color: theme.palette.primary.light,
    },
    "& pre": {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      padding: theme.spacing(3),
      borderRadius: theme.spacing(1),
      overflow: "auto",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      border: `1px solid ${theme.palette.divider}`,
      "& code": {
        backgroundColor: "transparent",
        padding: 0,
        color: theme.palette.text.primary,
      },
    },
    "& ul": {
      marginBottom: theme.spacing(3),
      paddingLeft: theme.spacing(4),
      "& li": {
        marginBottom: theme.spacing(1),
        lineHeight: 1.8,
      },
    },
    "& ol": {
      marginBottom: theme.spacing(3),
      paddingLeft: theme.spacing(4),
      "& li": {
        marginBottom: theme.spacing(1),
        lineHeight: 1.8,
      },
    },
    "& blockquote": {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      paddingLeft: theme.spacing(3),
      marginLeft: 0,
      marginRight: 0,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      fontStyle: "italic",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      padding: theme.spacing(2, 3),
      borderRadius: theme.spacing(1),
      "& p": {
        marginBottom: 0,
      },
    },
    "& strong": {
      fontWeight: 700,
      color: theme.palette.primary.light,
    },
  },
  notFound: {
    textAlign: "center",
    padding: theme.spacing(8, 2),
    color: theme.palette.text.secondary,
  },
}));

export const BlogPost = () => {
  const classes = useStyles();
  const { slug } = useParams();
  const history = useHistory();
  const post = blogPosts[slug];

  const handleBack = () => {
    history.push("/blogs");
  };

  if (!post) {
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
            <Typography className={classes.backButton} onClick={handleBack}>
              Back to Blogs
            </Typography>
            <Box className={classes.notFound}>
              <Typography variant="h4" gutterBottom>
                Blog Post Not Found
              </Typography>
              <Typography variant="body1">
                The blog post you're looking for doesn't exist.
              </Typography>
            </Box>
          </Container>

          <FooterText />
        </div>
      </>
    );
  }

  // Parse and render content
  const renderContent = () => {
    const sections = post.content.split("\n\n");
    return sections.map((section, index) => {
      // Skip empty sections
      if (!section.trim()) return null;

      // Handle iframes (YouTube embeds, etc.)
      if (section.trim().startsWith("<iframe")) {
        return (
          <Box
            key={index}
            sx={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              marginY: 3,
              borderRadius: 2,
              "& iframe": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              },
            }}
            dangerouslySetInnerHTML={{ __html: section }}
          />
        );
      }

      // Handle code blocks
      if (section.trim().startsWith("```")) {
        const lines = section.trim().split("\n");
        const language = lines[0].replace("```", "");
        const code = lines.slice(1, -1).join("\n");
        return (
          <pre key={index}>
            <code>{code}</code>
          </pre>
        );
      }

      // Handle H2 headings
      if (section.startsWith("## ")) {
        return (
          <Typography key={index} variant="h4" component="h2">
            {section.replace("## ", "")}
          </Typography>
        );
      }

      // Handle H3 headings
      if (section.startsWith("### ")) {
        return (
          <Typography key={index} variant="h5" component="h3">
            {section.replace("### ", "")}
          </Typography>
        );
      }

      // Handle blockquotes
      if (section.startsWith("> ")) {
        const text = section.replace(/^> /gm, "");
        return (
          <blockquote key={index}>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: formatInlineText(text) }}
            />
          </blockquote>
        );
      }

      // Handle unordered lists
      if (section.includes("\n- ") || section.startsWith("- ")) {
        const items = section
          .split("\n")
          .filter((line) => line.trim().startsWith("- "));
        return (
          <ul key={index}>
            {items.map((item, i) => (
              <li
                key={i}
                dangerouslySetInnerHTML={{
                  __html: formatInlineText(item.replace(/^- /, "")),
                }}
              />
            ))}
          </ul>
        );
      }

      // Handle ordered lists
      if (/^\d+\. /.test(section)) {
        const items = section
          .split("\n")
          .filter((line) => /^\d+\. /.test(line.trim()));
        return (
          <ol key={index}>
            {items.map((item, i) => (
              <li
                key={i}
                dangerouslySetInnerHTML={{
                  __html: formatInlineText(item.replace(/^\d+\. /, "")),
                }}
              />
            ))}
          </ol>
        );
      }

      // Handle regular paragraphs
      return (
        <Typography
          key={index}
          variant="body1"
          paragraph
          dangerouslySetInnerHTML={{ __html: formatInlineText(section) }}
        />
      );
    });
  };

  // Format inline text (bold, inline code)
  const formatInlineText = (text) => {
    // Handle inline code
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    // Handle bold
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return text;
  };

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
          <Typography className={classes.backButton} onClick={handleBack}>
            Back to Blogs
          </Typography>

          <Box className={classes.article}>
            <Box className={classes.header}>
              <Typography variant="h3" component="h1" className={classes.title}>
                <TextDecrypt text={post.title} />
              </Typography>

              <Box className={classes.meta}>
                <Chip
                  label={post.date}
                  size="small"
                  className={classes.chip}
                  variant="outlined"
                />
                <Chip
                  label={post.readTime}
                  size="small"
                  className={classes.chip}
                  variant="outlined"
                />
                <Typography variant="body2" color="textSecondary">
                  By {post.author}
                </Typography>
              </Box>

              <Box className={classes.tagContainer}>
                {post.tags.map((tag, index) => (
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
            </Box>

            <Divider />

            <Box className={classes.contentText}>{renderContent()}</Box>
          </Box>
        </Container>

        <FooterText />
      </div>
    </>
  );
};

export default BlogPost;
