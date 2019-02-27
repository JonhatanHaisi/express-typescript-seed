import * as glob from "glob";
import * as Sequelize from "sequelize";

import { config } from "../../config";
import { IDbConnection } from "../../modules/interfaces/db-connection";

const db: IDbConnection = {} as any;
const bdConfig = config.database;

let sequelize;
if (bdConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[bdConfig.use_env_variable], bdConfig);
} else {
  sequelize = new Sequelize(bdConfig.database, bdConfig.username, bdConfig.password, bdConfig);
}

function fixFileName(fileName: string) {
  return fileName.replace("infra/database/../../", "");
}

const files: string[] = glob.sync(__dirname + "/../../modules/**/*.model.js");

files.forEach((file) => {
    const fixedFile = fixFileName(file);
    const model = sequelize.import(fixedFile);
    db[model.name] = model;
});

Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
      db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
