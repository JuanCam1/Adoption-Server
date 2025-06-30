import { existsSync, mkdirSync } from "node:fs";
import { transports as _transports, createLogger, format } from "winston";

const logDir = "logs";
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}
const tsFormat = () => new Date().toLocaleString();

const transports = [
  new (_transports.Console)({
    timestamp: tsFormat,
    colorize: true
  }),
  new (_transports.File)({
    filename: './logs/admin.log'
  })
]

export const loggerAdmin = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} : ${info.message}`),
  ),
  transports: transports,
});
