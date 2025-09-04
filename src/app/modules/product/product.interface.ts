
export type TProduct = {
  name: string;
  slug: string;
  photos: string[]; // array of photo URLs
  banner: string;
  description: string;
  price: number;
  discount?: number;
  discountPrice?: number;
  inStock: boolean; // stock status
  status: "active" | "inactive";
  categories: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
