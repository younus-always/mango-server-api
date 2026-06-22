import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { router } from "./app/routes";

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


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const statusCode = err.statusCode ? err.statusCode : 500;

      res.status(statusCode).json({
            success: false,
            statusCode,
            message: err?.message || "Internal Server Error",
            errorDetails: err
      });
});

export default app;