const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  amountRequired: { type: Number, required: true },
  loanTerm: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'PAID'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
