import express from 'express';
import isAuth from '../middleware/isAuth.js';
import isAdmin from '../middleware/isAdmin.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.get('/products', isAuth, isAdmin, adminController.getProductsAdminPage);

router.get('/add-product', isAuth, isAdmin, adminController.getAddProductPage);

router.get('/edit-product/:productId', isAuth, isAdmin, adminController.getEditProductPage);

export default router;