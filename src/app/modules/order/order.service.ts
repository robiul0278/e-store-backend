import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const getAllOrderDB = async () => {
    const result = await OrderModel.find({});
    return result;
}

const createOrderDB = async (payload: TOrder) => {
    const result = await OrderModel.create(payload);
    return result;
}

export const orderService = {
    getAllOrderDB,
    createOrderDB
}