import { IUser } from "./user.interface";
import { User } from "./user.model";


const createUser = async (payload: IUser) => {
      const data = await User.create(payload);
      return data;
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
      createUser,
      getAllUser,
      getUserById,
      deleteUser
};