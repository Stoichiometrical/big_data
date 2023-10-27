const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Create a new transaction
router.post('/transactions', async (req, res) => {
    try {
        const { receiver_id, sender_id, transaction_amount, currency } = req.body;
        const newTransaction = new Transaction({
            receiver_id,
            sender_id,
            transaction_amount,
            currency,
            timestamp: new Date(),
        });
        const transaction = await newTransaction.save();
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Error creating transaction' });
    }
});

// Get all transactions
router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving transactions' });
    }
});

// Get a single transaction by ID
router.get('/transactions/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving transaction' });
    }
});

// Update a transaction by ID
router.put('/transactions/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        transaction.receiver_id = req.body.receiver_id || transaction.receiver_id;
        transaction.sender_id = req.body.sender_id || transaction.sender_id;
        transaction.transaction_amount = req.body.transaction_amount || transaction.transaction_amount;
        transaction.currency = req.body.currency || transaction.currency;
        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ error: 'Error updating transaction' });
    }
});

// Delete a transaction by ID
router.delete('/transactions/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndRemove(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting transaction' });
    }
});

// Create multiple transactions
router.post('/transactions/bulk', async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Invalid request format. Expecting an array of transactions.' });
        }
        const createdTransactions = await Transaction.insertMany(req.body);
        res.json(createdTransactions);
    } catch (error) {
        res.status(500).json({ error: 'Error creating transactions' });
    }
});

module.exports = router;