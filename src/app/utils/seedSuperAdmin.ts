import { envVars } from './../config/index';
import { User } from "../modules/user/user.model";
import { IAuthProvider, IUser, Role } from '../modules/user/user.interface';
import bcrypt from "bcrypt";

export const seedSuperAdmin = async () => {
      const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL });
      if (isSuperAdminExist) {
            console.log("Super Admin Already Exists!");
            return;
      };

      console.log("Trying to create super admin...");

      const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, envVars.BCRYPT_SALT);
      const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
      };

      const payload: IUser = {
            name: "Super Admin",
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            role: Role.SUPER_ADMIN,
            isVerified: true,
            auths: [authProvider],
      };

      const superAdmin = await User.create(payload);
      console.log(`Super Admin Created Successfully: ${superAdmin}`);
};