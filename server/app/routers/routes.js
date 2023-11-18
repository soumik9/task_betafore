import express from 'express';
const router = express.Router();

import authRouter from './authRouter.js'
import productRouter from './productRouter.js'

const apiRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/product',
        route: productRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;