import {UserAttributes} from "../../models/user";

export interface LoginInterface {
    Password: string,
    UserName: string,
}

export interface LoginResponseInterface {
    user: UserAttributes,
    RefreshToken: string,
    AccessToken: string,
}