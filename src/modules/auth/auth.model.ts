import * as sequelize from "sequelize";

export interface IUser {
    id?: number;
    email: string;
    password: string;
}

// next two interfaces as sequelize requirements
export interface IUserInstance extends sequelize.Instance<IUser>, IUser {}
export interface IUserModel extends sequelize.Model<IUserInstance, IUser> {}

export default (seq: sequelize.Sequelize, Types: sequelize.DataTypes): IUserModel => {
    return seq.define("User", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Types.INTEGER,
        },
        email: {
            allowNull: false,
            type: Types.STRING,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        password: {
            allowNull: false,
            type: Types.STRING,
            validate: {
                notEmpty: true,
            },
        },
    }) as IUserModel;
};
