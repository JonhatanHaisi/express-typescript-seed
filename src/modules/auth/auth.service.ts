import * as jwt from "jwt-simple";
import * as passport from "passport";

import { Response } from "express";
import { UNAUTHORIZED } from "http-status";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { logger } from "../../infra/logger";

import { config } from "../../config";
import db from "../../infra/database";
import { IUser } from "./auth.model";

export class AuthService {

    private readonly secret: string;

    constructor() {
        if (config.security.jwt.env_secret) {
            this.secret = process.env[config.security.jwt.env_secret];
        } else {
            this.secret = config.security.jwt.secret;
        }
    }

    public getAuthorizationValidator(): () => any {
        passport.use(new Strategy(this.getAuthConfig(), (jwtPayload, done) => {
            this.getUserById(jwtPayload.id)
                    .then((user) => {
                        if (user) {
                            return done(null, { id: user.id, email: user.email });
                        }

                        return done(null, false);
                    })
                    .catch((error) => done(error, null));
        }));
        return () => passport.authenticate("jwt", { session: false });
    }

    public checkAuthorization(res: Response, credentials: any, data: any) {
        const passwdMatch = (credentials.password === data.password);
        if (passwdMatch) {
            res.json({
                token: jwt.encode({ id: data.id }, this.secret),
            });
            return;
        }
        res.sendStatus(UNAUTHORIZED);
    }

    public getUserById(id: number) {
        return db.User.findOne({ where: { id }, logging: logger.debug });
    }

    public getUserByEmail(email: string) {
        return db.User.findOne({ where: { email }, logging: logger.debug });
    }

    public createNewUser(user: IUser) {
        return db.User.create(user);
    }

    private getAuthConfig(): StrategyOptions {
        return {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.secret,
        } as StrategyOptions;
    }
}
