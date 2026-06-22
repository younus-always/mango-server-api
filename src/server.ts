import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

const port = 4000;
let server: Server;

const startServer = async () => {
      try {
            mongoose.connect(config.database_url);
            console.log("Mongoose connected");

            server = app.listen(port, () => {
                  console.log(`Server Running on Port ${port}`);
            })
      } catch (error) {
            console.log(`Server ${error}`);
      }
};
startServer();