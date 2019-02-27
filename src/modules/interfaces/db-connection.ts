import * as Sequelize from "sequelize";

import { IModel } from "./models";

export interface IDbConnection extends IModel {

    sequelize: Sequelize.Sequelize;

}
