const express = require('express'); // third party module
require('./db/db');
const app = express();
app.use(express.json()); // loads a middleware

const bookRoutes = require('./routes/books');

app.use('/api/books', bookRoutes); // loads a middleware

const port = 4000;
app.listen(port, () => { // Bind and listen for connections
    console.log(`App is running at http://localhost:${port}`);
})
