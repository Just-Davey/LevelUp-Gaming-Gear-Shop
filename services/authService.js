import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';

class AuthService {
  static async registerUser({ email, password, name }) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return user;
  }

  static async loginUser({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return user;
  }
}

export default AuthService;