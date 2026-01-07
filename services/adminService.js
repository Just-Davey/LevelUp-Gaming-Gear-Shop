import prisma from '../prismaClient.js';

const ITEMS_PER_PAGE = 3;

class AdminService {
  static async getProductsByAdmin(userId, page = 1) {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const [totalItems, products] = await Promise.all([
      prisma.product.count({ where: { userId } }),
      prisma.product.findMany({
        where: { userId },
        skip,
        take: ITEMS_PER_PAGE,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      products,
      currentPage: page,
      totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
      totalItems,
    };
  }

  static async getProductById(userId, productId) {
    return prisma.product.findFirst({
      where: { id: productId, userId },
    });
  }
}

export default AdminService;