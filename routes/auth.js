import express from 'express';
import { body } from 'express-validator';  
import * as authController from '../controllers/authController.js';
import prisma from '../prismaClient.js';
import bcrypt from 'bcrypt';


const router = express.Router();

router.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (value) => {
        const existingUser = await prisma.user.findUnique({
          where: { email: value },
        });
        if (existingUser) {
          return Promise.reject('E-mail already in use');
        }
      })
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login
);

export default router;