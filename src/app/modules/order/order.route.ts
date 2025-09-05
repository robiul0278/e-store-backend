import express from "express";
import { orderController } from "./order.controller";
import validateRequest from "../../middleware/validateRequest";
import { orderValidationSchema } from "./order.validation";

const router = express.Router();

router.get('/', 
    orderController.getAllOrders,
); 

router.post('/create',
    validateRequest(orderValidationSchema),
    orderController.createOrder,
);
router.delete('/delete/:id',
    orderController.deleteOrder,
);
router.patch('/update/:id',
    orderController.updateOrderStatus,
);

export const orderRoutes = router;