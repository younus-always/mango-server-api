import { Router } from "express";
import { mangoRoute } from "../modules/mango/mango.route";


export const router = Router()

// router.use("/user", userRoute);
router.use("/mango", mangoRoute);
// router.use("/order", orderRoute);