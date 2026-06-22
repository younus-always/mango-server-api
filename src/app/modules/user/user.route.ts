import { Router } from "express";
import { userController } from "./user.controller";

export const userRoute = Router();

userRoute.post("/", userController.createUser);
userRoute.get("/:userId", userController.getUserById);
userRoute.delete("/:userId", userController.deleteUser);
userRoute.get("/", userController.getAllUser);
