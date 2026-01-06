import { addToCart, getCart, deleteCartItem, clearCart } from '../services/userCartService.js';
import { createOrder } from '../services/orderService.js';

export async function postAddToCart(req, res) {
  const userId = req.user.id;
  const productId = parseInt(req.body.productId);
  await addToCart(userId, productId);
  res.redirect('/cart');
}

export async function getCartPage(req, res) {
  const userId = req.user.id;
  const cart = await getCart(userId);
  res.render('shop/cart', { cart });
}

export async function postCreateOrder(req, res) {
  const userId = req.user.id;
  const order = await createOrder(userId);
  res.redirect('/orders');
}