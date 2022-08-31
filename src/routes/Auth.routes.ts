import {Application, Router} from "express";
import AuthController from "../controllers/Auth.controller";

const authRoutes: Router = Router();

authRoutes.post('/signUp', <Application>AuthController.registration);
authRoutes.post('/signIn', <Application>AuthController.login);
authRoutes.get('/refresh', <Application>AuthController.refresh);
authRoutes.get('/logout', <Application>AuthController.logout)

export default authRoutes;