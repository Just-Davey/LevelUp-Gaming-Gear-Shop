import prisma from '../prismaClient.js';

export async function createOrder(userId) {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });

  if (cartItems.length === 0) throw new Error('Cart is empty');

  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      totalPrice,
      orderItems: {
        create: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }
    },
    include: { orderItems: true }
  });

  await prisma.cartItem.deleteMany({ where: { userId } });

  return order;
}