import { Request, Response } from "express";

import { App } from "../../app/App";

export default class WellcomeController {

    constructor(app: App) {
        app.registerRoute({ path: "/", method: "get", handler: this.wellcome, isPublicRoute: true  });
    }

    public wellcome(req: Request, res: Response): void {
        res.status(200).send("Wellcome to the express seed");
    }

}
