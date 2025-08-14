const express = require('express'); // third party module
const cors = require('cors');
require('./db/db');
const app = express();
app.use(cors());
app.use(express.json()); // loads a middleware

const bookRoutes = require('./routes/books');
const productRoutes = require('./routes/products');

app.use('/api/books', bookRoutes); // loads a middleware
app.use('/api/products', productRoutes); 

const port = process.env.PORT || 3000;
app.listen(port, () => { // Bind and listen for connections
    console.log(`App is running at http://localhost:${port}`);
})
