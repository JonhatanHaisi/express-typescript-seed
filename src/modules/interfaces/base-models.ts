import { IModel } from "./models";

export interface IBaseModelInterface {

    prototype?;

    associate?(models: IModel): void;

}
