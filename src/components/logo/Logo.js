import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  image: {
    width: "100%",
    height: "100%",
    display: "block",
    borderRadius: "50%",
    transition: "transform 0.5s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

export const Logo = () => {
  const classes = useStyles();

  return (
    <img
      src={`${process.env.PUBLIC_URL}/favicon.svg`}
      alt="Site logo"
      className={classes.image}
      loading="lazy"
    />
  );
};
