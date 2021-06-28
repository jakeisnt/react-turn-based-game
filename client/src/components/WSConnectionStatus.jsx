import { useState, useEffect } from "react";
import { ReadyState } from "react-use-websocket";
import { createUseStyles } from "react-jss";
import RippleLoader from "./RippleLoader";
import { useSocket } from "../context/socketContext";

/** Component that displays a status message if websocket connections aren't working out. */

const Status = {
  ERR: "error",
  WARN: "warn",
  OK: "ok",
};

const connectionStatus = {
  [ReadyState.OPEN]: Status.OK,
  [ReadyState.CONNECTING]: Status.WARN,
  [ReadyState.CLOSING]: Status.WARN,
  [ReadyState.UNINSTANTIATED]: Status.WARN,
  [ReadyState.CLOSED]: Status.ERR,
};

const connStyles = createUseStyles((theme) => ({
  connectionBanner: {},
  wsConnection: {
    display: "flex",
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 999,
  },
  connMessage: ({ status }) => ({
    display: status === Status.ERR ? "block" : "none",
    marginLeft: "3em",
    paddingTop: "1em",
  }),
  connMessageWrapper: {
    flexGrow: 1,
  },
  closeButton: {
    border: "1px solid black",
    padding: "0.5em 1em",
    margin: "0.5em",
    backgroundColor: theme.white,
  },
  loadingSpinner: {
    marginRight: "2em",
    marginBottom: "2em",
    padding: "auto",
  },
}));

function WSConnectionStatus() {
  const { socketState: state } = useSocket();
  const status = connectionStatus[state];
  const classes = connStyles({ status });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === Status.ERR) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [status]);

  return (
    status !== Status.OK && (
      <>
        <div className={classes.wsConnection}>
          <div className={classes.connMessageWrapper}>
            {status === Status.ERR && open && (
              <div className={classes.connMessage}>
                You&apos;ve lost your connection and may have to rejoin.
              </div>
            )}
          </div>
          <div className={classes.loadingSpinner}>
            <RippleLoader />
          </div>
        </div>
      </>
    )
  );
}

export default WSConnectionStatus;
