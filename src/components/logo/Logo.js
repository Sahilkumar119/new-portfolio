import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  image: {
    width: "100%",
    height: "100%",
    display: "block",
    borderRadius: "12%",
    transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    "&:hover": {
      transform: "scale(1.08)",
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
