import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.get('/', 
    orderController.getAllOrders,
); 

router.post('/create',
    orderController.createOrder,
);

export const orderRoutes = router;