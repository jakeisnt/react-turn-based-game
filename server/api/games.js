import Rooms from "../engine/rooms";
import { logger } from "../logger";

/** presents all of the actions that can be taken during a game.
* include a static method here that accepts a name, playerid and an optional payload (js object)
* to make it available for the client to call and send a message with. */
class Game {
  static startGame(name, modId) {
    return Rooms.getRoom(name)?.startGame(modId);
  }

  static stopGame(name, modId) {
    return Rooms.getRoom(name)?.getGame(modId)?.stop(modId);
  }

  static takeAction(name, playerId, { type, ...payload }) {
    logger.info(
      `${name}: ${playerId}: takeAction ${type} ${JSON.stringify(
        payload,
        null,
        2
      )}`
    );
    return Rooms.getRoom(name)?.getGame()?.takeAction(playerId, type, payload);
  }

  static passTurn(name, playerId) {
    return Rooms.getRoom(name)?.getGame()?.passTurn(playerId);
  }

  static getGameState(name) {
    return Rooms.getRoom(name)?.getGameState();
  }
}

export default Game;
