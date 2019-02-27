import { IUser } from "./auth.model";

export function buildCredentials({ email, password }): { email: string, password: string } {
    return { email, password };
}

export function createUserWithPassword({ id, email, password }: IUser): IUser {
    return { id, email, password };
}
