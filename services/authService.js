import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';
import isAdmin from '../middleware/isAdmin.js';

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(email, password, isAdmin=false) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, password: hashedPassword } });

  return { id: user.id, email: user.email, isAdmin: user.isAdmin};
}

export async function login(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid email or password');

  const token = jwt.sign({ 
    userId: user.id, 
    email: user.email,
    isAdmin: user.isAdmin
  }, 
  JWT_SECRET, { expiresIn: '1h' });

  return { token, userId: user.id, isAdmin: user.isAdmin};
}