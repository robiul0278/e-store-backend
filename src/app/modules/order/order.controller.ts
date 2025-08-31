import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { orderService } from "./order.service";

const createProduct = catchAsync(async (req, res) => {

    const result = await orderService.createOrderDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product create successfully!",
        data: result,
    })
})

export const orderController = {
    createProduct,
}