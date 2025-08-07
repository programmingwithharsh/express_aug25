const express = require('express');
require('../db/db');

const Book = require('./Book');
const app = express();
const port = 3000;
app.use(express.json());

// GET All Books
app.get('/books', (req, res) => {
    Book.find().then((books) => {
        if (books.lengh !== 0) {
            res.json(books);
        } else {
            res.status(400).send('Book not found')
        }
    })
});

// GET Individual Book
app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book)
        }
        else {
            res.status(400).send('Book not found')
        }
    })
});

// Add Book
app.post('/book', (req, res) => {
    const newBook = new Book({ ...req.body });
    newBook.save().then(() => {
        res.send('new book created successfully');
    }).catch(() => {
        res.status(500).send(`Internal server error`);
    })
})

app.listen(port, () => {
    console.log(`Book Application is listening on port ${port} `);
})