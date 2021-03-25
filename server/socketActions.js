/* A simple API for adding new websocket actions.
 *
 * Assuming that the websocket message is a JSON object that has field `type`,
 * the websocket looks up the type field in the keys of this dictionary
 * and sends the return value of the function provided to the key
 * to every client connected to the socket.
 *
 * If you know that a message will have a specific field,
 * feel free to use that field on the right hand side of the object.
 * */
const rooms = require("./engine/rooms");

const socketActions = {
  "new-user": (message, room) => rooms.addUserToRoom(message.username, room),
};