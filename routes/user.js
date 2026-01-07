import express from 'express';
import isAuth from '../middleware/isAuth.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/cart', isAuth, userController.getUserCart);

router.post('/cart', isAuth, userController.addToCart);

router.delete('/cart/:productId', isAuth, userController.deleteCartItem);

router.delete('/cart', isAuth, userController.clearCart);

export default router;