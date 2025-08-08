const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// To get all products
router.get('/', (req, res) => {
    Category.find().then((categories) => {
        if (categories.length != 0) {
            res.json(categories);
        } else {
            res.status(400).send('Product not found');
        }
    })
})

// To get individual Product
router.get('/:id', (req, res) => {
    Category.findById(req.params.id).then((category) => {
        if (category) {
            res.json(category);
        } else {
            res.status(400).send('Category not found');
        }
    })
})

router.post('/', (req, res) => {
    const newPCategory = new Category({ ...req.body });
    newPCategory.save().then(() => {
        res.json({ message: `Category created successfully`, data: newPCategory })
    }).catch((error) => {
        res.status(500).json({ message: `Error creating Product`, error: error.message })
    })
})

router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).then((category) => {
        if (category) {
            res.json({ message: 'Category deleted Successfully' });
        } else {
            res.status(400).send(`Category not found`);
        }
    })
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Object Destructuring
        const updateData = req.body;
        const updatedCategory = await Product.findByIdAndUpdate(id, updateData, {
            new: true, // return updated document intead of original
            runValidators: true // schmea validators are applied during update
        })

        if (!updatedProduct) {
            res.status(400).send({ message: `Category not found` });
        }
        res.json({ message: 'Category Updated Successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: `Error Updating Category`, error: error.message });
    }
})

module.exports = router;