import * as sequelize from "sequelize";

/**
 * This is a data type. Here we should define all data fields.
 * Creating this interface we will have all power of typescript types on hands
 */
export interface IExample {
    id?: number;
    text: string;
}

// next two interfaces are sequelize requirements...
export interface IExampleInstance extends sequelize.Instance<IExample>, IExample {}
export interface IExampleModel extends sequelize.Model<IExampleInstance, IExample> {}

// here we will define the table to be created and used by sequelize
export default (seq: sequelize.Sequelize, Types: sequelize.DataTypes): IExampleModel => {
    return seq.define("Example", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Types.INTEGER,
        },
        text: {
            allowNull: false,
            type: Types.STRING,
            validate: {
                notEmpty: true,
            },
        },
    }) as IExampleModel;
};
