import express, { Application, Request, Response } from "express";
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(express.json())


app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
            success: true,
            status: 200,
            message: "Welcome to Mango Server API"
      })
});

export default app;