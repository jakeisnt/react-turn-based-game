import PropTypes from "prop-types";
import { useMemo } from "react";
import { useSocket, useGameActions } from "../../context/socketContext";
import { useUser } from "../../context/userContext";
import { Button, Box, Subtitle, Text } from "../../components";

/** This component and its descendants contain all of the logic for playing a game. */

/** Determines whether the list of players contains a player with the provided userId. */
function hasPlayer(userId, players) {
  const meHopefully = players.filter(({ id }) => id === userId);
  return meHopefully && meHopefully[0] && !meHopefully.spectate;
}

function Game({ userIsMod }) {
  const { lastMessage } = useSocket("game");
  const { passTurn, stopGame, startGame, takeAction } = useGameActions();
  const { user: me } = useUser();

  const gameStarted = lastMessage;

  const userIsPlayer = useMemo(
    () =>
      me &&
      me.id &&
      lastMessage &&
      lastMessage.players &&
      hasPlayer(me.id, lastMessage.players),
    [me, lastMessage]
  );

  const isUserTurn =
    me &&
    me.id &&
    lastMessage &&
    lastMessage.curPlayer &&
    lastMessage.curPlayer === me.id;

  if (!gameStarted && userIsMod)
    return <Button title="Start Game" onClick={startGame} />;

  if (!gameStarted)
    return <Subtitle>Waiting for the game to start...</Subtitle>;

  return (
    <Box>
      <div>Game State: {lastMessage.game}</div>
      {!lastMessage.isOver && userIsPlayer && isUserTurn && (
        <>
          <Button title="-1" onClick={() => takeAction("-1")} />
          <Button title="+1" onClick={() => takeAction("+1")} />
          <Button title="Pass Turn" onClick={passTurn} />
        </>
      )}
      {!lastMessage.isOver && userIsMod && (
        <Button title="End Game" onClick={stopGame} />
      )}
      {lastMessage.isOver && lastMessage.winners && (
        <Box>
          <Subtitle>Winners</Subtitle>
          {lastMessage.winners.map(({ name, id }) => (
            <Text key={`winner-${id}`}>{name}</Text>
          ))}
        </Box>
      )}
      {lastMessage.isOver && userIsMod && (
        <Button title="Start Game" onClick={startGame} />
      )}
    </Box>
  );
}

Game.propTypes = {
  userIsMod: PropTypes.bool.isRequired,
};

export default Game;
