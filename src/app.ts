import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { router } from "./app/routes";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { TErrorSources } from "./app/interfaces/error";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors());

app.use("/api", router);



app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
            success: true,
            status: 200,
            message: "Welcome to Mango Server API"
      });
});


app.use(globalErrorHandler);

export default app;