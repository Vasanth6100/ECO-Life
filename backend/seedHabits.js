const mongoose = require('mongoose');
const Habit = require('./models/Habit');
require('dotenv').config();

const habits = [
  // Waste Reduction
  { name: 'Avoid Single-Use Plastic', desc: 'Skip plastic straws, bags, and packaging today', category: 'Waste Reduction', icon: '🚫🧴', color: '#E74C3C', xpReward: 20, co2Saved: 0.5, waterSaved: 0, treesPlanted: 0 },
  { name: 'Use Reusable Bags', desc: 'Carry cloth or jute bags for shopping', category: 'Waste Reduction', icon: '🛍️', color: '#C0392B', xpReward: 15, co2Saved: 0.3, waterSaved: 0, treesPlanted: 0 },
  { name: 'Carry Reusable Bottle', desc: 'Use your own bottle, skip buying water bottles', category: 'Waste Reduction', icon: '💧🍶', color: '#E67E22', xpReward: 15, co2Saved: 0.2, waterSaved: 2, treesPlanted: 0 },

  // Transportation
  { name: 'Cycling Instead of Driving', desc: 'Commute by bike for any trip today', category: 'Transportation', icon: '🚲', color: '#2D9CDB', xpReward: 35, co2Saved: 2.3, waterSaved: 0, treesPlanted: 0 },
  { name: 'Walk Short Distances', desc: 'Walk instead of taking a vehicle for trips under 2km', category: 'Transportation', icon: '🚶', color: '#1A78C2', xpReward: 20, co2Saved: 1.0, waterSaved: 0, treesPlanted: 0 },
  { name: 'Use Public Transport', desc: 'Take the bus or train instead of a private vehicle', category: 'Transportation', icon: '🚌', color: '#2980B9', xpReward: 25, co2Saved: 1.5, waterSaved: 0, treesPlanted: 0 },

  // Water Conservation
  { name: 'Take a Short Shower', desc: 'Keep your shower under 5 minutes', category: 'Water Conservation', icon: '🚿', color: '#27AE60', xpReward: 15, co2Saved: 0.1, waterSaved: 50, treesPlanted: 0 },
  { name: 'Turn Off Tap While Brushing', desc: 'Don\'t let the tap run while brushing teeth', category: 'Water Conservation', icon: '🪥', color: '#16A085', xpReward: 10, co2Saved: 0, waterSaved: 15, treesPlanted: 0 },
  { name: 'Fix Water Leaks', desc: 'Repair a dripping faucet or pipe today', category: 'Water Conservation', icon: '🔧💧', color: '#1ABC9C', xpReward: 40, co2Saved: 0, waterSaved: 100, treesPlanted: 0 },

  // Energy Saving
  { name: 'Turn Off Lights', desc: 'Switch off lights when leaving a room', category: 'Energy Saving', icon: '💡', color: '#F39C12', xpReward: 10, co2Saved: 0.4, waterSaved: 0, treesPlanted: 0 },
  { name: 'Unplug Unused Devices', desc: 'Unplug chargers, TVs, and devices not in use', category: 'Energy Saving', icon: '🔌', color: '#D35400', xpReward: 15, co2Saved: 0.6, waterSaved: 0, treesPlanted: 0 },

  // Green Contribution
  { name: 'Plant a Tree', desc: 'Plant a sapling in your garden or community', category: 'Green Contribution', icon: '🌳', color: '#2ECC71', xpReward: 60, co2Saved: 5.0, waterSaved: 0, treesPlanted: 1 },
  { name: 'Maintain Your Plants', desc: 'Water and care for your indoor or outdoor plants', category: 'Green Contribution', icon: '🪴', color: '#27AE60', xpReward: 20, co2Saved: 0.2, waterSaved: 1, treesPlanted: 0 },
];

const seedHabits = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecolife');
    console.log('MongoDB Connected...');
    // Always wipe and re-seed to get the latest data
    await Habit.deleteMany({});
    await Habit.insertMany(habits);
    console.log(`✅ ${habits.length} habits seeded successfully!`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedHabits();
