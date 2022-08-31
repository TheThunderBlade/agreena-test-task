import jwt from "jsonwebtoken";
import db from "../models";
import ApiError from "./Error.service";
import {RefreshTokenInterface} from "../interfaces/Token/RefreshToken.interface";
import {SaveTokenInterface} from "../interfaces/Token/SaveToken.interface";
import {IGenerateTokens} from "../interfaces/Token/UserSessionInterfaces";
import {UserSessionAttributes} from "../models/userSession";
import {UserAttributes} from "../models/user";

class UserSessionService {
    generateTokens = (payload: object): IGenerateTokens => {
        const AccessToken = jwt.sign(payload, <string>process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const RefreshToken = jwt.sign(payload, <string>process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            AccessToken,
            RefreshToken
        };
    };

    saveToken = async (tokenInfo: SaveTokenInterface): Promise<UserSessionAttributes> => {
        try {
            const tokenData = await db.UserSession.findOne({ where: { UserId: tokenInfo.UserId } });
            if (tokenData) {
                return tokenData.update({
                    RefreshToken: tokenInfo.RefreshToken,
                });
            }

            return db.UserSession.create({
                UserId: tokenInfo.UserId,
                RefreshToken: tokenInfo.RefreshToken,
            });
        } catch (e: TypeError | any) {
            throw ApiError.internal(e.message);
        }
    };

    validateRefreshToken = (tokenData: RefreshTokenInterface): UserAttributes => {
        try {
            return jwt.verify(tokenData.RefreshToken, <string>process.env.JWT_REFRESH_SECRET) as UserAttributes;
        } catch (e: TypeError | any) {
            throw ApiError.internal(e.message);
        }
    };

    removeToken = async (tokenData: RefreshTokenInterface): Promise<void> => {
        try {
            await db.UserSession.destroy({ where: { RefreshToken: tokenData.RefreshToken } });
        } catch (e: TypeError | any) {
            throw ApiError.internal(e.message);
        }
    };
}

export default new UserSessionService();