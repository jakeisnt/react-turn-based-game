import express from "express";

const router = express.Router();

/** Provides routes to access the home page of the application.
* As the routing to different pages is primarily handled by the client side, there isn't much here.
**/

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

export default router;
