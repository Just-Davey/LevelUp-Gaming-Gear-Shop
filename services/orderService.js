import prisma from '../prismaClient.js';
import UserService from './userService.js';

class OrderService {
  static async createOrder(userId) {
    const user = await UserService.getUserById(userId);
    const cartItems = user?.cartItems || [];

    if (!cartItems.length) throw new Error('Cart is empty');

    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + Number(item.product.price) * item.quantity;
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    await UserService.clearCart(userId);
    return order;
  }

  static async getOrdersByUser(userId) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getOrderById(orderId) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: { include: { product: true } },
      },
    });
  }
}

export default OrderService;
