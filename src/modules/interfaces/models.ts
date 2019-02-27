import { IUserModel } from "../auth/auth.model";
import { IExampleModel } from "../example/example.model";

export interface IModel {

    Example: IExampleModel;
    User: IUserModel;
}
