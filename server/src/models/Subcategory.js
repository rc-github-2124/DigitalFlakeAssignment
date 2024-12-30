const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Import the Category schema
const Category = require('./Category');

// Define the Subcategory schema
const SubcategorySchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    subcategoryName: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category schema
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    status: {
        type: Boolean,
        default: true,
    },
    
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Add a virtual field to merge category data
SubcategorySchema.virtual('mergedData').get(async function () {
    const categoryData = await mongoose.model('Category').findById(this.category).lean();
    return {
        ...categoryData,
        ...this.toObject(),
    };
});

// Export the model
module.exports = mongoose.model('Subcategory', SubcategorySchema);
