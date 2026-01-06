import prisma from '../prismaClient.js';

class UserService {
  static async getUserById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        cart: {
          include: {
            products: {
              include: { product: true },
            },
          },
        },
      },
    });
  }

  static async addToCart(userId, productId) {
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: { userId: userId, productId: productId },
      },
    });

    if (cartItem) {
      return prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + 1 },
      });
    } else {
      return prisma.cartItem.create({
        data: {
          userId: userId,
          productId: productId,
          quantity: 1,
        },
      });
    }
  }

  static async deleteCartItem(userId, productId) {
    return prisma.cartItem.deleteMany({
      where: { userId: userId, productId: productId },
    });
  }

  static async clearCart(userId) {
    return prisma.cartItem.deleteMany({
      where: { userId: userId },
    });
  }
}

export default UserService;