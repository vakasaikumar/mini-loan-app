const express = require('express');
const { createLoan, approveLoan } = require('../controllers/loanController');
const router = express.Router();

router.post('/loan', createLoan);
router.put('/loan/:loanId/approve', approveLoan);

module.exports = router;
