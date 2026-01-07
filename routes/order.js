import express from 'express';
import isAuth from '../middleware/isAuth.js';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/', isAuth, orderController.createOrder);

router.get('/', isAuth, orderController.getOrders);

router.get('/:orderId', isAuth, orderController.getOrder);

export default router;