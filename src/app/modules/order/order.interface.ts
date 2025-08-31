import { Types } from "mongoose";

export type TOrderProduct = {
  product: Types.ObjectId;
  quantity: number;
  price: number; // price at the time of order
  discount?: number;
};

export type TOrder = {
  user: Types.ObjectId;
  products: TOrderProduct[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentMethod?: string;
  paymentStatus?: "pending" | "paid" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
};
