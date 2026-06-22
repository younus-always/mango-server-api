import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";


const changePassword = catchAsync(async (req: Request, res: Response) => {
      const { email, oldPassword, newPassword } = req.body;
      const data = await authService.changePassword(email, oldPassword, newPassword);

      sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Password Changed Successfully",
            data
      });
});


export const authController = {
      changePassword,
};