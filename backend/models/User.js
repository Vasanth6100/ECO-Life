const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a name'] },
  email: { type: String, required: [true, 'Please add an email'], unique: true },
  password: { type: String, required: [true, 'Please add a password'] },
  guardian: { type: String, required: [true, 'Please select a guardian'] }, // bear, beetle, plant, owl
  avatar: { type: String, default: '' },        // profile picture filename
  bio: { type: String, default: '' },
  xp: { type: Number, default: 0 },
  streakDays: { type: Number, default: 0 },
  gardenProgress: { type: Number, default: 0 },
  co2Saved: { type: Number, default: 0 },       // cumulative kg
  waterSaved: { type: Number, default: 0 },     // cumulative liters
  treesPlanted: { type: Number, default: 0 },   // count
  badges: [{ type: String }],
  lastLoginDate: { type: String, default: '' },
  lastStreakDate: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
