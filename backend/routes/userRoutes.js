const express = require('express');
const router = express.Router();
const { getDashboardData, checkHabit, getAnalyticsData, getHabitHistory, getDailyMission, completeDailyMission } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, getDashboardData);
router.post('/habits/check', protect, checkHabit);
router.get('/habits/history', protect, getHabitHistory);
router.get('/analytics', protect, getAnalyticsData);
router.get('/missions/today', protect, getDailyMission);


module.exports = router;
