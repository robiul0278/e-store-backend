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
    const result = await productServices.getAllProductDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product get successfully!",
        data: result,
    })
})

const getSingleProduct = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const result = await productServices.singleProductDB(slug);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get Single successfully!",
        data: result,
    })
})
const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await productServices.deleteProductDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product delete successfully!",
        data: result,
    })
})

const updateProduct = catchAsync(async (req, res) => {
    const { _id } = req.body;

    const result = await productServices.updateProductDB(_id, req.files as Express.Multer.File[], req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product updated successfully!",
        data: result,
    })
})

export const productController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
}