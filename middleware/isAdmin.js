export default async function isAdmin(req, res, next) {
  if (!req.userId) return res.status(401).json({ message: 'Not authenticated.' });

  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: 'Admin access only.' });
  }

  next();
}