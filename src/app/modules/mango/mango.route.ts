import { Router } from "express";
import { mangoController } from "./mango.controller";

export const mangoRoute = Router();

mangoRoute.post("/", mangoController.createMango);
mangoRoute.get("/:mangoId", mangoController.getMangoById);
mangoRoute.delete("/:mangoId", mangoController.deleteMango);
mangoRoute.get("/", mangoController.getAllMango);