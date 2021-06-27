/* All of the machinery required to work our websockets. */

const WebSocket = require("ws");
const url = require("url");
const querystring = require("querystring");
const socketActions = require("./socketActions");
const Rooms = require("../engine/rooms");
const { logger } = require("../logger");

const socketServers = {};

function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const PING_INTERVAL = 10000;

const MAX_INACTIVE_PINGS = 2;

// Given a room name, make a socket for the room and add listeners.
function makeRoomSocket(name) {
  logger.info(`Opening WebSocket server for room ${name}.`);

  const wss = new WebSocket.Server({ noServer: true });
  wss.on("connection", (ws, request) => {
    const { userId } = querystring.parse(url.parse(request.url).query);

    socketActions.connect(wss, null, { roomName: name, userId });

    /* eslint-disable no-param-reassign */
    ws.userId = userId;
    ws.isAlive = true;
    ws.on("pong", () => {
      logger.debug(`User with id ${userId} ponged room ${name}.`);
      ws.isAlive = true;
    });

    ws.on("close", () => {
      logger.info(`User with id ${userId} left room ${name}.`);
      socketActions.disconnect(wss, null, { roomName: name, userId });
    });

    ws.on("message", (msg) => {
      if (isJSON(msg)) {
        const message = JSON.parse(msg);
        const args = { roomName: name, userId };
        if (message.type && message.type in socketActions) {
          logger.debug(
            `Sending socket message associated with type "${message.type}"`
          );
          socketActions[message.type](wss, message, args);
        } else {
          logger.error(`"${message.type}" is not a valid socket message type.`);
        }
      } else {
        logger.error(`${msg} is not valid JSON.`);
      }
    });
  });

  let inactivePings = 0;

  wss.interval = setInterval(() => {
    logger.debug(`Pinging clients of room ${name}...`);
    let hasActive = false;
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        logger.info(`User with id ${ws.userId} dropped from room ${name}.`);
        return ws.terminate();
      }
      hasActive = true;
      ws.isAlive = false;
      return ws.ping(() => {});
    });
    if (hasActive) {
      inactivePings = 0;
    } else {
      logger.info(`Room ${name} has no active users.`);
      inactivePings += 1;
    }
    if (inactivePings >= MAX_INACTIVE_PINGS) {
      logger.info(`Room ${name} has had no active users for too long.`);
      wss.close();
    }
  }, PING_INTERVAL);

  wss.on("close", () => {
    logger.info(`Closing WebSocket server and deleting room ${name}.`);
    wss.clients.forEach((ws) => ws.terminate());
    Rooms.deleteRoom(name);
    delete socketServers[name];
    return clearInterval(wss.interval);
  });

  return wss;
}

// Called when an HTTP request is elevated to a WebSocket connection.
function onUpgrade(request, socket, head) {
  const { room } = querystring.parse(url.parse(request.url).query);

  if (!Rooms.getRoom(room)) {
    socket.on("error", (err) => logger.error(JSON.stringify(err)));
    socket.destroy({ error: `Room ${room} not found` });
    return;
  }

  if (!socketServers[room]) {
    socketServers[room] = makeRoomSocket(room);
    logger.info(`Created socket for room ${room}`);
  } else {
    logger.info(`Using socket for room ${room}`);
  }

  const currentSocket = socketServers[room];

  currentSocket.handleUpgrade(request, socket, head, (ws) => {
    currentSocket.emit("connection", ws, request);
  });
}

module.exports = onUpgrade;
