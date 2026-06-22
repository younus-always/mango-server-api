import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";


const createUser = catchAsync(async (req: Request, res: Response) => {
      const data = await userService.createUser(req.body);

      sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "User Created Successfully",
            data
      })
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
      const data = await userService.getAllUser();

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "All User Retrieved Successfully",
            data
      })
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const data = await userService.getUserById(userId as string);

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Single User Retrieved Successfully",
            data
      })
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const data = await userService.deleteUser(userId as string);

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User Deleted Successfully",
            data
      })
});


export const userController = {
      createUser,
      getAllUser,
      getUserById,
      deleteUser
};