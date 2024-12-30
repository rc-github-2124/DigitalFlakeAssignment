const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
    image: { type: String }, 
    status: { type: Boolean, default: true },
    subcategories: { type: String },  // Array to store subcategories
    productName: { type: String, },  // Product name field
    action: { type: String },  // Action-related field
});

module.exports = mongoose.model('Category', CategorySchema);
