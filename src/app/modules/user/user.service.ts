import { envVars } from "../../config";
import AppError from "../../error/AppError";
import { generateToken, verifyToken } from "../../utils/jwt";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import * as bcrypt from "bcrypt";


const registerUser = async (payload: IUser) => {
      // const existingUser = await User.findOne({ email: payload.email, });
      // if (existingUser) throw new AppError(409, "Email already exists");

      payload.password = await bcrypt.hash(payload.password, envVars.BCRYPT_SALT);
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

      const accessToken = generateToken(jwtPayload, envVars.JWT.ACCESS_SECRET_TOKEN, envVars.JWT.ACCESS_EXPIRES);
      const refreshToken = generateToken(jwtPayload, envVars.JWT.REFRESH_SECRET_TOKEN, envVars.JWT.REFRESH_EXPIRES);

      const { password, ...user } = isUserExist.toObject();
      return {
            accessToken,
            refreshToken,
            user
      };
};

const refreshToken = async (refreshToken: string) => {
      const verifyRefreshToken = verifyToken(refreshToken, envVars.JWT.REFRESH_SECRET_TOKEN);

      const isUserExist = await User.findOne({ email: verifyRefreshToken.email });
      if (!isUserExist) throw new AppError(404, "User Not Found");

      const jwtPayload = {
            email: isUserExist.email,
            role: isUserExist.role
      };
      const accessToken = generateToken(jwtPayload, envVars.JWT.ACCESS_SECRET_TOKEN, envVars.JWT.ACCESS_EXPIRES);

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