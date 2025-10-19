import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
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
import { topProjects, stepProjects } from "../data/projects";

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
  section: {
    marginBottom: theme.spacing(8),
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 700,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: `1px solid ${theme.palette.divider}`,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  cardActions: {
    padding: theme.spacing(2, 3),
    justifyContent: "space-between",
  },
  projectTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  description: {
    marginBottom: theme.spacing(2),
    lineHeight: 1.7,
  },
  techStack: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  chip: {
    fontSize: "0.75rem",
    height: "24px",
  },
  header: {
    marginBottom: theme.spacing(6),
    textAlign: "center",
  },
  headerTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
}));

const ProjectCard = ({ project, classes }) => (
  <Card className={classes.card}>
    <CardContent className={classes.cardContent}>
      <Typography variant="h5" component="h2" className={classes.projectTitle}>
        {project.title}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.description}
      >
        {project.description}
      </Typography>
      <Box className={classes.techStack}>
        {project.technologies.map((tech, index) => (
          <Chip
            key={index}
            label={tech}
            size="small"
            className={classes.chip}
            variant="outlined"
            color="primary"
          />
        ))}
      </Box>
    </CardContent>
    <CardActions className={classes.cardActions}>
      <Button
        size="small"
        color="primary"
        href={project.link}
        variant="outlined"
      >
        View Live
      </Button>
      <Button size="small" color="primary" href={project.github} variant="text">
        GitHub →
      </Button>
    </CardActions>
  </Card>
);

export const Projects = () => {
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

        <Container className={classes.content} maxWidth="lg">
          <Box className={classes.header}>
            <Typography
              variant="h2"
              component="h1"
              className={classes.headerTitle}
            >
              <TextDecrypt text="My Projects" />
            </Typography>
            <Typography variant="h6" color="textSecondary">
              A journey through code, creativity, and continuous learning
            </Typography>
          </Box>

          {/* Top Projects Section */}
          <Box className={classes.section}>
            <Typography
              variant="h3"
              component="h2"
              className={classes.sectionTitle}
            >
              <TextDecrypt text="Top Projects" />
            </Typography>
            <Grid container spacing={4}>
              {topProjects.map((project) => (
                <Grid item key={project.id} xs={12} sm={6} md={4}>
                  <ProjectCard project={project} classes={classes} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Step Projects Section */}
          <Box className={classes.section}>
            <Typography
              variant="h3"
              component="h2"
              className={classes.sectionTitle}
            >
              <TextDecrypt text="Step Projects" />
            </Typography>
            <Grid container spacing={4}>
              {stepProjects.map((project) => (
                <Grid item key={project.id} xs={12} sm={6} md={4}>
                  <ProjectCard project={project} classes={classes} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        <FooterText />
      </div>
    </>
  );
};

export default Projects;
