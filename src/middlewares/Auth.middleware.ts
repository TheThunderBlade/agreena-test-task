import jwt from 'jsonwebtoken';
import db from "../models";
import { JwtPayload } from '../interfaces/Token/JwtPayload.interface';
import express, {NextFunction} from "express";
import {RequestInterface} from "../interfaces/Request/Request.interface";

export default async function (req: RequestInterface, res: express.Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers['x-access-token'] || req.headers.Authorization || req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided!' });
        }

        const decoded = jwt.verify(<string>token, <string>process.env.JWT_ACCESS_SECRET) as JwtPayload;
        const user = await db.User.findOne({ where: { UserId: decoded.UserId } });
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Invalid token' });
    }
};