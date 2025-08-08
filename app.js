const express = require('express'); // third party module
require('./db/db');
const app = express();
app.use(express.json()); // loads a middleware

const bookRoutes = require('./routes/books');
const productRoutes = require('./routes/products');

app.use('/api/books', bookRoutes); // loads a middleware
app.use('/api/products', productRoutes); 

const port = 4000;
app.listen(port, () => { // Bind and listen for connections
    console.log(`App is running at http://localhost:${port}`);
})
