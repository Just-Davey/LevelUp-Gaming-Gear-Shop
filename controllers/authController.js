import * as authService from '../services/authService.js';

export async function register(req, res) {
  const { email, password } = req.body;

  try {
    const user = await authService.register(email, password);

    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);

    res.status(200).json({
      token: result.token,
      userId: result.userId,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
}