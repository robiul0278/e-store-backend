import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { productRoutes } from "../modules/product/product.route";
import { orderRoutes } from "../modules/order/order.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;