const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
  repaymentDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' }
});

const Repayment = mongoose.model('Repayment', repaymentSchema);
module.exports = Repayment;
