export default function attachAuthHeader(req, res, next) {
  const token = req.cookies?.token;
  if (token && !req.get('Authorization')) {
    req.headers.authorization = `Bearer ${token}`;
  }
  next();
}
