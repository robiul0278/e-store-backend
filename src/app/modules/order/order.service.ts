import QueryBuilder from "../../../helper/QueryBuilder";
import { TOrder, TStatus } from "./order.interface";
import { OrderModel } from "./order.model";

const getAllOrderDB = async (query: Record<string, unknown>) => {
  const searchableField = ['orderId', 'name']
  const Select = ''

  const jobQuery = new QueryBuilder(
    OrderModel.find(), query)
    .search(searchableField)
    .filter()
     .dateFilter("createdAt")
    .sort()
    .paginate()
    .fields(Select);

  const result = await jobQuery.modelQuery
    .populate('user')
    .populate('products.product');

  const meta = await jobQuery.countTotal();

  return {
    meta,
    result,
  }
}

const createOrderDB = async (payload: TOrder) => {
    const result = await OrderModel.create(payload);
    return result;
}

const deleteOrderDB = async (id: string) => {
  const result = await OrderModel.deleteOne({_id:id});
  return result;
}

const updateOrderStatusDB = async (orderId: string, data: TStatus) => {
  const result = await OrderModel.updateOne(
    { _id: orderId },
    { 
      $set: { 
        status: data.status,
        paymentStatus: data.paymentStatus
      } 
    }
  );
  return result;
}


export const orderService = {
    getAllOrderDB,
    createOrderDB,
    deleteOrderDB,
    updateOrderStatusDB,
}