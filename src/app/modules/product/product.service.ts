import { Types } from "mongoose";
import QueryBuilder from "../../../helper/QueryBuilder";
import { sendImageToCloudinary } from "../../../utils/sendImageToCloudinary";
import { TProduct, TProductStatus } from "./product.interface";
import { ProductModel } from "./product.model";
import { userModel } from "../auth/auth.model";
import { OrderModel } from "../order/order.model";

const getAllProductDB = async (query: Record<string, unknown>) => {
  const searchableField = ['name']
  const Select = '-description'

  const jobQuery = new QueryBuilder(
    ProductModel.find(), query)
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields(Select);

  const result = await jobQuery.modelQuery;
  const meta = await jobQuery.countTotal();

  // Aggregate categories
const categoryList = await ProductModel.aggregate([
  { $unwind: "$categories" },
  { $group: { _id: "$categories" } },
  { $project: { category: "$_id", _id: 0 } },
  { $sort: { category: 1 } }
]);

const categories = categoryList.map(c => c.category);

  return {
    meta,
    categories,
    result,
  }
}

const singleProductDB = async (slug: string) => {
  const result = await ProductModel.findOne({ slug });
  return result;
}
const deleteProductDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
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


const updateProductDB = async (_id: string,files: Express.Multer.File[],payload: TProduct) => {
  const photoUrls: string[] = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const { secure_url } = await sendImageToCloudinary(file.path, payload.name);
      photoUrls.push(secure_url);
    }
  }

  // update object
  const updateData: Partial<TProduct> = { ...payload };

  if (photoUrls.length > 0) {
    updateData.photos = photoUrls;
  } else {
    delete updateData.photos;
  }

  const result = await ProductModel.findByIdAndUpdate(
    _id,
    { $set: updateData },
    { new: true }
  );

  return result;
};

const updateProductStatusDB = async (id: string, data: TProductStatus) => {
  const updateData = {
    ...(data.inStock !== undefined && { inStock: data.inStock }),
    ...(data.status !== undefined && { status: data.status }),
  };

  const result = await ProductModel.updateOne(
      { _id: id },
    { $set: updateData },
    { runValidators: true }
  );

  return result;
};

const AnalyticsDB = async () => {
    const userCount = await userModel.countDocuments();
    const productCount = await ProductModel.countDocuments();
    const orderCount = await OrderModel.countDocuments();

    return {
      userCount,
      productCount,
      orderCount
    }
}


export const productServices = {
    createProductDB,
    getAllProductDB,
    singleProductDB,
    deleteProductDB,
    updateProductDB,
    updateProductStatusDB,
    AnalyticsDB,
}