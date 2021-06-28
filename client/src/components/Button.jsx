import PropTypes from "prop-types";
import useStyles from "./styles";

/** A basic button component. */
function Button({ onClick, title }) {
  const classes = useStyles();

  return (
    <button
      tabIndex={0}
      type="button"
      className={classes.box}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
