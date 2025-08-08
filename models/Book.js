const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const book = mongoose.model('book', bookSchema); // books is collections name created
module.exports = book;