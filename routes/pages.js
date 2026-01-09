import express from 'express';
import prisma from '../prismaClient.js';

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

router.get('/cart', (req, res) => {
  res.render('pages/cart', { title: 'Cart | LevelUP!' });
});

//router.get('/admin', (req, res) => res.render('pages/admin', { title: 'Admin | LevelUP!' }));


router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.redirect('/');
});

export default router;
