import { Types } from "mongoose";

export type TOrderProduct = {
  product: Types.ObjectId;
  quantity: number;
  price: number;
};

export type TOrder = {
  user: Types.ObjectId;
  products: TOrderProduct[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  phone: string;
  paymentMethod?: string;
  paymentStatus?: "pending" | "paid" | 'failed';
  orderId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TStatus = { 
  status?: string; 
  paymentStatus?: string 
}