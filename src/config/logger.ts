import * as winston from "winston";
import { format, transports } from "winston";
const { combine, timestamp, json, errors } = format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    errors({ stack: true }),
    json(),
  ),
  transports: [
    new transports.Console({
      silent: process.env.NODE_ENV === "test", // Disable in test environment
    }),
  ],
});

export default logger;
