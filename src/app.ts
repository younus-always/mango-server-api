import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors';
import { router } from "./app/routes";

const app: Application = express();

app.use(cors());
app.use(express.json())

app.use("/api", router);



app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
            success: true,
            status: 200,
            message: "Welcome to Mango Server API"
      })
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({
            message: err?.message || "Internal Server Error",
            err
      })
});

export default app;