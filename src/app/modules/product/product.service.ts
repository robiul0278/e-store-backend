import { sendImageToCloudinary } from "../../../utils/sendImageToCloudinary";
import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const getAllProductDB = async () => {
    const result = await ProductModel.find({});
    return result;
}

const createProductDB = async (files: Express.Multer.File[], payload: TProduct) => {
  const photoUrls: string[] = [];

  for (const file of files) {
    const {secure_url} = await sendImageToCloudinary(file?.path, payload?.name);
    photoUrls.push(secure_url);
  }
  payload.photos = photoUrls;

  const product = await ProductModel.create(payload);
  return product;
};


const getSingleProductDB = async (productId: string) => {
    const result = await ProductModel.findById(productId);
    return result;
}

export const productServices = {
    createProductDB,
    getAllProductDB,
    getSingleProductDB,
}