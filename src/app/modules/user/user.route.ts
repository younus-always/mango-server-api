import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userCreateZodSchema, userLoginZodSchema } from "./user.validate";
import { auth } from "../../middlewares/auth";
import { UserRole } from "./user.constraint";

export const userRoute = Router();

userRoute.post("/register",
      validateRequest(userCreateZodSchema),
      userController.registerUser
);
userRoute.post("/login",
      validateRequest(userLoginZodSchema),
      userController.loginUser
);
userRoute.post("/refresh-token",
      userController.refreshToken
);
userRoute.get("/:userId",
      auth([UserRole.ADMIN]),
      userController.getUserById
);
userRoute.delete("/:userId",
      auth([UserRole.ADMIN]),
      userController.deleteUser
);
userRoute.get("/",
      auth([UserRole.ADMIN]),
      userController.getAllUser
);
