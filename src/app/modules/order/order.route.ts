import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post('/create',
    orderController.createProduct,
);

router.get('/', 
);

export const orderRoutes = router;