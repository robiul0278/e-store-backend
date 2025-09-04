import { z } from "zod";

export const productValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required!"),
    description: z.string().min(10, "Description is required!"),
    price: z.number().positive("Price must be positive!"),
    discount: z.number().positive("Discount must be positive!"),
    categories: z.array(z.string()).min(1, "At least one category is required"),
    photos: z.array(z.string()).min(1, "At least one photo is required").max(5, "You can upload a maximum of 5 photos"),
  }),
});
