import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";
import { TextDecrypt } from "../content/TextDecrypt";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) => ({
  footerText: {
    position: "absolute",
    bottom: theme.spacing(6),
    left: theme.spacing(6),
    "&:hover": {
      color: theme.palette.primary.main,
    },
    transition: "all 0.5s ease",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
  icon: {
    fontSize: "1.2rem",
  },
}));

export const FooterText = () => {
  const classes = useStyles();

  return (
    <Link
      color="inherit"
      underline="none"
      href="/resume.pdf"
      download="Sahil_Kumar_Resume.pdf"
      className={classes.footerText}
    >
      <GetAppIcon className={classes.icon} />
      <Typography variant="body1">
        <TextDecrypt text={"Resume"} />
      </Typography>
    </Link>
  );
};
