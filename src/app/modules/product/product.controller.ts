import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { productServices } from "./product.service";

const createProduct = catchAsync(async (req, res) => {

  const result = await productServices.createProductDB(req.files as Express.Multer.File[], req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully!",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
    const result = await productServices.getAllProductDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product get successfully!",
        data: result,
    })
})

const getSingleProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const result = await productServices.getSingleProductDB(productId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get Single successfully!",
        data: result,
    })
})

export const productController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
}