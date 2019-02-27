import { NextFunction, Request, Response } from "express";

export interface IRoute {

    path: string;
    method: string;
    handler: (req: Request, res: Response, next: NextFunction) => void;
    isPublicRoute?: boolean;
}
