import { Router } from "express";
import { mangoRoute } from "../modules/mango/mango.route";
import { userRoute } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";


export const router = Router()

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/mango", mangoRoute);
// router.use("/order", orderRoute);