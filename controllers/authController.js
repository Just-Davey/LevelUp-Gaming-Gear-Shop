import * as authService from '../services/authService.js';

function wantsHtml(req) {
  const accept = req.headers.accept || '';
  const ct = req.headers['content-type'] || '';
  return accept.includes('text/html') || ct.includes('application/x-www-form-urlencoded');
}

export async function register(req, res) {
  const { email, password } = req.body;

  try {
    const user = await authService.register(email, password);
    const result = await authService.login(email, password);

    res.cookie('token', result.token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    if (wantsHtml(req)) return res.redirect('/');

    return res.status(201).json({
      message: 'User created successfully',
      user,
      token: result.token,
      userId: result.userId,
    });
  } catch (err) {
    if (wantsHtml(req)) {
      return res.status(400).render('auth/register', {
        title: 'Register | LevelUP!',
        error: err.message,
        form: { email },
      });
    }

    return res.status(400).json({ message: err.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);

    res.cookie('token', result.token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    if (wantsHtml(req)) return res.redirect('/');

    return res.status(200).json({
      token: result.token,
      userId: result.userId,
    });
  } catch (err) {
    if (wantsHtml(req)) {
      return res.status(401).render('auth/login', {
        title: 'Login | LevelUP!',
        error: err.message,
        form: { email },
      });
    }

    return res.status(401).json({ message: err.message });
  }
}
