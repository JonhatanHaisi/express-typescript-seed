import { config, db, expect, request, server } from "../helpers";

import * as jwt from "jwt-simple";

describe("Group of API or Application - e.g.: authentication api", () => {

    const defaultUser = {
        email: "default.integration.user@email.com",
        password: "defaultPassword",
    };

    let token: string;

    before(() => {
        return new Promise((resolve) => {
            db.User.create(defaultUser)
                .then((user) => {
                    token = jwt.encode({ id: user.id }, config.security.jwt.secret);
                    resolve();
            });
        });
    });

    after(() => {
        db.User.truncate({ restartIdentity: true } as any);
    });

    describe("Spefific API - user", () => {

        it("Create a new user", (done) => {
            const newUser = { email: "integration.test@email.com", password: "passwd123" };
            request(server)
                .post("/user")
                .send(newUser)
                .end((error, res) => {
                    expect(res.status).to.be.equals(200);
                    expect(res.body.id).to.be.an("number");
                    expect(res.body.id).to.be.greaterThan(0);
                    expect(res.body.email).to.be.equal(newUser.email);
                    expect(res.body.password).to.be.equal(newUser.password);
                    done(error);
                });
        });

    });

    describe("Spefific API - token", () => {

        it("Generate a token", (done) => {
            request(server)
                .post("/token")
                .send(defaultUser)
                .end((error, res) => {
                    expect(res.status).to.be.equals(200);
                    expect(res.body.token).to.be.an("string");
                    expect(res.body.token).to.be.equals(token);
                    done(error);
                });
        });

    });

});
