import PropTypes from "./prop-types";
import useStyles from "./styles";

/** A basic box. The backbone of the appearance of the site. */
function Box({ error, text, children }) {
  const classes = useStyles(error);
  return (
    <div className={error ? classes.errorBox : classes.box}>
      {error || text}
      {children}
    </div>
  );
}

Box.propTypes = {
  error: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.children,
};

Box.defaultProps = {
  error: undefined,
  text: undefined,
  children: undefined,
};

export default Box;
