const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Rutas
router.get('/carrito', carritoController.getCarritos); 
router.get('/:id', carritoController.getCarritoById); 
router.post('/', carritoController.createCarrito); 
router.delete('/', carritoController.deleteCarrito);

module.exports = router;