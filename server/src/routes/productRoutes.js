const express = require('express');
const { getProduct, setProductName, deleteProduct } = require('../controllers/productController');

const router = express.Router();

// Get a single product by custom `id`
router.get('/:productId', getProduct);

// Set or update the productName by custom `id`
router.put('/:productId/productName', setProductName);

// Delete a product by custom `id`
router.delete('/:productId', deleteProduct);

module.exports = router;
