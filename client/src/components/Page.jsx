import PropTypes from "./prop-types";
import BackButton from "./BackButton";
import useStyles from "./styles";

/** A Page component used to declare different pages of the website. */
function Page({ backButtonName, children }) {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <BackButton text={backButtonName} />
      {children}
    </div>
  );
}

Page.propTypes = {
  backButtonName: PropTypes.string,
  children: PropTypes.children.isRequired,
};

Page.defaultProps = {
  backButtonName: undefined,
};

export default Page;
