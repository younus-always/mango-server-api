import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userCreateZodSchema } from "./user.validate";

export const userRoute = Router();

userRoute.post("/",
      validateRequest(userCreateZodSchema),
      userController.createUser
);
userRoute.get("/:userId", userController.getUserById);
userRoute.delete("/:userId", userController.deleteUser);
userRoute.get("/", userController.getAllUser);
