import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    photos: { type: [String], required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // percentage
    discountPrice: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    categories: { type: [String], required: true },
  },
  { timestamps: true }
);

// Pre-save hook (new doc বা doc.save() এর জন্য)
productSchema.pre("save", function (next) {
  this.discountPrice = this.price - (this.price * Number(this.discount)) / 100;
  next();
});

//update discount price
productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;

  // $set এর মধ্যে price/discount থাকলে handle
  if (update.$set) {
    const price = update.$set.price ?? update.$set.price;
    const discount = update.$set.discount ?? update.$set.discount;

    if (price !== undefined || discount !== undefined) {
      const finalPrice = price - (price * (discount ?? 0)) / 100;
      update.$set.discountPrice = finalPrice;
    }
  }
  next();
});

export const ProductModel = model<TProduct>("Product", productSchema);
