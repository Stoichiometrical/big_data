const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Create a new customer
router.post('/customers', async (req, res) => {
    try {
        const { name, email, address, account_id } = req.body;
        const newCustomer = new Customer({
            name,
            email,
            address,
            account_id,
        });
        const customer = await newCustomer.save();
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Error creating customer' ,details: error.message });
    }
});


// Create many customers
router.post('/customers/create-many', async (req, res) => {
    try {
        const customersData = req.body; // An array of customer data
        const customers = await Customer.insertMany(customersData);
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Error creating customers', details: error.message });
    }
});



// Get all customers
router.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving customers' });
    }
});

// Get a single customer by ID
router.get('/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving customer' });
    }
});

// Update a customer by ID
router.put('/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        customer.name = req.body.name || customer.name;
        customer.email = req.body.email || customer.email;
        customer.address = req.body.address || customer.address;
        customer.account_id = req.body.account_id || customer.account_id;
        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Error updating customer' });
    }
});

// Delete a customer by ID
router.delete('/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting customer' });
    }
});

module.exports = router;
