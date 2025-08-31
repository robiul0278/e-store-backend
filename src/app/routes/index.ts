import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { productRoutes } from "../modules/product/product.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;