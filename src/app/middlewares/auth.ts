import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

export const auth = (role: string[]) => async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) throw new AppError(404, "Authorization Header Not Found");

      const decodedToken = jwt.verify(token, config.jwt_secret_token) as JwtPayload;

      const isUserExist = await User.findOne({ email: decodedToken.email });
      if (!isUserExist) throw new AppError(404, "User Not Found");

      if (!role.includes(decodedToken.role)) throw new AppError(401, "Unauthorized Access");

      next();
};