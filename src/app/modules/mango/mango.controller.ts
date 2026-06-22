import { Request, Response } from "express";
import { mangoService } from "./mango.service";


const createMango = async (req: Request, res: Response) => {
      try {
            const data = await mangoService.createMango(req.body);

            res.status(201).json({
                  success: true,
                  message: "Mango Created Successfully",
                  data
            })
      } catch (error) {
            console.error(error);
            res.status(500).json({
                  success: false,
                  message: "Error Occurred",
                  error
            });
      }
};

const getAllMango = async (req: Request, res: Response) => {
      try {
            const data = await mangoService.getAllMango();

            res.status(200).json({
                  success: true,
                  message: "All Mango Retrieved Successfully",
                  data
            })
      } catch (error) {
            console.error(error);
            res.status(500).json({
                  success: false,
                  message: "Error Occurred",
                  error
            });
      }
};

const getMangoById = async (req: Request, res: Response) => {
      try {
            const { mangoId } = req.params;
            const data = await mangoService.getMangoById(mangoId as string);

            res.status(200).json({
                  success: true,
                  message: "Single Mango Retrieved Successfully",
                  data
            });
      } catch (error) {
            console.error(error);
            res.status(500).json({
                  success: false,
                  message: "Error Occurred",
                  error
            });
      }
};

const deleteMango = async (req: Request, res: Response) => {
      try {
            const { mangoId } = req.params;
            const data = await mangoService.deleteMango(mangoId as string);

            res.status(200).json({
                  success: true,
                  message: "Mango Deleted Successfully",
                  data
            });
      } catch (error) {
            console.error(error);
            res.status(500).json({
                  success: false,
                  message: "Error Occurred",
                  error
            });
      }
};


export const mangoController = {
      createMango,
      getAllMango,
      getMangoById,
      deleteMango
};