import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes";
import errorMiddleware from "./middlewares/Error.middleware";

export default function createServer() {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    app.use(cors({
        credentials: true,
        origin: process.env.CLIENT_URL
    }));

    app.use('/api', router);

    app.use(errorMiddleware);

    return app;
}