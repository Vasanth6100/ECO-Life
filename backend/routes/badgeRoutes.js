const express = require('express');
const router = express.Router();
const { getBadges } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getBadges);

module.exports = router;
