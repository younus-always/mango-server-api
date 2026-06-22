import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userCreateZodSchema, userLoginZodSchema } from "./user.validate";

export const userRoute = Router();

userRoute.post("/register",
      validateRequest(userCreateZodSchema),
      userController.registerUser
);
userRoute.post("/login",
      validateRequest(userLoginZodSchema),
      userController.loginUser
);
userRoute.get("/:userId", userController.getUserById);
userRoute.delete("/:userId", userController.deleteUser);
userRoute.get("/", userController.getAllUser);
