const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Waste Reduction', 'Transportation', 'Water Conservation', 'Energy Saving', 'Green Contribution']
  },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  xpReward: { type: Number, required: true, default: 10 },
  co2Saved: { type: Number, default: 0 },      // kg
  waterSaved: { type: Number, default: 0 },    // liters
  treesPlanted: { type: Number, default: 0 }
});

module.exports = mongoose.model('Habit', habitSchema);
