const Product = require('../models/Product');
const Category = require('../models/Category');

// Get a product by custom `id`
exports.getProduct = async (req, res) => {
    const { productId } = req.params;
    
    try {
        const product = await Product.findOne({ id: productId }).populate('category');
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Set or update the productName for a product by custom `id`
exports.setProductName = async (req, res) => {
    const { productId } = req.params;
    const { productName } = req.body;

    if (!productName) {
        return res.status(400).json({ message: 'Product name is required' });
    }

    try {
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Set the product name
        product.productName = productName;

        // Optionally, inherit category data (if needed)
        const category = await Category.findOne({ id: product.categoryId });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Optionally, update the category productName or perform other actions
        category.productName = productName;
        await category.save();

        await product.save();

        res.status(200).json({
            message: 'Product name updated successfully',
            product,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a product by custom `id`
exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.remove();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
