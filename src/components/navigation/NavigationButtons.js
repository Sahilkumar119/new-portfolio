import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Tooltip, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navContainer: {
    position: "absolute",
    // Position below social icons: top spacing (6) + (4 icons * 2.5rem) + (4 * spacing(2) for margins)
    top: `calc(${theme.spacing(6)}px + 10rem + ${theme.spacing(8)}px)`,
    right: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    zIndex: 10,
  },
  navButton: {
    backgroundColor: "transparent",
    color: "inherit",
    border: `2px solid ${
      theme.palette.foreground?.default || theme.palette.text.primary
    }`,
    borderRadius: "25px",
    minWidth: "auto",
    fontSize: "1rem",
    fontWeight: 600,
    letterSpacing: "2px",
    textTransform: "none",
    writingMode: "vertical-rl",
    padding: theme.spacing(1.5, 1),
    marginBottom: theme.spacing(2),
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      transform: "translateX(-5px)",
      boxShadow:
        "0 10px 15px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  },
}));

export const NavigationButtons = () => {
  const classes = useStyles();

  return (
    <Box className={classes.navContainer}>
      <Tooltip title="Projects" placement="left" TransitionComponent={Zoom}>
        <Button
          component={Link}
          to="/projects"
          className={classes.navButton}
          aria-label="Navigate to Projects"
        >
          Projects
        </Button>
      </Tooltip>
      <Tooltip title="Blogs" placement="left" TransitionComponent={Zoom}>
        <Button
          component={Link}
          to="/blogs"
          className={classes.navButton}
          aria-label="Navigate to Blogs"
        >
          Blogs
        </Button>
      </Tooltip>
    </Box>
  );
};

export default NavigationButtons;
