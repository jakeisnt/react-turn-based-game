import { useEffect } from "react";
import { useParams } from "react-router-dom";
import WSConnectionStatus from "../../components/WSConnectionStatus";
import Room from "./Room";
import { SocketProvider } from "../../context/socketContext";

/** Wraps a room to ensure the user is warned before the page is left. */
function RoomContainer() {
  const { name: roomName } = useParams();

  /* When the page loads, add a message warning when unloading.
   * When it unloads, remove the warning. */
  useEffect(() => {
    window.onbeforeunload = () =>
      "Are you sure that you want to leave the room?";
    return () => (window.beforeunload = undefined);
  }, []);

  return (
    <SocketProvider roomName={roomName}>
      <Room />
      <WSConnectionStatus />
    </SocketProvider>
  );
}

export default RoomContainer;
