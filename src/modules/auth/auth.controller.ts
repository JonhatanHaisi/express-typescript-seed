import { Request, Response } from "express";
import { OK, UNAUTHORIZED } from "http-status";

import { App } from "../../app/App";
import { IUser } from "./auth.model";
import { AuthService } from "./auth.service";

export class Auth {

    private authService = new AuthService();

    constructor(app: App) {
        // tslint:disable
        app.registerRoute({ path: "/token", method: "post", handler: (req, res) => this.getToken(req, res), isPublicRoute: true });
        app.registerRoute({ path: "/user", method: "post", handler: (req, res) => this.createUser(req, res), isPublicRoute: true });
        // tslint:enable
    }

    private getToken(req: Request, res: Response) {
        const credentials = req.body as IUser;
        this.authService.getUserByEmail(credentials.email)
                            .then((data) => { this.authService.checkAuthorization(res, credentials, data); })
                           .catch(() => res.sendStatus(UNAUTHORIZED));
    }

    private createUser(req: Request, res: Response) {
        this.authService.createNewUser(req.body)
                            .then((data) => res.status(OK).json(data));
    }

}
