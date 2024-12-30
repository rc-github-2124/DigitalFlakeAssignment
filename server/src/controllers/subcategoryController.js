const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category'); 
const Counter = require('../models/Counter');
const path = require('path');
// Get all subcategories
// Populate categories with subcategories and add missing fields
// Get the subcategory of a category
exports.getSubcategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({ id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ subcategories: category.subcategories });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// Add or update the subcategory in a category
exports.addOrUpdateSubcategory = async (req, res) => {
    const { id } = req.params;
    const { subcategories } = req.body;

    if (!subcategories) {
        return res.status(400).json({ message: 'Subcategory is required' });
    }

    try {
        const category = await Category.findOne({ id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.subcategories = subcategories;

        await category.save();

        res.status(200).json({
            message: 'Subcategory updated successfully',
            category,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// Delete the subcategory from a category
exports.deleteSubcategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findOne({ id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.subcategories = null; // Set the subcategory to null

        await category.save();

        res.status(200).json({
            message: 'Subcategory deleted successfully',
            category,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};
