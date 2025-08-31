import express, { NextFunction, Request, Response } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { forgotPasswordValidationSchema, refreshTokenValidationSchema, resetPasswordValidationSchema, userRegisterValidationSchema,userLoginValidationSchema } from "./auth.validation";
import { upload } from "../../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
    '/register', 
    upload.single('file'),
    (req:Request, res: Response, next: NextFunction ) => {
        req.body = JSON.parse(req.body.data);
        next();
    }, 
    validateRequest(userRegisterValidationSchema), 
    authController.registerUser
);

router.post(
    '/login', 
     validateRequest(userLoginValidationSchema), 
    authController.loginUser
);

router.post(
    '/refresh-token', 
    validateRequest(refreshTokenValidationSchema),
    authController.refreshToken
);

router.post(
    '/forget-password', 
    validateRequest(forgotPasswordValidationSchema),
    authController.forgetPassword
);

router.post(
    '/reset-password', 
    validateRequest(resetPasswordValidationSchema),
    authController.resetPassword
);

export const authRoutes = router;