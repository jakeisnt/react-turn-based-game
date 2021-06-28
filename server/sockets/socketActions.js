import WebSocket from "ws";
import Rooms from "../engine/rooms";
import { spec, classes } from "../api";
import { logger } from "../logger";

/**  Broadcasts a JS Object message to each client of the websocket. */
function broadcast(wss, message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

/** Broadcast a 'users' message to the websocket. */
function users(wss, message, { roomName }) {
  logger.debug("Groadcasting user's message");
  broadcast(wss, { type: "users", payload: Rooms.getUsers(roomName) });
}

/** Broadcast a 'game' message - typically a game action - to the socket. */
function game(wss, message, { roomName }) {
  logger.debug("Broadcasting game message");
  broadcast(wss, { type: "game", payload: Rooms.getGameState(roomName) });
}

// The two functions must belong to an object to index into them with a string.
const Actions = {
  users,
  game,
};

/** Generate various websocket endpoints from API utilities. */

// name of function/endpoint: names of arguments expected in socket payload
function generateEndpoints(config) {
  return Object.keys(config).reduce((allfuncs, type) => {
    const newFuncs = Object.keys(config[type]).reduce((funcs, funcName) => {
      return {
        ...funcs,
        [funcName]: (wss, message, { roomName, userId }) => {
          logger.info(`${roomName}: ${userId}: ${funcName}`);
          classes[type][funcName](
            roomName,
            userId,
            (message && message.payload) || undefined
          );

          // call the corresponding broadcasting function
          return Actions[type](wss, message, { roomName });
        },
      };
    }, {});
    return { ...allfuncs, ...newFuncs };
  }, {});
}
const socketActions = generateEndpoints(spec);

export default socketActions;
