import express from 'express'
const router = express.Router();

import auth from '../middleware/auth.js';
import MyOrder from '../controllers/order/MyOrder.js';

//routes
router.get('/auth-by-id', auth(), MyOrder);

export default router;