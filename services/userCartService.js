import prisma from '../prismaClient.js';

export async function addToCart(userId, productId) {
  const existingItem = await prisma.cartItem.findUnique({
    where: { userId_productId: { userId, productId } }
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { userId_productId: { userId, productId } },
      data: { quantity: existingItem.quantity + 1 }
    });
  } else {
    await prisma.cartItem.create({
      data: { userId, productId, quantity: 1 }
    });
  }
}

export async function deleteCartItem(userId, productId) {
  await prisma.cartItem.delete({
    where: { userId_productId: { userId, productId } }
  });
}

export async function clearCart(userId) {
  await prisma.cartItem.deleteMany({ where: { userId } });
}

export async function getCart(userId) {
  return prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });
}