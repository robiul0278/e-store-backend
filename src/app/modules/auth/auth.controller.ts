import { authServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";

const registerUser = catchAsync(async (req, res) => {
    const result = await authServices.registerDB(req.file as Express.Multer.File, req.body);
    const { password, ...other } = result.toObject()

    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Register Successfully!",
        data: other,
    })
})
const loginUser = catchAsync(async (req, res) => {
    const {refreshToken, ...data} = await authServices.loginDB(req.body);

    res.cookie("refreshToken", refreshToken,{
        secure: config.node_env === "production",
        httpOnly: true,
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Login Successfully!",
        data: data,
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
        message: "Please check your email!",
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
const getAllUsers = catchAsync(async (req, res) => {
    const result = await authServices.getAllUsersDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all users successfully!",
        data: result,
    })
})
const deleteUsers = catchAsync(async (req, res) => {
     const { id } = req.params;
    const result = await authServices.deleteUserDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Delete users successfully!",
        data: result,
    })
})
const updateUserRole = catchAsync(async (req, res) => {
     const { userId } = req.params;
     const {role} = req.body
    const result = await authServices.updateUserRoleDB(userId,role);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User role update successful!",
        data: result,
    })
})


export const authController = {
    registerUser,
    loginUser,
    refreshToken,
    forgetPassword,
    resetPassword,
    getAllUsers,
    deleteUsers,
    updateUserRole,
}