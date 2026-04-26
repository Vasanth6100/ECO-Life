const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
  dateCompleted: { type: Date, default: Date.now },
  xpEarned: { type: Number, required: true },
  co2Saved: { type: Number, default: 0 },
  waterSaved: { type: Number, default: 0 },
  treesPlanted: { type: Number, default: 0 }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
