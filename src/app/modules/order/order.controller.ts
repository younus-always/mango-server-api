import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Order } from "./order.model";
import AppError from "../../error/AppError";
import mongoose from "mongoose";
import { Mango } from "../mango/mango.model";


const createOrder = catchAsync(async (req: Request, res: Response) => {
      const { quantity } = req.body;
      const id = req.params.id;
      const mangoId = Array.isArray(id) ? id[0] : id;

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
            const mango = await Mango.findById(mangoId);
            if (!mango) throw new AppError(404, "Mango Not Found");

            if (mango?.stock < quantity) throw new AppError(404, "Insufficient Stock");

            mango.stock -= Number(quantity);
            await mango.save();

            console.log(mango);

            const order = await Order.create([{ quantity, mango: mangoId }], { session });

            await session.commitTransaction();
            session.endSession();

            res.send({
                  success: true,
                  statusCode: 201,
                  message: "Order Created Successful",
                  data: order[0]
            });
      } catch (error) {
            console.log("slkdfj", error);

            await session.abortTransaction();
            session.endSession();
            throw new AppError(400, "Failed to create order")
      }
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
      const data = await Order.find().populate("user").populate("mango");
      const total = await Order.countDocuments();

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Orders Retrieved Successful",
            data,
            meta: {
                  total,
                  page: 0,
                  limit: 0,
                  totalPage: 0
            }
      });
});


export const orderController = {
      createOrder,
      getAllOrder
};