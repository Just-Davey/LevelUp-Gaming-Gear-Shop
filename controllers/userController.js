import UserService from '../services/userService.js';

export async function getUserCart(req, res) {
  try {
    const cart = await UserService.getCart(req.userId);
    res.status(200).json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function addToCart(req, res) {
  const { productId } = req.body;

  try {
    await UserService.addToCart(req.userId, productId);
    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteCartItem(req, res) {
  const { productId } = req.body;

  try {
    await UserService.deleteCartItem(req.userId, productId);
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function clearCart(req, res) {
  try {
    await UserService.clearCart(req.userId);
    res.status(200).json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}