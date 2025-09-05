import { z } from "zod";

export const orderValidationSchema = z.object({
  body: z.object({
    shippingAddress: z.string().min(2, { message: 'Address is required' }),
    phone: z.string().min(3, { message: 'Please enter a valid phone number' }),
  }),
});
