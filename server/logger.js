import winston from "winston";
import expressWinston from "express-winston";

const loggerSettings = {
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  defaultMeta: { service: "user-service" },
  transports:
    process.env.NODE_ENV === "production"
      ? [
          // in prod, use logfiles
          // - Write all logs with level `error` and below to `error.log`
          new winston.transports.File({
            filename: "error.log",
            level: "error",
          }),
          // - Write all logs with level `info` and below to `combined.log`
          new winston.transports.File({ filename: "combined.log" }),
        ]
      : [
          // otherwise log to the console for ease of visibility
          new winston.transports.Console({ format: winston.format.simple() }),
        ],
};

const logger = winston.createLogger(loggerSettings);
const expressLogger = expressWinston.logger({
  ...loggerSettings,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
});

export { logger, expressLogger };
