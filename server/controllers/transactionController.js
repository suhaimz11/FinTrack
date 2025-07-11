import Transaction from '../models/Transaction.js';

// @desc Add new transaction
// @route POST /api/transactions
export const addTransaction = async (req, res) => {
  const { title, amount, type, category } = req.body;

  console.log("Incoming request body:", req.body);
  console.log("Authenticated user:", req.user);

  if (!title || !amount || !type) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const transaction = new Transaction({
      userId: req.user._id,  // use userId here
      title,
      amount,
      type,
      category
    });

    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all transactions for the user
// @route GET /api/transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 }); // use userId here
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Delete a transaction
// @route DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // use userId here for authorization check
    if (transaction.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await transaction.deleteOne();
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
