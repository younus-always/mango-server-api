import { Server } from "http";
import app from "./app";

const port = 4000;
let server: Server;

const startServer = async () => {
      try {

            server = app.listen(port, () => {
                  console.log(`Server Running on Port ${port}`);
            })
      } catch (error) {
            console.log(`Server ${error}`);
      }
};
startServer();