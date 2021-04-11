import { useEffect, useState, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "../styles";
import BackButton from "../../components/BackButton";
import { useSocket } from "../../context/socketContext";
import { useUser } from "../../context/userContext";
import UserList from "./UserList";

function Room() {
  const { error, lastMessage, roomName, sendMessage } = useSocket("users");
  const { user: me } = useUser();
  const classes = useStyles();
  const [room, setRoom] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`/room/get?${new URLSearchParams({ name: roomName })}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(`Room ${roomName} does not exist.`);
      })
      .then((res) => setRoom(res))
      .catch((err) => history.push(`/home/${err.message}`));
  }, [roomName, setRoom, history]);

  useEffect(() => {
    if (
      lastMessage &&
      lastMessage.banned &&
      lastMessage.banned.map(({ id }) => id).includes(me.id) // better than object comparison
    )
      history.push(
        // eslint-disable-next-line prefer-template
        "/home/" +
          encodeURIComponent(`You have been banned from room ${roomName}.`)
      );
  }, [lastMessage, roomName, history, me]);

  useEffect(() => {
    console.log(JSON.stringify(lastMessage));
  }, [lastMessage]);

  // This might be better served in some sort of global state solution (a provider?),
  // but to avoid redundant computation it's best to handle here for now.
  const userIsMod = useMemo(
    () =>
      me &&
      me.id &&
      lastMessage &&
      lastMessage.players &&
      lastMessage.players[0] &&
      lastMessage.players[0].id === me.id,
    [me, lastMessage]
  );

  const userIsNotSpectator = useMemo(
    () =>
      me &&
      me.id &&
      lastMessage &&
      lastMessage.players &&
      (() => {
        const meHopefully = lastMessage.players.filter(
          ({ id }) => id === me.id
        );
        return meHopefully && meHopefully[0] && !meHopefully.spectate;
      })(),
    [me, lastMessage]
  );

  const sendSpectateMessage = useCallback(
    () =>
      sendMessage &&
      sendMessage({
        type: userIsNotSpectator ? "spectate" : "unspectate",
      }),
    [sendMessage, userIsNotSpectator]
  );

  return (
    <>
      <div className={classes.room}>
        <BackButton text="Exit" />
        <div className={classes.box}>
          {error || `This is room ${roomName}.`}
        </div>
        {!error && lastMessage && (
          <>
            <UserList
              users={lastMessage.players}
              title="Players"
              capacity={room && room.capacity}
              userIsMod={userIsMod}
              myId={me.id}
            />
            <UserList
              users={lastMessage.spectators}
              title="Spectators"
              userIsMod={userIsMod}
              myId={me.id}
            />
            <UserList
              users={lastMessage.inactives}
              title="Inactive Users"
              userIsMod={userIsMod}
              myId={me.id}
            />
            <button
              type="button"
              className={classes.box}
              onClick={sendSpectateMessage}
            >
              {userIsNotSpectator ? "Spectate" : "Unspectate"}
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Room;
