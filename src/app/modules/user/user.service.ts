import config from "../../config";
import AppError from "../../error/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import * as bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


const registerUser = async (payload: IUser) => {
      const existingUser = await User.findOne({
            email: payload.email,
      });
      if (existingUser) throw new AppError(409, "Email already exists");

      payload.password = await bcrypt.hash(payload.password, config.bcrypt_salt);
      const data = await User.create(payload);
      return data;
};

const loginUser = async (payload: IUser) => {
      const isUserExist = await User.findOne({ email: payload.email });
      if (!isUserExist) throw new AppError(404, "User Not Found");

      const checkPassword = await bcrypt.compare(payload.password, isUserExist.password);
      if (!checkPassword) throw new AppError(409, "Invalid Credentials");

      const jwtPayload = {
            email: isUserExist.email,
            role: isUserExist.role
      };

      const accessToken = jwt.sign(jwtPayload, config.jwt_secret_token, { expiresIn: config.jwt_expiresIn } as SignOptions);
      const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_token, { expiresIn: "30d" } as SignOptions);

      return { accessToken, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
      const verifyRefreshToken = jwt.verify(refreshToken, config.jwt_refresh_token) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifyRefreshToken.email });
      if (!isUserExist) throw new AppError(404, "User Not Found");

      const jwtPayload = {
            email: isUserExist.email,
            role: isUserExist.role
      };
      const accessToken = jwt.sign(jwtPayload, config.jwt_secret_token, { expiresIn: config.jwt_expiresIn } as SignOptions);

      return { accessToken };
};

const getAllUser = async () => {
      const data = await User.find();
      return data;
};

const getUserById = async (userId: string) => {
      const data = await User.findById(userId);
      return data;
};

const deleteUser = async (userId: string) => {
      const data = await User.findByIdAndDelete(userId);
      return data;
};


export const userService = {
      registerUser,
      loginUser,
      refreshToken,
      getAllUser,
      getUserById,
      deleteUser
};