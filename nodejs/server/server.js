const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// MongoDB 연결 URL (MongoDB Atlas를 사용하거나 로컬 DB 사용)
const mongoURI = 'mongodb://localhost:27017/umbrellaRental';

// Express 서버 설정
const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(bodyParser.json());
app.use(cors());

// MongoDB 연결
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Welcome to Umbrella Rental API!');
});

// 라우트 연결
const umbrellaRoutes = require('./routes/umbrellaRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/umbrellas', umbrellaRoutes);
app.use('/api/users', userRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
