// routes/salaries.js
const express = require('express');
const router = express.Router();
const Salary = require('../models/Salary');


router.get('/', async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.json(salaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET salary
router.post('/', async (req, res) => {
  const { amount, currency } = req.body;

  // Log the incoming request body
  console.log('Request body:', req.body);

  if (!amount || !currency) {
    return res.status(400).json({ message: 'Amount and currency are required' });
  }

  try {
    const existingSalary = await Salary.findOne();

    if (existingSalary) {
      existingSalary.amount = amount;
      existingSalary.currency = currency;
      const updatedSalary = await existingSalary.save();
      res.json(updatedSalary);
    } else {
      const newSalary = new Salary({ amount, currency });
      const savedSalary = await newSalary.save();
      res.json(savedSalary);
    }
  } catch (err) {
    console.log('Error saving salary:', err.message);
    res.status(500).json({ message: 'Failed to save salary' });
  }
});

module.exports = router;
