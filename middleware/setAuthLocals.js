import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function setAuthLocals(req, res, next) {
  try {
    res.locals.auth = { isLoggedIn: false, isAdmin: false };

    const token = req.cookies?.token;
    if (!token) return next();

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.userId) return next();

    res.locals.auth.isLoggedIn = true;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { isAdmin: true },
    });

    res.locals.auth.isAdmin = !!user?.isAdmin;
    return next();
  } catch {
    res.locals.auth = { isLoggedIn: false, isAdmin: false };
    return next();
  }
}
