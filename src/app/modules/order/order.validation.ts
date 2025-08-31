import { z } from "zod";

export const orderValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "User ID is required"),
    products: z
      .array(
        z.object({
          product: z.string().min(1, "Product ID is required"),
          quantity: z.number().min(1, "Quantity must be at least 1"),
          price: z.number().positive("Price must be positive"),
          discount: z.number().min(0).optional(),
        })
      )
      .min(1, "At least one product is required"),
    totalAmount: z.number().positive("Total amount must be positive"),
    status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]).optional(),
    paymentMethod: z.string().optional(),
    paymentStatus: z.enum(["pending", "paid", "failed"]).optional(),
  }),
});
