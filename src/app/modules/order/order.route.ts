import { Router } from "express";
import { orderController } from "./order.controller";


export const orderRoute = Router();

orderRoute.post("/:id", orderController.createOrder);
orderRoute.get("/", orderController.getAllOrder);