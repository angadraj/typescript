import { createLogger, transports, format } from "winston";
import dotenv from 'dotenv';
dotenv.config()

const logger = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(({ timestamp, level, message, metadata }) => {
            return `[${timestamp}] ${level}: ${message}`;
          })
        ),
      }),
      new transports.File({
        dirname: "logs",
        filename: "winston_example.log",
        format: format.combine(format.json()),
      }),
    ],
    format: format.combine(format.metadata(), format.timestamp()),
});


export default logger;