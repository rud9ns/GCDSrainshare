const express = require('express');
const router = express.Router();
const Umbrella = require('../models/umbrella');

// 모든 우산 조회 (대여 가능 여부 확인)
router.get('/', async (req, res) => {
  try {
    const umbrellas = await Umbrella.find();
    res.json(umbrellas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 우산 대여 요청
router.post('/borrow/:id', async (req, res) => {
  const { id } = req.params;  // 우산 ID
  const { borrower } = req.body;  // 대여자 정보

  try {
    const umbrella = await Umbrella.findOne({ umbrellaId: id });
    if (umbrella && umbrella.isAvailable) {
      umbrella.isAvailable = false;
      umbrella.borrower = borrower;
      umbrella.borrowDate = new Date();
      await umbrella.save();
      res.json({ message: 'Umbrella borrowed successfully!', umbrella });
    } else {
      res.status(400).json({ message: 'Umbrella is not available for borrowing.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 우산 반납 요청
router.post('/return/:id', async (req, res) => {
  const { id } = req.params;  // 우산 ID

  try {
    const umbrella = await Umbrella.findOne({ umbrellaId: id });
    if (umbrella && !umbrella.isAvailable) {
      umbrella.isAvailable = true;
      umbrella.returnDate = new Date();
      await umbrella.save();
      res.json({ message: 'Umbrella returned successfully!', umbrella });
    } else {
      res.status(400).json({ message: 'Umbrella is not currently borrowed.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
