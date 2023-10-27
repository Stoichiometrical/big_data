const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// Create a new account
router.post('/accounts', async (req, res) => {
    try {
        const { customer_id, account_number, account_type, balance, currency } = req.body;
        const newAccount = new Account({
            customer_id,
            account_number,
            account_type,
            balance,
            currency,
        });
        const account = await newAccount.save();
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: 'Error creating account' });
    }
});

// Get all accounts
router.get('/accounts', async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving accounts' });
    }
});

// Get a single account by ID
router.get('/accounts/:id', async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving account' });
    }
});

// Update an account by ID
router.put('/accounts/:id', async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        account.customer_id = req.body.customer_id || account.customer_id;
        account.account_number = req.body.account_number || account.account_number;
        account.account_type = req.body.account_type || account.account_type;
        account.balance = req.body.balance || account.balance;
        account.currency = req.body.currency || account.currency;
        const updatedAccount = await account.save();
        res.json(updatedAccount);
    } catch (error) {
        res.status(500).json({ error: 'Error updating account' });
    }
});

// Delete an account by ID
router.delete('/accounts/:id', async (req, res) => {
    try {
        const account = await Account.findByIdAndRemove(req.params.id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting account' });
    }
});

module.exports = router;
