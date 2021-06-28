import express from "express";
import Rooms from "../engine/rooms";

const router = express.Router();

/** Provide functions to create and access information about rooms. */

/* GET new room. */
router.get("/new", (req, res) => {
  const capacity = parseInt(req.query.capacity || "-1", 10);
  res.json(Rooms.createRoom(req.query.userId, capacity || -1));
});

/* GET existing room. */
router.get("/get", (req, res) => {
  const room = Rooms.getRoom(req.query.name);
  if (room) return res.json(room);
  return res.status(404).send(`Room ${req.query.name} not found`);
});

export default router;
