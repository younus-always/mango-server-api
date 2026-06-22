import config from "../../config";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import * as bcrypt from "bcrypt";

const changePassword = async (email: string, oldPassword: string, newPassword: string) => {
      const existingUser = await User.findOne({ email });
      if (!existingUser) throw new AppError(404, "User Not Found");

      const isPasswordMatch = await bcrypt.compare(oldPassword, existingUser.password);
      if (!isPasswordMatch) throw new AppError(400, "Wrong Password");

      const updatePassword = await bcrypt.hash(newPassword, config.bcrypt_salt);
      
      existingUser.password = updatePassword;
      await existingUser.save();

      return existingUser;
};


export const authService = {
      changePassword,
};