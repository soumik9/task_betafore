import express from 'express';
const router = express.Router();

import authRouter from './authRouter.js'
import productRouter from './productRouter.js'
import checkoutRouter from './checkoutRouter.js'
import orderRouter from './orderRouter.js'

const apiRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/product',
        route: productRouter,
    },
    {
        path: '/checkout',
        route: checkoutRouter,
    },
    {
        path: '/order',
        route: orderRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;