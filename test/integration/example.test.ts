import { config, db, expect, request, server } from "../helpers";

import * as jwt from "jwt-simple";

describe("Group of API or Application - e.g.: example", () => {

    const defaultUser = {
        email: "default.integration.user@email.com",
        password: "defaultPassword",
    };

    const defaultExamples = [
        { text: "example 1" },
        { text: "example 2" },
    ];

    let token: string;

    before(() => {
        const initializations = [
            new Promise((resolve) => {
                db.User.create(defaultUser)
                    .then((user) => {
                        token = jwt.encode({ id: user.id }, config.security.jwt.secret);
                        resolve();
                    });
            }),
            new Promise((resolve) => {
                db.Example.bulkCreate(defaultExamples)
                        .then(resolve);
            }),
        ];

        return Promise.all(initializations);
    });

    after(() => {
        db.User.truncate({ restartIdentity: true } as any);
        db.Example.truncate({ restartIdentity: true } as any);
    });

    describe("Spefific API - example", () => {

        it("get all recorded examples", (done) => {
            request(server)
                .get("/example")
                .set("Authorization", `Bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.be.equals(200);
                    expect(res.body).to.be.an("array").with.length(2);
                    expect(res.body[0].text).to.be.equals(defaultExamples[0].text);
                    expect(res.body[1].text).to.be.equals(defaultExamples[1].text);
                    done(error);
                });
        });

        it("get single recorded example", (done) => {
            request(server)
                .get("/example/1")
                .set("Authorization", `Bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.be.equals(200);
                    expect(res.body.text).to.be.equals(defaultExamples[0].text);
                    done(error);
                });
        });

        it("Create new example", (done) => {
            const newExample = { text: "new example" };
            request(server)
                .post("/example/")
                .set("Authorization", `Bearer ${token}`)
                .send(newExample)
                .end((error, res) => {
                    expect(res.status).to.be.equals(200);
                    expect(res.body.id).to.be.an("number");
                    expect(res.body.text).to.be.equals(newExample.text);
                    done(error);
                });
        });

    });

});
