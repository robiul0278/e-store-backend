import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { orderService } from "./order.service";

const getAllOrders = catchAsync(async (req, res) => {
    const result = await orderService.getAllOrderDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all orders successfully!",
        data: result,
    })
})
const createOrder = catchAsync(async (req, res) => {
    const result = await orderService.createOrderDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Oder create successfully!",
        data: result,
    })
})

export const orderController = {
    getAllOrders,
    createOrder,
}