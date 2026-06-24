import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { envVars } from "./app/config";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
      try {
            await mongoose.connect(envVars.DB_URL);
            console.log("Mongoose connected");

            server = app.listen(4000, () => {
                  console.log(`Server Running On Port: ${envVars.PORT}`);
            })
      } catch (error) {
            console.log(`Server ${error}`);
      }
};
(async () => {
      await startServer();
      await seedSuperAdmin();
})();


/**
 * unhandledRejection
 * Promise.reject(new Error("I forgot to handle promise error"))
 * 
 * uncaughtException
 * throw new Error("I forgot to handle local error")
 */

process.on("unhandledRejection", () => {
      console.log("Unhandled Rejection Detected. Server shutting down....");

      if (server) {
            server.close(() => {
                  process.exit(1);
            });
      };
      process.exit(1);
});
process.on("uncaughtException", () => {
      console.log("Uncaught Exception Detected. Server shutting down....");

      if (server) {
            server.close(() => {
                  process.exit(1);
            });
      };
      process.exit(1);
});

process.on("SIGTERM", () => {
      console.log("SIGTERM Signal Received. Server shutting down....");

      if (server) {
            server.close(() => {
                  process.exit(1);
            });
      };
      process.exit(1);
});
process.on("SIGINT", () => {
      console.log("SIGINT Signal Received. Server shutting down....");

      if (server) {
            server.close(() => {
                  process.exit(1);
            });
      };
      process.exit(1);
});