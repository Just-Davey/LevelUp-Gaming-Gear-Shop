import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import pagesRoutes from './routes/pages.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import userCartRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import adminRoutes from './routes/admin.js';


import prisma from './prismaClient.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(async (req, res, next) => {
  res.locals.user = null;

  const token = req.cookies?.token;
  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, isAdmin: true },
    });

    if (user) res.locals.user = user;
  } catch (e) {
    res.clearCookie('token');
  }

  next();
});

app.use(cookieParser());

app.use(async (req, res, next) => {
  res.locals.user = null;

  const token = req.cookies?.token;
  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, isAdmin: true },
    });

    if (user) res.locals.user = user;
  } catch (e) {
    res.clearCookie('token');
  }

  next();
});



app.use('/', pagesRoutes);

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userCartRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
  const isApi =
    req.path.startsWith('/auth') ||
    req.path.startsWith('/products') ||
    req.path.startsWith('/users') ||
    req.path.startsWith('/orders') ||
    req.path.startsWith('/admin');

  if (isApi) return res.status(404).json({ message: 'Route not found' });
  return res.status(404).render('pages/404', { title: '404 | LevelUP!' });
});

export default app;
