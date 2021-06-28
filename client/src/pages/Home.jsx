import { useHistory, useParams } from "react-router-dom";
import useStyles from "./styles";

import { Button } from "../components";

/** This is the homepage of the application - providing links to available user actions. */
function Home() {
  const history = useHistory();
  const { error } = useParams();
  const classes = useStyles();

  return (
    <div className={classes.home}>
      {error && (
        <div className={classes.errorBox}>{decodeURIComponent(error)}</div>
      )}
      <h1 className={classes.title}>Fun Game</h1>
      <img alt="add logo here" className={classes.fakePic} />
      <Button title="Create Room" onClick={() => history.push("/create")} />
      <Button title="Join Room" onClick={() => history.push("/join")} />
      <Button title="Profile" onClick={() => history.push("/profile")} />
      <Button title="About" onClick={() => history.push("/about")} />
    </div>
  );
}

export default Home;
