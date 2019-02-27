import { CorsOptions } from "cors";
import { Application } from "express";
import { NO_CONTENT } from "http-status";

import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";

import { config } from "../config";
import { Stream } from "../infra/logger/log.stream";
import { AuthService } from "../modules/auth/auth.service";
import { IRoute } from "../modules/route/route";

export class App {

    private readonly express: Application = express();

    private readonly checkAuthorization: () => any;

    constructor() {
        this.checkAuthorization = new AuthService().getAuthorizationValidator();

        this.setupMiddleware();
    }

    public getApp(): Application {
        return this.express;
    }

    public registerRoute(route: IRoute): void {
        if (route.isPublicRoute) {
            this.express.route(route.path)[route.method](route.handler);
            return;
        }
        this.express.route(route.path).all(this.checkAuthorization())[route.method](route.handler);
    }

    public registerMiddleware(middleware: any): void {
        this.express.use(middleware);
    }

    private getCorsOptions(): CorsOptions {
        return {
            origin: config.cors.origin,
            methods: [ "GET", "POST", "PUT", "DELETE" ],
            allowedHeaders: ["Content-Type", "Authorization", "Accept-Encoding"],
            preflightContinue: false,
            optionsSuccessStatus: NO_CONTENT,
        };
    }

    private setupMiddleware() {
        this.express.use(cors(this.getCorsOptions()));
        this.express.use(morgan("dev", { stream: new Stream("info") }));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(compression());
        this.express.use(helmet());
    }

}
