const express = require('express');
const router = express.Router();
const { getAllHabits, completeHabit } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/habits  — all habits with today's completion status
router.get('/', protect, getAllHabits);

// POST /api/habits/complete  — mark a habit done
router.post('/complete', protect, completeHabit);

module.exports = router;
