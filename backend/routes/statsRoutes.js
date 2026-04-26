const express = require('express');
const router = express.Router();
const { getUserStats, updateProfile, uploadAvatar, changePassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/stats',     protect, getUserStats);
router.put('/update',    protect, updateProfile);
router.put('/password',  protect, changePassword);
router.post('/avatar',   protect, upload.single('avatar'), uploadAvatar);

module.exports = router;
