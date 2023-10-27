// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customer_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
