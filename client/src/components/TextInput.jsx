import PropTypes from "./prop-types";
import useStyles from "./styles";

/** A controlled Text Input component. */
function TextInput({ value, placeholder, onKeyUp, onInput }) {
  const classes = useStyles();
  return (
    <input
      type="text"
      className={classes.box}
      value={value}
      placeholder={placeholder}
      onKeyUp={onKeyUp}
      onInput={onInput}
    />
  );
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onKeyUp: PropTypes.func,
  onInput: PropTypes.func,
};

TextInput.defaultProps = {
  onKeyUp: null,
  onInput: null,
};

export default TextInput;
