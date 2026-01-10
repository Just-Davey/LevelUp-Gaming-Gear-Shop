import express from 'express';
import prisma from '../prismaClient.js';
import attachAuthHeader from '../middleware/attachAuthHeader.js';
import isAuth from '../middleware/isAuth.js';
import UserService from '../services/userService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const featuredProducts = products
      .filter((_, idx) => idx % 3 === 0)
      .slice(0, 6);

    res.render('pages/index', {
      title: 'LevelUP! | Home',
      featuredProducts,
    });
  } catch (err) {
    console.error(err);
    res.render('pages/index', {
      title: 'LevelUP! | Home',
      featuredProducts: [],
    });
  }
});

router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login | LevelUP!' });
});

router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register | LevelUP!' });
});

router.get('/shop', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.render('pages/shop', {
      title: 'Shop | LevelUP!',
      products,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).render('pages/shop', {
      title: 'Shop | LevelUP!',
      products: [],
    });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.redirect('/');
});

router.get('/cart', attachAuthHeader, isAuth, async (req, res) => {
  try {
    const items = await UserService.getCart(req.userId);

    const subtotal = items.reduce((acc, it) => {
      const price = Number(it.product?.price || 0);
      return acc + price * it.quantity;
    }, 0);

  const toast = req.cookies?.toast || null;
  if (toast) res.clearCookie('toast');

  res.render('pages/cart', {
    title: 'Cart | LevelUP!',
    items,
    subtotal,
    total: subtotal,
    toast,
  });

  } catch (err) {
    console.error(err);
    return res.status(500).render('pages/500', { title: '500 | LevelUP!' });
  }
});

router.post('/cart/add', attachAuthHeader, isAuth, async (req, res) => {
  const productId = Number(req.body.productId);
  if (!productId) return res.redirect('/shop');

  try {
    await UserService.addToCart(req.userId, productId);
    return res.redirect(req.get('referer') || '/cart');
  } catch (err) {
    console.error(err);
    return res.redirect('/cart');
  }
});

router.post('/cart/:productId/inc', attachAuthHeader, isAuth, async (req, res) => {
  const productId = Number(req.params.productId);
  await UserService.addToCart(req.userId, productId);
  return res.redirect('/cart');
});

router.post('/cart/:productId/dec', attachAuthHeader, isAuth, async (req, res) => {
  const productId = Number(req.params.productId);
  await UserService.decreaseFromCart(req.userId, productId);
  return res.redirect('/cart');
});

router.post('/cart/:productId/remove', attachAuthHeader, isAuth, async (req, res) => {
  const productId = Number(req.params.productId);
  await UserService.deleteCartItem(req.userId, productId);
  return res.redirect('/cart');
});

router.post('/cart/clear', attachAuthHeader, isAuth, async (req, res) => {
  await UserService.clearCart(req.userId);
  return res.redirect('/cart');
});

router.post('/checkout', attachAuthHeader, isAuth, async (req, res) => {
  try {
    const items = await UserService.getCart(req.userId);

    if (!items || items.length === 0) {
      res.cookie('toast', 'Cart is empty', { httpOnly: false });
      return res.redirect('/cart');
    }

    await UserService.clearCart(req.userId);

    res.cookie('toast', 'Checkout successful', { httpOnly: false });
    return res.redirect('/cart');
  } catch (err) {
    console.error(err);
    res.cookie('toast', 'Checkout failed', { httpOnly: false });
    return res.redirect('/cart');
  }
});

export default router;
