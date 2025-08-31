import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        photos: { type: [String], required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        inStock: { type: Boolean, default: true },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
        categories: { type: [String], required: true},
    },
    { timestamps: true }
);

export const ProductModel = model<TProduct>("Product", productSchema);
