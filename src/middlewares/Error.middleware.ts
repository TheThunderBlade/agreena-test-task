import ApiError from '../services/Error.service';
import express, {NextFunction} from "express";

export default function (err: ApiError, req: express.Request, res: express.Response, next: NextFunction) {
    try {
        console.log(err);
        if (err instanceof ApiError) {
            return res.status(err.status).json({ status: err.status, message: err.message, isError: err.isError });
        }
        return res.status(500).json({ message: 'Unexpected error' });
    } catch (e) {
        next(e);
    }
};