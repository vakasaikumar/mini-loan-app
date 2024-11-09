const Loan = require('../models/Loan');

const approveLoan = async (req, res) => {
  const { loanId } = req.params;

  try {
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    loan.status = 'APPROVED';
    await loan.save();

    res.status(200).json({ loan });
  } catch (error) {
    res.status(500).json({ error: 'Error approving loan' });
  }
};

module.exports = { approveLoan };
