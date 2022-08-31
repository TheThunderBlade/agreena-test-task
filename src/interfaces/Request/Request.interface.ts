import { Request } from "express";
import { UserAttributes } from '../../models/user';

export interface RequestInterface extends Request{
    user: UserAttributes;
}
