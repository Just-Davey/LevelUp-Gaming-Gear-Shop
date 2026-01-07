import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import userCartRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userCartRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;