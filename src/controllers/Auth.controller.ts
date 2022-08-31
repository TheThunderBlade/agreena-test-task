import AuthService from '../services/Auth.service';
import express, {NextFunction} from "express";
import {RequestInterface} from "../interfaces/Request/Request.interface";

class AuthController {
    registration = async (req: RequestInterface, res: express.Response, next: NextFunction) => {
        try {
            const { Email, Password, UserName } = req.body;
            await AuthService.registration({ Email, Password, UserName });
            return res.status(200).json({ message: 'User was successfully created' });
        } catch (e) {
            next(e);
        }
    }

    login = async (req: RequestInterface, res: express.Response, next: NextFunction) => {
        try {
            const { UserName, Password } = req.body;
            const userData = await AuthService.login({ UserName, Password });

            res.cookie('RefreshToken', userData.RefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.status(200).json({
                Token: userData.AccessToken,
                UserId: userData.user.UserId,
                UserName: userData.user.UserName
            });
        } catch (e) {
            next(e);
        }
    }

    refresh = async (req: RequestInterface, res: express.Response, next: NextFunction) => {
        try {
            const { RefreshToken } = req.cookies;

            const userData = await AuthService.refresh({ RefreshToken });
            res.cookie('RefreshToken', userData.RefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.status(200).json({
                Token: userData.AccessToken,
                UserId: userData.user.UserId,
                UserName: userData.user.UserName
            });
        } catch (e) {
            next(e);
        }
    }

    logout = async (req: RequestInterface, res: express.Response, next: NextFunction) => {
        try {
            const { RefreshToken } = req.cookies;

            await AuthService.logout({ RefreshToken });
            res.clearCookie('RefreshToken');

            return res.status(200).json({ message: 'User was successfully log out' });
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();