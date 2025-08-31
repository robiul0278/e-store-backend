
export type TProduct = {
  name: string;
  slug: string;
  photos: string[]; // array of photo URLs
  description: string;
  price: number;
  discount?: number; // optional
  inStock: boolean; // stock status
  status: "active" | "inactive";
  categories: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
