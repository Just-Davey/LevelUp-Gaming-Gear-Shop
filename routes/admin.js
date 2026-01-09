import express from 'express';
import attachAuthHeader from '../middleware/attachAuthHeader.js';
import isAuth from '../middleware/isAuth.js';
import isAdmin from '../middleware/isAdmin.js';
import prisma from '../prismaClient.js';

const router = express.Router();

router.use(attachAuthHeader, isAuth, isAdmin);

router.get('/', async (req, res) => {
  const [productsCount, usersCount, ordersCount] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.count(),
  ]);

  res.render('admin/dashboard', {
    title: 'Admin | LevelUP!',
    stats: { productsCount, usersCount, ordersCount },
  });
});

router.get('/products', async (req, res) => {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  res.render('admin/products', { title: 'Admin Products | LevelUP!', products });
});

router.get('/products/new', (req, res) => {
  res.render('admin/product-form', {
    title: 'Add Product | LevelUP!',
    mode: 'create',
    product: null,
  });
});

router.post('/products', async (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  await prisma.product.create({
    data: {
      title,
      price: Number(price),
      description,
      imageUrl,
      userId: req.userId,
    },
  });
  res.redirect('/admin/products');
});

router.get('/products/:id/edit', async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) } });
  if (!product) return res.status(404).render('pages/404', { title: '404 | LevelUP!' });

  res.render('admin/product-form', {
    title: 'Edit Product | LevelUP!',
    mode: 'edit',
    product,
  });
});

router.post('/products/:id', async (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  await prisma.product.update({
    where: { id: Number(req.params.id) },
    data: {
      title,
      price: Number(price),
      description,
      imageUrl,
    },
  });
  res.redirect('/admin/products');
});

router.post('/products/:id/delete', async (req, res) => {
  await prisma.product.delete({ where: { id: Number(req.params.id) } });
  res.redirect('/admin/products');
});

router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, isAdmin: true, createdAt: true },
  });

  res.render('admin/users', { title: 'Admin Users | LevelUP!', users });
});

router.post('/users/:id/toggle-admin', async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id }, select: { isAdmin: true } });
  if (!user) return res.redirect('/admin/users');

  await prisma.user.update({ where: { id }, data: { isAdmin: !user.isAdmin } });
  res.redirect('/admin/users');
});

router.post('/users/:id/delete', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.redirect('/admin/users');
});

export default router;
