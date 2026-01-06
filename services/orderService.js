import prisma from '../prismaClient.js';

class OrderService {
  static async createOrder(userId) {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (!cartItems.length) {
      throw new Error('Cart is empty');
    }

    const totalPrice = cartItems
      .map((item) => item.quantity * item.product.price)
      .reduce((acc, val) => acc + val, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        products: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        products: {
          include: { product: true },
        },
      },
    });

    await prisma.cartItem.deleteMany({ where: { userId } });

    return order;
  }

  static async getOrdersByUser(userId) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        products: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getOrderById(orderId) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        products: {
          include: { product: true },
        },
      },
    });
  }
}

export default OrderService;