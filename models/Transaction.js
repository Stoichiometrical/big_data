
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sender_account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    receiver_account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    transaction_type: { type: String, required: true, enum: ['Deposit', 'Withdrawal', 'Transfer'] },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
