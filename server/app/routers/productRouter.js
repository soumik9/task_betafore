import express from 'express'
const router = express.Router();

import auth from '../middleware/auth.js';
import getProducts from '../controllers/products/getProducts.js';

//routes
router.get('/', auth(), getProducts);

export default router;