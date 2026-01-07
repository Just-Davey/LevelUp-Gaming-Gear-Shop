import AdminService from '../services/adminService.js';
import ProductService from '../services/productService.js';

export async function getProductsAdmin(req, res) {
  const userId = req.userId;
  const page = parseInt(req.query.page) || 1;

  try {
    const result = await AdminService.getProductsByAdmin(userId, page);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getProductAdmin(req, res) {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    const product = await AdminService.getProductById(userId, parseInt(productId));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createProductAdmin(req, res) {
  const userId = req.userId;
  const { title, price, description, imageUrl } = req.body;

  try {
    const product = await ProductService.createProduct({ title, price, description, imageUrl, userId });
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateProductAdmin(req, res) {
  const userId = req.userId;
  const { productId } = req.params;
  const { title, price, description, imageUrl } = req.body;

  try {
    const product = await AdminService.getProductById(userId, parseInt(productId));
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updatedProduct = await ProductService.updateProduct(productId, { title, price, description, imageUrl });
    res.status(200).json({ message: 'Product updated', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteProductAdmin(req, res) {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    const product = await AdminService.getProductById(userId, parseInt(productId));
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await ProductService.deleteProduct(productId);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}