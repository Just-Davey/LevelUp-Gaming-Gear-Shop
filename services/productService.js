import prisma from '../prismaClient.js';

class ProductService {
  static async createProduct({ title, price, description, imageUrl, userId }) {
    return prisma.product.create({
      data: { title, price, description, imageUrl, userId },
    });
  }

  static async getProductById(productId) {
    return prisma.product.findUnique({ where: { id: productId } });
  }

  static async getProductsByUser(userId, page = 1, itemsPerPage = 3) {
    const skip = (page - 1) * itemsPerPage;
    const [totalItems, products] = await Promise.all([
      prisma.product.count({ where: { userId } }),
      prisma.product.findMany({
        where: { userId },
        skip,
        take: itemsPerPage,
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    return { totalItems, products };
  }

  static async getAllProducts(page = 1, itemsPerPage = 3) {
    const skip = (page - 1) * itemsPerPage;
    const [totalItems, products] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({
        skip,
        take: itemsPerPage,
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    return { totalItems, products };
  }

  static async updateProduct(productId, { title, price, description, imageUrl }) {
    return prisma.product.update({
      where: { id: productId },
      data: { title, price, description, imageUrl },
    });
  }

  static async deleteProduct(productId) {
    return prisma.product.delete({ where: { id: productId } });
  }
}

export default ProductService;