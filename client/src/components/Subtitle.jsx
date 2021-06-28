import PropTypes from "./prop-types";

/** A Subtitle component. Use this instead of a <p/> or <h4/>
  * as it's much easier to style the website from a single source of truth.
*/
function Subtitle({ children }) {
  return <p>{children}</p>;
}

Subtitle.propTypes = {
  children: PropTypes.children.isRequired,
};

export default Subtitle;
