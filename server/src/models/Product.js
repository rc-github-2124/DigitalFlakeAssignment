const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: {
        type: String,  // custom `id` for the product
        required: true,
        unique: true,   // Ensure it's unique
    },
    productName: {
        type: String, // productName field
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    categoryId: {  // Reference to Category using your custom `id`
        type: String,
        required: true,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
}, { timestamps: true });

// Use virtual to reference category data based on `categoryId`
ProductSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',  // Link to `categoryId` in the Product model
    foreignField: 'id',        // Link to `id` in the Category model (custom field)
    justOne: true,             // Return one category
});

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
