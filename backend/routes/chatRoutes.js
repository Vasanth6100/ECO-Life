const express = require('express');
const router = express.Router();
const { ecoChat } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, ecoChat);

module.exports = router;
