import { existsSync, mkdirSync } from "node:fs";
import type { Request } from "express";
import { transports as _transports, createLogger, format } from "winston";
import { currentDate, currentDateAndHour } from "./current-date-hour";

const { fecha, hora } = currentDateAndHour(currentDate());

const logDir = "logs";
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const transports = [
  new _transports.Console(),
  new _transports.File({ filename: "./logs/admin.log" }),
];

export const loggerAdmin = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`,
    ),
  ),
  transports,
});

export const loggerInfo = (message: string, req: Request, payload: null | TokenDataModelI) => {
  loggerAdmin.info(
    JSON.stringify({
      fecha,
      hora,
      verb: req.method,
      path: req.baseUrl + req.path,
      message,
      username: payload?.name,
      email: payload?.email,
    }),
  );
};
