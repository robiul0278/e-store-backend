import AppError from "../../errors/AppError";
import { TLoginUser, TRegisterUser, TResetPassword } from "./auth.interface";
import { userModel } from "./auth.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import { sendEmail } from "../../../utils/sendEmail";
import { sendImageToCloudinary } from "../../../utils/sendImageToCloudinary";
import QueryBuilder from "../../../helper/QueryBuilder";

const registerDB = async (file: Express.Multer.File | null, payload: TRegisterUser) => {
    // send image to cloudinary
    if (file) {
        const { secure_url } = await sendImageToCloudinary(file?.path, payload?.name);
        payload.photo = secure_url;
    }

    const result = await userModel.create(payload);
    return result;
}

const loginDB = async (payload: TLoginUser) => {
    const User = await userModel.findOne({ email: payload?.email });

    if (!User) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    }
    // checking is the password correct  
    const isPasswordMatched = await bcrypt.compare(payload?.password, User?.password);

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, "This password not matched!", 'password');
    }

    const { password, __v, ...userWithoutSensitive } = User.toObject();

    // create accessToken 
    const jwtPayload = {
        userId: User?._id,
        email: User?.email,
        role: User?.role,
    }

    const accessToken = jwt.sign(
        jwtPayload, config.jwt_secret_token,
        { expiresIn: '1h' }
    );

    // create refreshToken 
    const refreshToken = jwt.sign(
        jwtPayload, config.jwt_refresh_token,
        { expiresIn: '30d' }
    );

    return {
        accessToken,
        refreshToken,
        user: userWithoutSensitive,
    }
}


const refreshToken = async (token: string) => {

    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    //! checking if the given token is valid
    const decoded = jwt.verify(token, config.jwt_refresh_token as string) as JwtPayload;
    const { userId } = decoded;

    //! checking if the user is exist
    const isUserExists = await userModel.findById({ _id: userId });

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    }
    // create accessToken 
    const jwtPayload = {
        userId: isUserExists?._id,
        email: isUserExists?.email,
        role: isUserExists?.role,
    }

    const accessToken = jwt.sign(
        jwtPayload, config.jwt_secret_token,
        { expiresIn: '1d' }
    );

    return {
        accessToken,
    }
}

const forgetPassword = async (email: string) => {

    //! checking if the user is exist
    const isUserExists = await userModel.findOne({ email });

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "এই ইমেইলটি সঠিক নয়!", "email");
    }

    // create accessToken 
    const jwtPayload = {
        userId: isUserExists?._id,
        email: isUserExists?.email,
        role: isUserExists?.role,
    }

    const resetToken = jwt.sign(
        jwtPayload, config.jwt_secret_token,
        { expiresIn: '10m' }
    );

    const resetUILink = `${config.reset_password_ui_link}/reset-password?email=${isUserExists.email}&token=${resetToken}`
    sendEmail(isUserExists?.email, resetUILink)
}

const resetPassword = async (payload: TResetPassword, token: string) => {
    const { email, newPassword } = payload;

    // JWT verify
    try {
        const decoded = jwt.verify(token, config.jwt_secret_token as string) as JwtPayload;

        const user = await userModel.findById(decoded.userId);

        if (!user || user.email !== email) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found with this email!", "email");
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            Number(config.bcrypt_salt_rounds)
        );

        await userModel.findByIdAndUpdate(decoded.userId, {
            password: hashedPassword,
        });

    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            throw new AppError(httpStatus.UNAUTHORIZED, "Token has expired. Please request a new one.", "token");
        } else if (error.name === "JsonWebTokenError") {
            throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token provided.", "token");
        } else {
            throw new AppError(httpStatus.UNAUTHORIZED, "Token verification failed.", "token");
        }
    }

};


const getAllUsersDB = async (query: Record<string, unknown>) => {
  const searchableField = ['name', 'email']
  const Select = '-password -__v'

  const jobQuery = new QueryBuilder(
    userModel.find(), query)
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields(Select);

  const result = await jobQuery.modelQuery;
  const meta = await jobQuery.countTotal();

  return {
    meta,
    result,
  }
}

const deleteUserDB = async (id: string) => {
  const result = await userModel.deleteOne({_id: id});
  return result;
}
const updateUserRoleDB = async (userId: string, role: string) => {
    const result = await userModel.updateOne(
      {_id: userId},
      { $set: {role} },
    );
    return result;
}

export const authServices = {
    registerDB,
    loginDB,
    refreshToken,
    forgetPassword,
    resetPassword,
    getAllUsersDB,
    deleteUserDB,
    updateUserRoleDB,
}