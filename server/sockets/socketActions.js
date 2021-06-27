const WebSocket = require("ws");
const Rooms = require("../engine/rooms");
const { spec, classes } = require("../api");
const { logger } = require("../logger");

/**  Effectively the standard library. */
function broadcast(wss, message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function users(wss, message, { roomName }) {
  logger.debug("Groadcasting user's message");
  broadcast(wss, { type: "users", payload: Rooms.getUsers(roomName) });
}

function game(wss, message, { roomName }) {
  logger.debug("Broadcasting game message");
  broadcast(wss, { type: "game", payload: Rooms.getGameState(roomName) });
}

// The two functions must belong to an object to index into them with a string.
const Actions = {
  users,
  game,
};

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

module.exports = socketActions;
