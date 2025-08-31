import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { productValidationSchema } from "./product.validation";
import { productController } from "./product.controller";

const router = express.Router();

// call controller function 
router.post('/create',
    validateRequest(productValidationSchema),
    productController.createProduct
);

router.get('/', 
    productController.getAllProduct
);

export const productRoutes = router;