const express = require('express'); // third party module
const cors = require('cors');
require('../db/db'); // adjust path because this file is inside /api folder

const app = express();
app.use(cors());
app.use(express.json()); // loads a middleware

const bookRoutes = require('../routes/books');
const productRoutes = require('../routes/products');

app.use('/api/books', bookRoutes);
app.use('/api/products', productRoutes);

module.exports = app; // Export app (don't call listen)
