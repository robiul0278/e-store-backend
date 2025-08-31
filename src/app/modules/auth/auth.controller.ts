import { authServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";

const registerUser = catchAsync(async (req, res) => {
    const result = await authServices.registerDB(req.body);
    const { password, ...other } = result.toObject()

    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User register Successfully!",
        data: other,
    })
})
const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginDB(req.body);
    const {refreshToken, ...token} = result;

    res.cookie("refreshToken", refreshToken,{
        secure: config.node_env === "production",
        httpOnly: true,
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User login Successfully!",
        data: token,
    })
})

const refreshToken = catchAsync(async (req, res) => {
    const {refreshToken} = req.cookies;
    const result = await authServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Create new accessToken!",
        data: result,
    })
})
const forgetPassword = catchAsync(async (req, res) => {
    const {email} = req.body;
    const result = await authServices.forgetPassword(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reset link generated successfully!",
        data: result,
    })
})

const resetPassword = catchAsync(async (req, res) => {
    const data = req.body;
    const token = req.headers.authorization as string;
    const result = await authServices.resetPassword(data, token);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password reset successfully!",
        data: result,
    })
})


export const authController = {
    registerUser,
    loginUser,
    refreshToken,
    forgetPassword,
    resetPassword,
}