const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// ADD INCOME / EXPENSE
router.post('/', auth, async (req, res) => {
  try {
    const { type, category, amount } = req.body;

    const transaction = new Transaction({
      user: req.user,
      type,
      category,
      amount
    });

    await transaction.save();
    res.status(201).json({ message: 'Transaction added' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET USER TRANSACTIONS
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
