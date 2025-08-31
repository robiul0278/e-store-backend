import { ProductModal } from "./product.model";

const createProductDB = async (payload: any) => {
    const result = await ProductModal.create(payload);
    return result;
}

const getAllProductDB = async () => {
    const result = await ProductModal.find({});
    return result;
}


export const productServices = {
    createProductDB,
    getAllProductDB,
}