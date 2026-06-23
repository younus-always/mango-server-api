import { Model, Types } from "mongoose";

export interface IOrderAddress {
      country: string;
      state: string;
      street: string;
      zipcode: string;
};

export interface IOrder {
      user: Types.ObjectId;
      mango: Types.ObjectId;
      quantity: number;
      totalPrice: number;
      status: string;
      address: IOrderAddress
};

export interface IOrderMethods {
      // for instance method
      checkStock(id: string): Promise<any>;
};

// export interface IOrderModel extends Model<IOrder> {}
export interface IOrderModel extends Model<IOrder, {}, IOrderMethods> {
      // for static method
      checkStock(id: string, quantity: number): Promise<any>;
};