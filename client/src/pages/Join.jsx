import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Page, TextInput } from "../components";

/** This is the Join page - used when a player wants to join an existing room. */
function Join() {
  const [name, setName] = useState("");
  const history = useHistory();

  return (
    <Page>
      <TextInput
        value={name}
        placeholder="Enter a room ID"
        onKeyUp={(e) => e.key === "Enter" && history.push(`/room/${name}`)}
        onInput={(e) => setName(e.target.value.toUpperCase())}
      />
      <Button
        title="Join Lobby"
        onClick={() => history.push(`/room/${name}`)}
      />
    </Page>
  );
}

export default Join;
