import { model, Schema } from "mongoose";
import { IOrder, IOrderAddress, IOrderMethods, IOrderModel } from "./order.interface";
import { Mango } from "../mango/mango.model";


const OrderAddressSchema = new Schema<IOrderAddress>({
      country: { type: String },
      state: { type: String },
      street: { type: String },
      zipcode: { type: String },
}, {
      _id: false,
});

const orderSchema = new Schema<IOrder, IOrderModel, IOrderMethods>({
      user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
      },
      mango: {
            type: Schema.Types.ObjectId,
            ref: "Mango",
            required: true,
      },
      quantity: {
            type: Number,
            min: 0,
            required: true
      },
      totalPrice: {
            type: Number,
            min: 0
      },
      status: {
            type: String,
            required: true
      },
      address: {
            type: OrderAddressSchema,
            required: true
      }
}, {
      versionKey: false,
      timestamps: true
});


orderSchema.static("checkStock", async function checkStock(id, quantity) {
      const product = await Mango.findById(id);

      if (!product) throw new Error("Product not found");
      if (product.stock < quantity) throw new Error("Insufficient stock");

      return true;
});

orderSchema.method("checkStock", async function checkStock() {
      const order = this as IOrder;
      const product = await Mango.findById(order.mango);
      
      if (!product) throw new Error("Product not found");
      if (product.stock < order.quantity) throw new Error("Insufficient stock");

      return true;
});

export const Order = model<IOrder, IOrderModel>("Order", orderSchema);