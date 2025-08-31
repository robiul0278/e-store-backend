import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import catchAsync from "../../shared/catchAsync";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/auth/auth.interface";
import { userModel } from "../modules/auth/auth.model";

const authGard = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    //! checking if the given token is valid
    const decoded = jwt.verify(token, config.jwt_secret_token as string) as JwtPayload;
    const { role, _id } = decoded;

    //! checking if the user is exist
    const user = await userModel.findById({_id});
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }
    //! checking if the user is already deleted
    // const isDeleted = user?.isDeleted;

    // if (isDeleted) {
    //   throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
    // }

    //! checking if the user is blocked
    // const userStatus = user?.status;

    // if (userStatus === "blocked") {
    //   throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
    // }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized bro!");
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default authGard;