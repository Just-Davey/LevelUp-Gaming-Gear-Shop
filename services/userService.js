import prisma from '../prismaClient.js';

class UserService {
  static async getUserById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        cartItems: {
          include: { product: true },
        },
      },
    });
  }

  static async addToCart(userId, productId) {
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (cartItem) {
      return prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + 1 },
      });
    }

    return prisma.cartItem.create({
      data: { userId, productId, quantity: 1 },
    });
  }

  static async decreaseFromCart(userId, productId) {
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (!cartItem) return null;

    if (cartItem.quantity <= 1) {
      await prisma.cartItem.delete({ where: { id: cartItem.id } });
      return null;
    }

    return prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity - 1 },
    });
  }

  static async deleteCartItem(userId, productId) {
    return prisma.cartItem.deleteMany({
      where: { userId, productId },
    });
  }

  static async clearCart(userId) {
    return prisma.cartItem.deleteMany({
      where: { userId },
    });
  }

  static async getCart(userId) {
    return prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export default UserService;
