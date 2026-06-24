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