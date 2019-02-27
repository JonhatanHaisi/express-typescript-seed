import * as winston from "winston";

import { config } from "../../config";

export const logger = winston.createLogger({
    format: winston.format.json(),
    level: "debug",
    transports: [
      new winston.transports.Console({ format: winston.format.simple(), level: config.logging.console.level }),
      new winston.transports.File({ filename: "logs/application.log", level: config.logging.file.level }),
    ],
});
