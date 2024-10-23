const mongoose = require('mongoose');

// 우산 대여 기록 스키마
const umbrellaSchema = new mongoose.Schema({
  umbrellaId: { type: String, required: true, unique: true }, // 우산 ID (QR 코드와 연동 가능)
  isAvailable: { type: Boolean, default: true },              // 대여 가능 여부
  borrower: { type: String, default: null },                  // 대여자 정보 (사용자 ID 또는 이름)
  borrowDate: { type: Date, default: null },                  // 대여일
  returnDate: { type: Date, default: null }                   // 반납일
});

module.exports = mongoose.model('Umbrella', umbrellaSchema);
