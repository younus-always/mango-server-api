import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import { User } from "../modules/user/user.model";
import { envVars } from "../config";
import { verifyToken } from "../utils/jwt";

export const auth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) throw new AppError(404, "Authorization Header Not Found");

      const decodedToken = verifyToken(token, envVars.JWT.ACCESS_SECRET_TOKEN);

      const isUserExist = await User.findOne({ email: decodedToken.email });
      if (!isUserExist) throw new AppError(404, "User Not Found");

      if (!authRoles.includes(decodedToken.role)) throw new AppError(401, "Unauthorized Access");

      req.user = isUserExist;
      next();
};