const express = require('express');

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails
} = require('../controllers/product.controller.js');

const router = express.Router();

router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/products', getAllProducts);
router.get('/product/:id', getProductDetails);

module.exports = router;