const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    startRating: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
}, { timestamps: true });

const Product = mongoose.model('product', productSchema); // products is collection name
module.exports = Product;