const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Rutas
router.get('/carrito', carritoController.getCarritos); 
router.get('/:id', carritoController.getCarritoById); 
router.post('/', carritoController.createCarrito); 
router.delete('/', carritoController.deleteCarrito);
//AWS 
router.post('/files',carritoController.fileUpload);
router.put('/files',carritoController.getfilesaws);
router.get('/file/:fileName',carritoController.getfile);
router.get('/downloadfile/:fileName',carritoController.downloadfile);
module.exports = router;