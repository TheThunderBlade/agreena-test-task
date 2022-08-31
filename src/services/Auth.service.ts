import ApiError from "./Error.service";
import db from "../models";
import bcrypt from "bcrypt";
import UserSessionSvc from './UserSession.service';
import {RegistrationInterface} from "../interfaces/Auth/Registration.interface";
import {LoginInterface, LoginResponseInterface} from "../interfaces/Auth/Login.interface";
import {RefreshTokenInterface} from "../interfaces/Token/RefreshToken.interface";
import {UserAttributes} from "../models/user";

class AuthService {
    registration = async (userData: RegistrationInterface): Promise<void> => {
        try {
            const checkingForEmail = await db.User.findOne({ where: { Email: userData.Email } });
            if (checkingForEmail) {
                throw ApiError.conflict('User with this email already exists');
            }
            const checkingForUserName = await db.User.findOne({ where: { UserName: userData.UserName } });
            if (checkingForUserName) {
                throw ApiError.conflict('User with this UserName already exists');
            }

            const hashPassword = await bcrypt.hash(userData.Password, 5);

            await db.User.create({ Email: userData.Email, Password: hashPassword, UserName: userData.UserName });
        } catch (e: TypeError | any) {
            throw ApiError.internal(e.message);
        }
    }

    login = async (userData: LoginInterface): Promise<LoginResponseInterface> => {
        try {
            const user = await db.User.findOne({ where: { UserName: userData.UserName } });
            if (!user) {
                throw ApiError.notFound('User with this username not found');
            }
            const password = await bcrypt.compare(userData.Password, user.Password);
            if (!password) {
                throw ApiError.badRequest('Invalid password');
            }

            const tokens = UserSessionSvc.generateTokens({ UserId: user.UserId, Email: user.Email });
            await UserSessionSvc.saveToken({ UserId: user.UserId, RefreshToken: tokens.RefreshToken });

            return {
                ...tokens,
                user,
            };
        } catch (e: TypeError | any) {
            throw ApiError.internal(e.message);
        }
    }

    refresh = async (tokenData: RefreshTokenInterface): Promise<LoginResponseInterface> => {
        try {
            if (!tokenData.RefreshToken) {
                throw ApiError.unauthorized('Invalid refresh token');
            }

            const userData = UserSessionSvc.validateRefreshToken({ RefreshToken: tokenData.RefreshToken });
            const tokenFromDb = await db.UserSession.findOne({ where: { RefreshToken: tokenData.RefreshToken } });

            if (!userData || !tokenFromDb) {
                throw ApiError.unauthorized('Token validation failed');
            }

            const user = await db.User.findOne({ where: { UserId: userData.UserId } });
            const tokens = UserSessionSvc.generateTokens({ UserId: user.UserId, Email: user.Email });
            await UserSessionSvc.saveToken({ UserId: user.UserId, RefreshToken: tokens.RefreshToken });
            return { ...tokens, user };
        } catch (e: TypeError | any) {
            throw ApiError.internal(e.message);
        }
    }


    logout = async (tokenData: RefreshTokenInterface): Promise<void> => {
        try {
            await UserSessionSvc.removeToken({ RefreshToken: tokenData.RefreshToken });
        } catch (e: TypeError | any) {
            throw ApiError.internal(e.message);
        }
    };
}

export default new AuthService();