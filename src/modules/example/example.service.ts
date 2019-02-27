import * as Bluebird from "bluebird";

import db from "../../infra/database";
import { logger } from "../../infra/logger";
import { IExample } from "./example.model";

export class ExampleService {

    public save(example: IExample): Bluebird<IExample> {
        return db.Example.create(example, { logging: logger.debug })
                         .catch((err) => { throw new Error(err); });
    }

    public getById(id: number): Bluebird<IExample> {
        return db.Example.findOne({ where: { id }, logging: logger.debug });
    }

    public getAll(): Bluebird<IExample[]> {
        return db.Example.findAll({ order: ["id"], logging: logger.debug });
    }
}
