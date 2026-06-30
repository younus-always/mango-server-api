import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../user/user.constraint";

export const authRoute = Router();

authRoute.post("/change-password",
      auth(...Object.values(UserRole)),
      authController.changePassword
);
authRoute.post("/reset-password",
      authController.resetPassword
);
authRoute.post("/logout",
      authController.logout
);