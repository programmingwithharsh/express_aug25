const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// To get all products
router.get('/', (req, res) => {
    Product.find().then((products) => {
        if (products.length != 0) {
            res.json(products);
        } else {
            res.status(400).send('Product not found');
        }
    })
})

// To get individual Product
router.get('/:id', (req, res) => {
    Product.findById(req.params.id).then((product) => {
        if (product) {
            res.json(product);
        } else {
            res.status(400).send('Product not found');
        }
    })
})

router.post('/', (req, res) => {
    const newProduct = new Product({ ...req.body });
    newProduct.save().then(() => {
        res.json({ message: `Product created successfully`, data: newProduct })
    }).catch((error) => {
        res.status(500).json({ message: `Error creating Product`, error: error.message })
    })
})

module.exports = router;