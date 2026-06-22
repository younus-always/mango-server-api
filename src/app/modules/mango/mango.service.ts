import { IMango } from "./mango.interface";
import { Mango } from "./mango.model";


const createMango = async (payload: IMango) => {
      const mango = await Mango.create(payload);
      return mango;
};

const getAllMango = async () => {
      const data = await Mango.find();
      return data;
};

const getMangoById = async (mangoId: string) => {
      const data = await Mango.findById(mangoId);
      return data;
};

const deleteMango = async (mangoId: string) => {
      const data = await Mango.findByIdAndDelete(mangoId);
      return data;
};

export const mangoService = {
      createMango,
      getAllMango,
      getMangoById,
      deleteMango
};