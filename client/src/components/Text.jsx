import PropTypes from "./prop-types";

/** A Text component. Use this instead of a <p/>
  * as it's much easier to style the website from a single source of truth.
*/
function Text({ children }) {
  return <p>{children}</p>;
}

Text.propTypes = {
  children: PropTypes.children.isRequired,
};

export default Text;
