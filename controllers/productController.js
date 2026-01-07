import ProductService from '../services/productService.js';

export async function createProduct(req, res) {
  const { title, price, description, imageUrl } = req.body;

  try {
    const product = await ProductService.createProduct({
      title,
      price,
      description,
      imageUrl,
      userId: req.userId,
    });
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getProduct(req, res) {
  const { productId } = req.params;

  try {
    const product = await ProductService.getProductById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getProducts(req, res) {
  const page = parseInt(req.query.page) || 1;

  try {
    const result = await ProductService.getAllProducts(page);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateProduct(req, res) {
  const { productId } = req.params;
  const { title, price, description, imageUrl } = req.body;

  try {
    const product = await ProductService.updateProduct(productId, { title, price, description, imageUrl });
    res.status(200).json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteProduct(req, res) {
  const { productId } = req.params;

  try {
    await ProductService.deleteProduct(productId);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}