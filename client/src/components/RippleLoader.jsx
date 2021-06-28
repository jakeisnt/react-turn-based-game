import { createUseStyles } from "react-jss";

/** A fancy animated ripple loader. */

const useStyles = createUseStyles((theme) => ({
  ripple: {
    display: "inline-block",
    position: "relative",
    height: "4em",
    width: "4em",
    "& div": {
      position: "absolute",
      border: `4px solid ${theme.black}`,
      opacity: 1,
      borderRadius: "50%",
      animation: "$ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite",
    },
    "& div:nth-child(2)": {
      animationDelay: "-0.5s",
    },
  },
  "@keyframes ripple": {
    from: {
      top: "36px",
      left: "36px",
      width: 0,
      height: 0,
      opacity: 1,
    },
    to: {
      top: 0,
      left: 0,
      width: "72px",
      height: "72px",
      opacity: 0,
    },
  },
}));

function RippleLoader() {
  const classes = useStyles();

  return (
    <div className={classes.ripple}>
      <div />
      <div />
    </div>
  );
}

export default RippleLoader;
