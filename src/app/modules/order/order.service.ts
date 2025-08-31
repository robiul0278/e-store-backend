import { OrderModel } from "./order.model";

const createOrderDB = async (payload: any) => {
    const result = await OrderModel.create(payload);
    return result;
}

export const orderService = {
    createOrderDB
}