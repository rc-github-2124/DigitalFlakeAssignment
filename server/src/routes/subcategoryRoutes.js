const express = require('express');
const {
    getSubcategory,
    addOrUpdateSubcategory,
    deleteSubcategory,
} = require('../controllers/subcategoryController');

const router = express.Router();

// Get the subcategory of a category
router.get('/:id', getSubcategory);

// Add or update the subcategory for a category
router.put('/:id', addOrUpdateSubcategory);

// Delete the subcategory from a category
router.delete('/:id', deleteSubcategory);

module.exports = router;
