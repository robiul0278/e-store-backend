import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middleware/validateRequest";
import { productValidationSchema } from "./product.validation";
import { productController } from "./product.controller";
import authGard from "../../middleware/authGard";
import { USER_ROLE } from "../auth/auth.constant";
import { upload } from "../../../utils/sendImageToCloudinary";

const router = express.Router();

router.get('/', 
    productController.getAllProduct
);

router.post(
    '/create', 
     authGard(USER_ROLE.admin),
     upload.array('photos', 10),
    (req:Request, res: Response, next: NextFunction ) => {
        req.body = JSON.parse(req.body.data);
        next();
    }, 
    validateRequest(productValidationSchema), 
     productController.createProduct
);

router.get('/:productId', 
    productController.getSingleProduct
);

export const productRoutes = router;