import { createUseStyles } from "react-jss";

export default createUseStyles((theme) => ({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changeUserBox: {
    display: "flex",
    flexDirection: "row",
    margin: "auto",
  },
  smallBox: {
    border: `2px solid ${theme.black}`,
    padding: "0.5em 0.5em",
    textAlign: "center",
    color: theme.black,
    backgroundColor: theme.white,
  },
  banButton: {
    border: `2px solid ${theme.red}`,
    padding: "auto",
    color: theme.black,
    backgroundColor: theme.white,
  },
  userSaveButton: {
    border: `2px solid ${theme.black}`,
    padding: "auto",
    color: theme.black,
    backgroundColor: theme.white,
    marginLeft: "0.5em",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
  },
  addButton: {
    border: `2px solid ${theme.green}`,
    padding: "auto",
    backgroundColor: theme.white,
  },
}));
