const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    account_number: { type: String, required: true, unique: true },
    account_type: { type: String, required: true, enum: ['Savings', 'Checking', 'Loan'] },
    balance: { type: Number, required: true, default: 0 },
    currency: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
    opened_at: { type: Date, default: Date.now },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
