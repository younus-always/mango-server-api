import { Router } from "express";
import { mangoController } from "./mango.controller";
import { queryBuilder } from "../../middlewares/queryBuilder";
import { Mango } from "./mango.model";

export const mangoRoute = Router();

mangoRoute.post("/", mangoController.createMango);
mangoRoute.get("/:mangoId", mangoController.getMangoById);
mangoRoute.delete("/:mangoId", mangoController.deleteMango);
mangoRoute.get("/",
      queryBuilder(Mango, ["name", "origin", "season"]),
      mangoController.getAllMango
);