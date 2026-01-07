import express from 'express';
import isAuth from '../middleware/isAuth.js';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.post('/', isAuth, productController.createProduct);

router.get('/:productId', productController.getProduct);

router.get('/', productController.getProducts);

router.put('/:productId', isAuth, productController.updateProduct);

router.delete('/:productId', isAuth, productController.deleteProduct);

export default router;