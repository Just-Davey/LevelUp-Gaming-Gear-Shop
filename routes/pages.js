import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'LevelUP! | Home',
  });
});

router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login | LevelUP!' });
});

router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register | LevelUP!' });
});

router.get('/shop', (req, res) => {
  res.render('pages/shop', { title: 'Shop | LevelUP!' });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.redirect('/');
});

router.get('/shop', (req, res) => res.render('pages/shop', { title: 'Shop | LevelUP!' }));
router.get('/cart', (req, res) => res.render('pages/cart', { title: 'Cart | LevelUP!' }));
router.get('/admin', (req, res) => res.render('pages/admin', { title: 'Admin | LevelUP!' }));

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.redirect('/');
});

router.get('/cart', (req, res) => {
  res.render('pages/cart', {
    title: 'Cart | LevelUP!',
  });
});



export default router;
