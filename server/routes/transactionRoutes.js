import express from 'express';
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction  // import update controller
} from '../controllers/transactionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, addTransaction)
  .get(protect, getTransactions);

router.route('/:id')
  .put(protect, updateTransaction)    // <-- Added PUT route here
  .delete(protect, deleteTransaction);

export default router;
