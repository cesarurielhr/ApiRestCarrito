const express = require('express');
const productController = require('../controllers/productController'); // Importar el controlador de productos

const router = express.Router();

// Crear un nuevo producto
router.post('/', productController.createProduct);

// Obtener todos los productos
router.get('/products', productController.getAllProducts);

// Obtener un producto por su ID
router.get('/products/:id', productController.getProductById);

// Actualizar un producto
router.put('/products/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
