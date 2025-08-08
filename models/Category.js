const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    catname: {
        name: String,
        
    },
    description: {
        name: String,
        
    },
    identifier: {
        name: String,
        
    },

});

const category = mongoose.model('category', categorySchema); // category is collections name created
module.exports = category;