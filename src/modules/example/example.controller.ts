import { Request, Response } from "express";
import { OK } from "http-status";

import { App } from "../../app/App";
import { ExampleService } from "./example.service";

export class ExampleController {

    private readonly service = new ExampleService();

    constructor(app: App) {
        // tslint:disable
        app.registerRoute({ path: "/example/:id", method: "get", handler: (req, res) => this.getById(req, res) });
        app.registerRoute({ path: "/example", method: "post", handler: (req, res) => this.createExample(req, res) });
        app.registerRoute({ path: "/example", method: "get", handler: (req, res) => this.getAll(req, res) });
        // tslint:enable
    }

    public createExample(req: Request, res: Response): void {
        const example = req.body;
        this.service.save(example)
                    .then((data) => res.status(OK).json(data));
    }

    public getById(req: Request, res: Response): void {
        this.service.getById(req.params.id)
                .then((data) => res.status(OK).json(data));
    }

    public getAll(req: Request, res: Response): void {
        this.service.getAll()
                .then((data) => res.status(OK).json(data));
    }

}
