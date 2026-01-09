import prisma from '../prismaClient.js';

export default async function isAdmin(req, res, next) {
  try {
    if (!req.userId) {
      if (req.path.startsWith('/admin')) return res.status(401).render('pages/403', { title: '401 | LevelUP!' });
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user || !user.isAdmin) {
      if (req.path.startsWith('/admin')) return res.status(403).render('pages/403', { title: '403 | LevelUP!' });
      return res.status(403).json({ message: 'Admin access only.' });
    }

    req.isAdmin = true;
    next();
  } catch (err) {
    console.error(err);
    if (req.path.startsWith('/admin')) return res.status(500).render('pages/500', { title: '500 | LevelUP!' });
    return res.status(500).json({ message: 'Server error.' });
  }
}
