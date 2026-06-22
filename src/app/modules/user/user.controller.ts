import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";


const registerUser = catchAsync(async (req: Request, res: Response) => {
      const data = await userService.registerUser(req.body);

      sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "User Registered Successful",
            data
      });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
      const data = await userService.loginUser(req.body);

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User Logged In Successful",
            data
      });
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
      registerUser,
      loginUser,
      getAllUser,
      getUserById,
      deleteUser
};