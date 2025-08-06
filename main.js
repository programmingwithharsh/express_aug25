const express = require('express'); // third party module
const app = express();
const port = 4000;
app.use(express.json());

// GET ALL
app.get('/', function (req, res) {
    let users = [
        {
            id: 1,
            username: 'Harshita'
        },
        {
            id: 2,
            username: 'Sudha'
        }
    ]
    res.json(users);
})

// GET by id
app.get('/:id', function (req, res) {
    res.json(req.params);
})

// POST request, for adding purpose
app.post('/', (req, res) => {
    res.json(req.body);
})

// PUT request, for update purpose
app.put('/:id', (req, res) => {
    res.send(req.body);
})

// DELETE request, for delete purpose
app.delete('/:id', (req, res) => {
    res.send(req.params);
})

app.listen(port, function () {
    console.log("http://localhost:" + port);
})
