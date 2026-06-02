import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";

// The right-hand visual: the active course's logo, tinted to its accent and
// slid in from the side. On desktop it sits fixed on the right; on mobile it
// becomes a faint, oversized backdrop behind the names.
const useStyles = makeStyles((theme) => ({
  stage: {
    position: "fixed",
    top: "50%",
    right: "7vw",
    transform: "translateY(-50%)",
    width: "clamp(150px, 22vw, 320px)",
    height: "clamp(150px, 22vw, 320px)",
    zIndex: 1,
    pointerEvents: "none",
    display: "grid",
    placeItems: "center",
    [theme.breakpoints.down("sm")]: {
      // Backdrop behind the scrolling names on small screens.
      right: "auto",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "62vw",
      height: "62vw",
      opacity: 0.12,
      zIndex: 0,
    },
  },
  glow: {
    position: "absolute",
    inset: "-18%",
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: 0.22,
    transition: "background-color 600ms cubic-bezier(.16,1,.3,1)",
  },
  logo: {
    width: "100%",
    height: "100%",
    // Recolour the monochrome SVG to the course accent via mask.
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    WebkitMaskSize: "contain",
  },
}), { name: "CourseVisual" });

export const CourseVisual = ({ course }) => {
  const classes = useStyles();
  const reduce = useReducedMotion();

  return (
    <div className={classes.stage} aria-hidden="true">
      <div className={classes.glow} style={{ backgroundColor: course.accent }} />
      <AnimatePresence mode="wait">
        <motion.div
          key={course.slug}
          className={classes.logo}
          style={{
            backgroundColor: course.accent,
            maskImage: `url(${course.logo})`,
            WebkitMaskImage: `url(${course.logo})`,
          }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 70 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
    </div>
  );
};

export default CourseVisual;
