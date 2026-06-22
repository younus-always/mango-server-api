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

      return {
            name: existingUser.name,
            email: existingUser.email,
            phone: existingUser.phone
      };
};

const resetPassword = async (email: string, phone: string, password: string) => {
      const existingUser = await User.findOne({ email });
      if (!existingUser) throw new AppError(404, "User Not Found");

      const isPhoneMatch = existingUser.phone === phone;
      if (!isPhoneMatch) throw new AppError(400, "Please provide your correct phone number");

      existingUser.password = await bcrypt.hash(password, config.bcrypt_salt);
      await existingUser.save();

      return {
            name: existingUser.name,
            email: existingUser.email,
            phone: existingUser.phone
      };
}


export const authService = {
      changePassword,
      resetPassword
};