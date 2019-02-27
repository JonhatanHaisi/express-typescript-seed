import * as http from "http";

import { app } from "./app";
import { config } from "./config";
import { logger } from "./infra/logger";

import db from "./infra/database";

const server = http.createServer(app.getApp());

db.sequelize.sync().then(() => {
    server.listen(config.server.port, config.server.host);
    server.on("listening", () => logger.info(`Server running: http://${config.server.host}:${config.server.port}`));
    server.on("error", (error: NodeJS.ErrnoException) => logger.error(`Error: ${error}`));
});
