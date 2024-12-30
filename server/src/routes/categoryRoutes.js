const express = require('express');
const upload = require('../middleware/Configmulter');
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getCategoryById,
    updateProductName,
    updateSubcategory
} = require('../controllers/categoryController');
const router = express.Router();

router.post('/', upload.single('image'), createCategory);
router.get('/', getCategories);
router.put('/:id', updateCategory);
router.put('/:id/product-name', updateProductName);  // Update product name route
router.put('/:id/subcategory', updateSubcategory);  // Update subcategory route
router.delete('/:id', deleteCategory);
router.get('/:id', getCategoryById);

module.exports = router;
