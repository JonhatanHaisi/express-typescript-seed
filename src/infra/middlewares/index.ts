import { Errback, NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "http-status";

import { logger } from "../logger";

export function errorHandler(err: Errback, req: Request, res: Response, next: NextFunction) {
    logger.error(err);
    res.status(INTERNAL_SERVER_ERROR).json({
        description: "Unexpected error from server",
        type: "Internal server error",
    });
}
