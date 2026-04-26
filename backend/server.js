const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Handle uncaught exceptions before anything else
process.on('uncaughtException', (err) => {
  console.error('CRITICAL: Uncaught Exception:', err);
  process.exit(1);
});

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const app = express();

// Trust proxy for deployment (Render, etc.)
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Request Logging
app.use(morgan('dev'));

const allowedOrigins = [
  'http://localhost:5173',
  'https://eco-life-xi.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

// Limit payload size for security
app.use(express.json({ limit: '10kb' }));

// Serve uploaded avatars as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.use('/api/auth',          require('./routes/authRoutes'));
app.use('/api/habits',        require('./routes/habitRoutes'));
app.use('/api/user',          require('./routes/statsRoutes'));
app.use('/api/users',         require('./routes/userRoutes'));
app.use('/api/badges',        require('./routes/badgeRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/chat',          require('./routes/chatRoutes'));

app.get('/', (req, res) => res.send('EcoLife API is running...'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('CRITICAL: Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('🌱 Shutting down gracefully...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
