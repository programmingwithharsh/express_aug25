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

// Add new Product
router.post('/', (req, res) => {
    const newProduct = new Product({ ...req.body });
    newProduct.save().then(() => {
        res.json({ message: `Product created successfully`, data: newProduct })
    }).catch((error) => {
        res.status(500).json({ message: `Error creating Product`, error: error.message })
    })
})
// Delete Product based on id
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).then((product) => {
        if (product) {
            res.json({ message: 'Product deleted Successfully' });
        } else {
            res.status(400).send(`Product not found`);
        }
    })
})
// Update product based on id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Object Destructuring
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            new: true, // return updated document intead of original
            runValidators: true // schmea validators are applied during update
        })

        if (!updatedProduct) {
            res.status(400).send({ message: `Product not found` });
        }
        res.json({ message: 'Product Updated Successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: `Error Updating Product`, error: error.message });
    }
})

module.exports = router;