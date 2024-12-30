const Category = require('../models/Category');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Counter = require('../models/Counter')
// Create a new category
const getNextCategoryId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: 'categoryId' },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
    );
    return counter.count;
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { categoryName, productName, subcategories, action } = req.body;
    const image = req.file ? path.basename(req.file.path) : null;

    if (!image) {
        return res.status(400).json({ message: "Image is required" });
    }

    try {
        const id = await getNextCategoryId(); // Get the next category ID from the counter

        // Construct the category object
        const categoryData = {
            id: id.toString(),  // Make sure the id is a string
            categoryName,
            image,
            action,  // Include action even if it's optional, as it's a required field in your model
        };

        // Add productName and subcategories only if they are provided
        if (productName) {
            categoryData.productName = productName;
        }
        if (subcategories) {
            categoryData.subcategories = subcategories;
        }

        // Create the category document
        const category = new Category(categoryData);

        // Save the category
        await category.save();

        res.status(201).json({
            message: 'Category created successfully',
            category,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update category (this allows partial updates)
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { categoryName, productName, subcategories, action } = req.body;
    const image = req.file ? path.basename(req.file.path) : null;

    try {
        const category = await Category.findOne({ id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update fields conditionally
        category.categoryName = categoryName || category.categoryName;
        category.productName = productName || category.productName;
        category.subcategories = subcategories || category.subcategories;
        category.action = action || category.action;
        category.image = image || category.image;

        await category.save();

        res.status(200).json({
            message: 'Category updated successfully',
            category,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// Update only product name
exports.updateProductName = async (req, res) => {
    const { id } = req.params;
    const { productName } = req.body;

    try {
        const category = await Category.findOne({ id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.productName = productName || category.productName;

        await category.save();

        res.status(200).json({
            message: 'Product Name updated successfully',
            category,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// Update only subcategory
exports.updateSubcategory = async (req, res) => {
    const { id } = req.params;
    const { subcategories } = req.body;

    try {
        const category = await Category.findOne({ id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.subcategories = subcategories || category.subcategories;

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

// Delete a category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOneAndDelete({ id });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a category by id
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({ id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
