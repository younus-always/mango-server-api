import config from "../../config";
import AppError from "../../error/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import * as bcrypt from "bcrypt";


const registerUser = async (payload: IUser) => {
      payload.password = await bcrypt.hash(payload.password, config.bcrypt_salt);

      const data = await User.create(payload);
      return data;
};

const loginUser = async (payload: IUser) => {
      const isUserExist = await User.findOne({ email: payload.email });
      if (!isUserExist) throw new AppError(404, "User Not Found");

      const checkPassword = await bcrypt.compare(payload.password, isUserExist.password);
      if (!checkPassword) throw new AppError(409, "Invalid Credentials");

      return isUserExist;
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
      getAllUser,
      getUserById,
      deleteUser
};