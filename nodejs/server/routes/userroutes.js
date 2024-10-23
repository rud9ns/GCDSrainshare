const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 모든 사용자 조회
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 사용자 등록 (회원가입)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password
  });

  try {
    await newUser.save();
    res.json({ message: 'User registered successfully!', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
