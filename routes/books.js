const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET All Books, /api/books/
router.get('/', (req, res) => {
    Book.find().then((books) => {
        if (books.lengh !== 0) {
            res.json(books);
        } else {
            res.status(400).send('Book not found')
        }
    })
});

// GET Individual Book,  /api/books/:id
router.get('/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book)
        }
        else {
            res.status(400).send('Book not found')
        }
    })
});

// Add Book,  /api/books/
router.post('/', (req, res) => {
    const newBook = new Book({ ...req.body });
    newBook.save().then(() => {
        res.send('new book created successfully');
    }).catch(() => {
        res.status(500).send(`Internal server error`);
    })
})

//  /api/books/:id
router.delete('/:id', (req, res) => {
    Book.findOneAndDelete(req.params.id).then((book) => {
        if (book) {
            res.json(`Book Deleted Successfully`)
        }
        else {
            res.status(400).send('Book not found')
        }
    })
})

module.exports = router; // Export module in ES5
