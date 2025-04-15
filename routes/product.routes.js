const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// =>  /api/products
router.post('/add', productController.createProduct);
router.get('/list', productController.getProducts);
router.get('/:id', productController.getProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.put('/update/:id', productController.updateProduct);


module.exports = router;