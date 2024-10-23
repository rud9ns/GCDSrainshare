const mongoose = require('mongoose');

// 사용자 스키마
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  borrowedUmbrellas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Umbrella' }]  // 대여한 우산 목록
});

module.exports = mongoose.model('User', userSchema);
