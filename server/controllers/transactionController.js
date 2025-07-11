const Transaction = require('../models/Transaction');

// POST /api/transactions
const addTransaction = async (req, res) => {
  const { title, amount, type, category } = req.body;

  if (!title || !amount || !type) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const transaction = new Transaction({
    user: req.user._id,
    title,
    amount,
    type,
    category
  });

  const saved = await transaction.save();
  res.status(201).json(saved);
};

// GET /api/transactions
const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
  res.json(transactions);
};

// DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

  if (transaction.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await transaction.remove();
  res.json({ message: 'Transaction deleted' });
};

module.exports = { addTransaction, getTransactions, deleteTransaction };
