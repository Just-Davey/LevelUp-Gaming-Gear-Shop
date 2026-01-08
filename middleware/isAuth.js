import jwt from 'jsonwebtoken';

export default function isAuth(req, res, next) {
  const JWT_SECRET = process.env.JWT_SECRET;

  const authHeader = req.get('Authorization');
  const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  const cookieToken = req.cookies?.token || null;

  const token = headerToken || cookieToken;
  if (!token) return res.status(401).json({ message: 'Not authenticated.' });

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(500).json({ message: 'Token verification failed.' });
  }

  if (!decodedToken) return res.status(401).json({ message: 'Not authenticated.' });

  req.userId = decodedToken.userId;
  next();
}
