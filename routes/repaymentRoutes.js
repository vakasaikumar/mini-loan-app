const express = require('express');
const { addRepayment } = require('../controllers/repaymentController');
const router = express.Router();

router.post('/repayment', addRepayment);

module.exports = router;
