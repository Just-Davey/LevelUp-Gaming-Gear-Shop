import OrderService from '../services/orderService.js';

export async function createOrder(req, res) {
  const userId = req.userId;

  try {
    const order = await OrderService.createOrder(userId);
    res.status(201).json({ message: 'Order created', order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getOrders(req, res) {
  const userId = req.userId;

  try {
    const orders = await OrderService.getOrdersByUser(userId);
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getOrder(req, res) {
  const { orderId } = req.params;

  try {
    const order = await OrderService.getOrderById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}