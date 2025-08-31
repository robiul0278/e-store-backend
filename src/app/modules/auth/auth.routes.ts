import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { forgotPasswordValidationSchema, refreshTokenValidationSchema, resetPasswordValidationSchema, userRegisterValidationSchema,userLoginValidationSchema } from "./auth.validation";

const router = express.Router();

router.post(
    '/register', 
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