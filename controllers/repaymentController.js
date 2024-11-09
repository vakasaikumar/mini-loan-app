const Repayment = require('../models/Repayment');
const Loan = require('../models/Loan');

const addRepayment = async (req, res) => {
  const { loanId, amount } = req.body;

  try {
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    if (amount < loan.amountRequired / loan.loanTerm) {
      return res.status(400).json({ error: 'Repayment amount is less than the scheduled amount' });
    }

    const repayment = new Repayment({
      loanId,
      repaymentDate: new Date(),
      amount
    });

    await repayment.save();

    // Update loan status if all repayments are made
    const repayments = await Repayment.find({ loanId });
    if (repayments.length === loan.loanTerm) {
      loan.status = 'PAID';
      await loan.save();
    }

    res.status(201).json({ repayment });
  } catch (error) {
    res.status(500).json({ error: 'Error adding repayment' });
  }
};

module.exports = { addRepayment };
