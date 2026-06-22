import { Request, Response } from "express";
import { mangoService } from "./mango.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const createMango = catchAsync(async (req: Request, res: Response) => {
      const data = await mangoService.createMango(req.body);

      sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Mango Created Successfully",
            data
      });
});

const getAllMango = catchAsync(async (req: Request, res: Response) => {
      const data = await mangoService.getAllMango();

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "All Mango Retrieved Successfully",
            data
      });
});

const getMangoById = catchAsync(async (req: Request, res: Response) => {
      const { mangoId } = req.params;
      const data = await mangoService.getMangoById(mangoId as string);

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Single Mango Retrieved Successfully",
            data
      });
});

const deleteMango = catchAsync(async (req: Request, res: Response) => {
      const { mangoId } = req.params;
      const data = await mangoService.deleteMango(mangoId as string);

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Mango Deleted Successfully",
            data
      });
});


export const mangoController = {
      createMango,
      getAllMango,
      getMangoById,
      deleteMango
};