import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/userContext";
import { Button, TextInput, Page } from "../components";

/** This page allows the user to create a room. */

function Create() {
  const { userId } = useUser();
  const [capacity, setCapacity] = useState("");
  const history = useHistory();

  const createRoom = useCallback(() => {
    if (userId) {
      const cap = capacity || "-1";
      fetch(
        `/room/new?${new URLSearchParams({
          userId,
          capacity: cap,
        })}`
      )
        .then((res) => res.json())
        .then((room) => history.push(`/room/${room.name}`));
    }
  }, [userId, history, capacity]);

  return (
    <Page>
      <TextInput
        value={capacity}
        placeholder="Enter a room capacity (empty for infinite)"
        onKeyUp={(e) => e.key === "Enter" && createRoom()}
        onInput={(e) => setCapacity(e.target.value.toUpperCase())}
      />
      <Button title="Create Lobby" onClick={createRoom} />
    </Page>
  );
}

export default Create;
