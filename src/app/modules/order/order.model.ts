import  { Schema, model } from "mongoose";
import { TOrder, TOrderProduct } from "./order.interface";

const orderProductSchema = new Schema<TOrderProduct>(
  {
    product: { type: Schema.Types.ObjectId, ref: "ProductModel", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
  },
  { _id: false }
);

const orderSchema = new Schema<TOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: { type: [orderProductSchema], required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: { type: String },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  },
  { timestamps: true }
);

export const OrderModel = model<TOrder>("Order", orderSchema);
