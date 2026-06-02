import React, { useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

// The giant stacked list of course names (bpowell-style).
//
// Active item is driven by TWO inputs ("both" mode):
//   1. Scroll position — the name nearest the viewport centre wins. This is the
//      source of truth and is the only path on touch devices.
//   2. Hover — on pointer/hover-capable devices, hovering a name activates it.
//      On mouse-leave we recompute from scroll so it never sticks.
const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    margin: 0,
    // Top/bottom spacers so the first and last names can reach the centre.
    padding: "44vh 0",
    display: "flex",
    flexDirection: "column",
    gap: "min(6vh, 3.5rem)",
    // Keep text clear of the fixed logo on the right (desktop only).
    paddingRight: "34vw",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      gap: "min(8vh, 3rem)",
    },
  },
  item: {
    margin: 0,
    lineHeight: 0.95,
  },
  link: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: "0.18em",
    fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontWeight: 800,
    fontSize: "clamp(2.4rem, 10vw, 6.5rem)",
    letterSpacing: "-0.035em",
    textDecoration: "none",
    color: "inherit",
    opacity: 0.32,
    transform: "translateX(0)",
    transition:
      "opacity 360ms cubic-bezier(.16,1,.3,1), color 360ms cubic-bezier(.16,1,.3,1), transform 360ms cubic-bezier(.16,1,.3,1)",
    cursor: "default",
    "@media (prefers-reduced-motion: reduce)": {
      transition: "opacity 120ms linear",
    },
  },
  linkLive: {
    cursor: "pointer",
  },
  active: {
    opacity: 1,
  },
  arrow: {
    fontWeight: 700,
    transition: "max-width 360ms cubic-bezier(.16,1,.3,1), opacity 240ms",
    maxWidth: 0,
    opacity: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  arrowVisible: {
    maxWidth: "1.4em",
    opacity: 1,
  },
  soon: {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: "0.8rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    verticalAlign: "super",
    marginLeft: "0.5em",
    padding: "3px 9px",
    borderRadius: "999px",
    border: "1px solid currentColor",
    opacity: 0.6,
    alignSelf: "center",
  },
}));

export const CourseList = ({ courses, activeIndex, setActiveIndex }) => {
  const classes = useStyles();
  const itemRefs = useRef([]);
  const hoverCapable = useRef(false);

  // Pick the name whose vertical centre is closest to the viewport centre.
  const computeFromScroll = useCallback(() => {
    const mid = window.innerHeight / 2;
    let best = 0;
    let bestDist = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centre = rect.top + rect.height / 2;
      const dist = Math.abs(centre - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveIndex(best);
  }, [setActiveIndex]);

  useEffect(() => {
    hoverCapable.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    let raf = null;
    const onScroll = () => {
      if (raf === null) {
        raf = requestAnimationFrame(() => {
          raf = null;
          computeFromScroll();
        });
      }
    };

    computeFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [computeFromScroll]);

  return (
    <nav aria-label="Courses">
      <ul
        className={classes.list}
        onMouseLeave={() => {
          if (hoverCapable.current) computeFromScroll();
        }}
      >
        {courses.map((course, i) => {
          const isActive = i === activeIndex;
          const isLive = course.status === "live";

          const inner = (
            <>
              <span
                className={`${classes.arrow} ${isActive ? classes.arrowVisible : ""}`}
                style={isActive ? { color: course.accent } : undefined}
                aria-hidden="true"
              >
                →
              </span>
              {course.name}
              {!isLive && <span className={classes.soon}>Soon</span>}
            </>
          );

          const className = `${classes.link} ${isLive ? classes.linkLive : ""} ${
            isActive ? classes.active : ""
          }`;
          const onMouseEnter = () => {
            if (hoverCapable.current) setActiveIndex(i);
          };

          return (
            <li
              key={course.slug}
              className={classes.item}
              ref={(el) => (itemRefs.current[i] = el)}
            >
              {isLive ? (
                <a
                  href={course.href}
                  className={className}
                  aria-current={isActive ? "true" : undefined}
                  onMouseEnter={onMouseEnter}
                >
                  {inner}
                </a>
              ) : (
                <span
                  className={className}
                  aria-current={isActive ? "true" : undefined}
                  aria-disabled="true"
                  onMouseEnter={onMouseEnter}
                >
                  {inner}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CourseList;
