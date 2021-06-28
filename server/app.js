import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { expressLogger } from "./logger";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import roomRouter from "./routes/room";

const app = express();

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const dirname = path.resolve(path.dirname(""));
app.use(express.static(path.join(dirname, "public")));

// api requests won't work without this
// TODO: remove this for security reasons later
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/room", roomRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
