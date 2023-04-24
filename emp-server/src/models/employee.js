const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Age: { type: Number, required: true },
    DateOfJoining: { type: Date, required: true, default: new Date() },
    Title: { type: String, required: true },
    Department: { type: String, required: true },
    EmployeeType: { type: String, required: true },
    CurrentStatus: { type: Boolean, required: true, default: true }, // default current status set to working
    RetirementDate: { type: Date, required: false, default: null }
});

const Employee = mongoose.model('Employee', EmployeeSchema, "employees");
module.exports = Employee;