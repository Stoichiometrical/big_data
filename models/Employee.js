const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employee_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    contact_information: { type: String },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
