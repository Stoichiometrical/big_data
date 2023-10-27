
const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
    currency_pair: { type: String, required: true },
    rate: { type: Number, required: true },
    last_updated: { type: Date, default: Date.now },
});

const ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema);

module.exports = ExchangeRate;
