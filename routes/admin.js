import express from 'express';
import isAuth from '../middleware/isAuth.js';
import isAdmin from '../middleware/isAdmin.js';
import {
  getProductsAdmin,
  getProductAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/products', isAuth, isAdmin, getProductsAdmin);

router.get('/products/:productId', isAuth, isAdmin, getProductAdmin);

router.post('/products', isAuth, isAdmin, createProductAdmin);

router.put('/products/:productId', isAuth, isAdmin, updateProductAdmin);

router.delete('/products/:productId', isAuth, isAdmin, deleteProductAdmin);

export default router;