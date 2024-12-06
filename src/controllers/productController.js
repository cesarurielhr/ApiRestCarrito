const { createProduct: createFacturapiProduct } = require('../services/facturapiService'); // Importar la función de Facturapi
const Product = require('../models/productModel'); // El modelo de Mongoose para los productos

// Crear un nuevo producto
async function createProduct(req, res) {
  const { name, description, price, category, brand, stock, imgs } = req.body;

  try {
    // Primero, crea el producto en Facturapi
    const facturapiResponse = await createFacturapiProduct({ description, price });
    const facturapiProductId = facturapiResponse.id; // Obtén el ID del producto creado en Facturapi

    // Ahora, guarda el producto en la base de datos
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      imgs,
      facturapiId: facturapiProductId // Guarda el ID de Facturapi en la base de datos
    });

    await newProduct.save(); // Guarda el producto

    // Devuelve el producto creado
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
}

// Obtener todos los productos
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
}

// Obtener un producto por su ID
async function getProductById(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
}

// Actualizar un producto
async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, price, category, brand, stock, imgs, facturapiId } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, brand, stock, imgs, facturapiId },
      { new: true } // Devuelve el producto actualizado
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
}

// Eliminar un producto
async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
