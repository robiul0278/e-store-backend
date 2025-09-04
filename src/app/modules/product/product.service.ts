import QueryBuilder from "../../../helper/QueryBuilder";
import { sendImageToCloudinary } from "../../../utils/sendImageToCloudinary";
import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

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



export const productServices = {
    createProductDB,
    getAllProductDB,
    singleProductDB,
    deleteProductDB,
    updateProductDB,
}