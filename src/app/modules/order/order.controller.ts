import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { orderService } from "./order.service";

const getAllOrders = catchAsync(async (req, res) => {
    const result = await orderService.getAllOrderDB(req.query);

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

const deleteOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await orderService.deleteOrderDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order delete successfully!",
        data: result,
    })
})
const updateOrderStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await orderService.updateOrderStatusDB(id,data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Status update successfully!",
        data: result,
    })
})

export const orderController = {
    getAllOrders,
    createOrder,
    deleteOrder,
    updateOrderStatus,
}