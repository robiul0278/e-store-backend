import { ProductModel } from "./product.model";

const createProductDB = async (payload: any) => {
    const result = await ProductModel.create(payload);
    return result;
}

const getAllProductDB = async () => {
    const result = await ProductModel.find({});
    return result;
}


export const productServices = {
    createProductDB,
    getAllProductDB,
}