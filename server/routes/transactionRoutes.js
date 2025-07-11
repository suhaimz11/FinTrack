const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  addTransaction,
  getTransactions,
  deleteTransaction
} = require('../controllers/transactionController');

router.route('/')
  .post(protect, addTransaction)
  .get(protect, getTransactions);

router.route('/:id')
  .delete(protect, deleteTransaction);

module.exports = router;
