const mongoose = require('mongoose');
const express = require('express');
const app = express();
const customerRoutes = require('./controllers/customerController')

// MongoDB connection URI
const mongoURI = 'mongodb+srv://dgondo:12345@cluster0.o9rv6ga.mongodb.net/?retryWrites=true&w=majority';

// Connect to the MongoDB database
mongoose.connect(mongoURI);

app.use('',customerRoutes)


// Connection events
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Import your models
const Account = require('./models/Account');
const Transaction = require('./models/Transaction');
const Customer = require('./models/Customer');
const Employee = require('./models/Employee');
const ExchangeRate = require('./models/Exchange');



// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
