import express from 'express'
const router = express.Router();

import auth from '../middleware/auth.js';
import CreateCheckoutSession from '../controllers/checkout/CreateCheckoutSession.js';

//routes
router.post('/session', auth(), CreateCheckoutSession);

export default router;