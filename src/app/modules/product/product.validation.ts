import { z } from "zod";

export const productValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    photos: z.array(z.string().url("Invalid photo URL")).min(1, "At least one photo is required").optional(),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be positive"),
    discount: z.number().min(0).optional(),
    inStock: z.boolean(),
    status: z.enum(["active", "inactive"]),
    categories: z.array(z.string().min(1, "Category is required")).min(1, "At least one category is required"),
  }),
});
