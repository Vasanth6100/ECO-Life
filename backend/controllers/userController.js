const User = require('../models/User');
const Habit = require('../models/Habit');
const ActivityLog = require('../models/ActivityLog');
const Notification = require('../models/Notification');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const todayStr = () => new Date().toISOString().split('T')[0];

// ── GET /api/habits ─────────────────────────────────────────────────────────
const getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ category: 1, name: 1 });
    const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
    const completedToday = await ActivityLog.find({ user: req.user.id, dateCompleted: { $gte: startOfDay } }).select('habit');
    const completedIds = completedToday.map(l => l.habit.toString());
    const habitsWithStatus = habits.map(h => ({ ...h.toObject(), completedToday: completedIds.includes(h._id.toString()) }));
    res.json({ habits: habitsWithStatus });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── POST /api/habits/complete ────────────────────────────────────────────────
const completeHabit = async (req, res) => {
  try {
    const { habitId } = req.body;
    if (!habitId) return res.status(400).json({ message: 'habitId required' });
    const habit = await Habit.findById(habitId);
    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
    const alreadyDone = await ActivityLog.findOne({ user: req.user.id, habit: habitId, dateCompleted: { $gte: startOfDay } });
    if (alreadyDone) return res.status(400).json({ message: 'Already completed today!' });

    await ActivityLog.create({ user: req.user.id, habit: habitId, xpEarned: habit.xpReward, co2Saved: habit.co2Saved, waterSaved: habit.waterSaved, treesPlanted: habit.treesPlanted });

    const user = await User.findById(req.user.id);
    user.xp += habit.xpReward;
    user.co2Saved = (user.co2Saved || 0) + habit.co2Saved;
    user.waterSaved = (user.waterSaved || 0) + habit.waterSaved;
    user.treesPlanted = (user.treesPlanted || 0) + habit.treesPlanted;

    const today = todayStr();
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    if (user.lastStreakDate === yesterdayStr) user.streakDays += 1;
    else if (user.lastStreakDate !== today) user.streakDays = 1;
    user.lastStreakDate = today;

    const todayCount = await ActivityLog.countDocuments({ user: req.user.id, dateCompleted: { $gte: startOfDay } });
    if (todayCount === 5) {
      user.xp += 500;
      if (!user.badges.includes('Ocean Guardian')) {
        user.badges.push('Ocean Guardian');
        await Notification.create({ user: user._id, type: 'badge', title: 'Badge Unlocked!', message: 'You earned the Ocean Guardian badge for completing 5 habits!', icon: '🏅' });
      }
    }
    if (user.streakDays === 7 && !user.badges.includes('Week Warrior')) {
      user.badges.push('Week Warrior');
      await Notification.create({ user: user._id, type: 'badge', title: 'Badge Unlocked!', message: 'You earned the Week Warrior badge for a 7-day streak!', icon: '🔥' });
    }

    user.gardenProgress = Math.min((user.xp / 1000) * 100, 100);
    await user.save();

    await Notification.create({ user: user._id, type: 'habit', title: `✅ ${habit.name} completed!`, message: `You earned +${habit.xpReward} XP. Keep going!`, icon: habit.icon });

    res.json({ message: 'Habit completed!', stats: { xp: user.xp, streakDays: user.streakDays, co2Saved: user.co2Saved, waterSaved: user.waterSaved, treesPlanted: user.treesPlanted, gardenProgress: user.gardenProgress } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── GET /api/user/stats ──────────────────────────────────────────────────────
const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
    const todayCount = await ActivityLog.countDocuments({ user: req.user.id, dateCompleted: { $gte: startOfDay } });
    const totalHabits = await Habit.countDocuments();
    const avatarUrl = user.avatar ? `/uploads/${user.avatar}` : '';
    res.json({ name: user.name, email: user.email, bio: user.bio || '', avatar: avatarUrl, xp: user.xp, streakDays: user.streakDays, co2Saved: user.co2Saved || 0, waterSaved: user.waterSaved || 0, treesPlanted: user.treesPlanted || 0, gardenProgress: user.gardenProgress || 0, badges: user.badges, todayCompleted: todayCount, totalHabits });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── PUT /api/user/update ─────────────────────────────────────────────────────
const updateProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const user = await User.findById(req.user.id);
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio !== undefined) user.bio = bio;
    await user.save();
    res.json({ message: 'Profile updated!', name: user.name, email: user.email, bio: user.bio });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── POST /api/user/avatar ────────────────────────────────────────────────────
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const user = await User.findById(req.user.id);
    // Delete old avatar file if exists
    if (user.avatar) {
      const oldPath = path.join(__dirname, '../uploads', user.avatar);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    user.avatar = req.file.filename;
    await user.save();
    res.json({ message: 'Avatar updated!', avatar: `/uploads/${req.file.filename}` });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── PUT /api/user/password ───────────────────────────────────────────────────
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Both passwords required' });
    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: 'Current password is incorrect' });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ message: 'Password updated successfully!' });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── GET /api/badges ──────────────────────────────────────────────────────────
const ALL_BADGES = [
  { id: 'ocean_guardian', title: 'Ocean Guardian', icon: '🏅', description: 'Complete 5 habits in one day', color: '#2D9CDB', category: 'Nature' },
  { id: 'week_warrior',   title: 'Week Warrior',   icon: '🔥', description: 'Maintain a 7-day streak',      color: '#EF4444', category: 'Nature' },
  { id: 'eco_pioneer',    title: 'Eco Pioneer',    icon: '🌍', description: 'Complete your first habit',    color: '#27AE60', category: 'Nature' },
  { id: 'water_wise',     title: 'Water Wise',     icon: '💧', description: 'Save 50 liters of water',      color: '#16A085', category: 'Water' },
  { id: 'forest_guardian',title: 'Forest Guardian',icon: '🌳', description: 'Plant 3 trees',               color: '#27AE60', category: 'Nature' },
  { id: 'power_saver',    title: 'Power Saver',    icon: '⚡', description: 'Complete 10 energy habits',    color: '#F39C12', category: 'Energy' },
  { id: 'cycling_hero',   title: 'Cycling Hero',   icon: '🚲', description: 'Complete 5 transport habits',  color: '#2D9CDB', category: 'Nature' },
  { id: 'waste_warrior',  title: 'Waste Warrior',  icon: '♻️', description: 'Complete 10 waste habits',     color: '#E74C3C', category: 'Energy' },
  { id: 'co2_crusher',    title: 'CO₂ Crusher',    icon: '🌬️', description: 'Save 10kg of CO₂',            color: '#9B59B6', category: 'Energy' },
  { id: 'streak_master',  title: 'Streak Master',  icon: '🏆', description: 'Maintain a 30-day streak',     color: '#F39C12', category: 'Nature' },
];

const getBadges = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userBadgeTitles = (user.badges || []).map(b => b.toLowerCase().replace(/\s/g, '_'));
    const allLogs = await ActivityLog.find({ user: req.user.id }).populate('habit', 'category');

    const waterHabits  = allLogs.filter(l => l.habit?.category === 'Water Conservation').length;
    const energyHabits = allLogs.filter(l => l.habit?.category === 'Energy Saving').length;
    const transportHabits = allLogs.filter(l => l.habit?.category === 'Transportation').length;
    const wasteHabits  = allLogs.filter(l => l.habit?.category === 'Waste Reduction').length;

    const badges = ALL_BADGES.map(b => {
      let unlocked = userBadgeTitles.includes(b.id) || user.badges?.includes(b.title);
      // auto-unlock based on activity
      if (b.id === 'eco_pioneer'    && allLogs.length >= 1)     unlocked = true;
      if (b.id === 'water_wise'     && user.waterSaved >= 50)   unlocked = true;
      if (b.id === 'forest_guardian'&& user.treesPlanted >= 3)  unlocked = true;
      if (b.id === 'power_saver'    && energyHabits >= 10)      unlocked = true;
      if (b.id === 'cycling_hero'   && transportHabits >= 5)    unlocked = true;
      if (b.id === 'waste_warrior'  && wasteHabits >= 10)       unlocked = true;
      if (b.id === 'co2_crusher'    && user.co2Saved >= 10)     unlocked = true;
      if (b.id === 'streak_master'  && user.streakDays >= 30)   unlocked = true;
      return { ...b, unlocked, earnedDate: unlocked ? user.updatedAt : null };
    });

    res.json({ badges, unlockedCount: badges.filter(b => b.unlocked).length, totalCount: badges.length, xp: user.xp });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── GET /api/notifications ───────────────────────────────────────────────────
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(20);
    const unreadCount = await Notification.countDocuments({ user: req.user.id, read: false });
    res.json({ notifications, unreadCount });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── PUT /api/notifications/read ──────────────────────────────────────────────
const markNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id, read: false }, { read: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── GET /api/users/dashboard ─────────────────────────────────────────────────
const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentActivities = await ActivityLog.find({ user: req.user.id, dateCompleted: { $gte: oneWeekAgo } });
    const co2SavedThisWeek = recentActivities.reduce((acc, log) => acc + (log.co2Saved || 0), 0);
    res.json({ user, co2SavedThisWeek });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── GET /api/users/analytics ─────────────────────────────────────────────────
const getAnalyticsData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const topUsers = await User.find().sort({ xp: -1 }).limit(5).select('name xp');
    const allUsersCount = await User.countDocuments();
    const usersWithMoreXp = await User.countDocuments({ xp: { $gt: user.xp } });
    res.json({ leaderboard: topUsers, userRank: usersWithMoreXp + 1, totalUsers: allUsersCount, badges: user.badges });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── GET /api/users/habits/history ────────────────────────────────────────────
const getHabitHistory = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activities = await ActivityLog.find({ user: req.user.id, dateCompleted: { $gte: thirtyDaysAgo } }).populate('habit', 'name category icon color co2Saved waterSaved xpReward').sort({ dateCompleted: -1 });
    res.json({ history: activities });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── GET /api/users/missions/today ────────────────────────────────────────────
const getDailyMission = async (req, res) => {
  try {
    const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
    const todayLogs = await ActivityLog.find({ user: req.user.id, dateCompleted: { $gte: startOfDay } });
    const target = 5;
    res.json({ mission: { id: 'daily_5_habits', title: 'Daily Eco Mission', task: `Complete ${target} eco habits today to earn 500 bonus XP and unlock the "Ocean Guardian" badge!`, target, currentProgress: todayLogs.length, rewardXP: 500, completed: todayLogs.length >= target } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// ── POST /api/chat ───────────────────────────────────────────────────────────
const ECO_RESPONSES = [
  { keywords: ['plastic','single.use','bottle'], response: '♻️ **Plastic-free tips:** Carry a reusable bottle and bag everywhere. Refuse straws and single-use cutlery. Buy in bulk to reduce packaging. Even small swaps make a huge difference over time!' },
  { keywords: ['carbon','co2','emission','footprint'], response: '🌍 **Reducing your carbon footprint:** The biggest impacts come from diet (less meat), transport (walk/cycle/EV), and energy at home. Your EcoLife habits already target these — great work!' },
  { keywords: ['water','shower','save','conservation'], response: '💧 **Water conservation:** Turn off the tap while brushing teeth (saves 6L/min!). Take showers under 5 minutes. Fix leaks immediately — a dripping tap wastes 15L/day. Every drop counts!' },
  { keywords: ['energy','electricity','power','light'], response: '⚡ **Energy saving:** Unplug devices on standby — they still consume power. Switch to LED bulbs (75% less energy). Wash clothes in cold water. These habits add up to real savings!' },
  { keywords: ['tree','plant','forest','garden'], response: '🌳 **Planting trees:** Trees absorb ~21kg of CO₂ per year each. Even keeping houseplants improves air quality. Check your EcoLife garden progress to track your green contribution!' },
  { keywords: ['cycle','bike','walk','transport','car'], response: '🚲 **Green transport:** Cycling or walking instead of driving even once a week saves significant CO₂. Public transport is 4x more energy-efficient than solo car travel. Keep it up!' },
  { keywords: ['streak','xp','points','badge','level'], response: '🏆 **EcoLife progress:** Complete habits daily to build your streak! You earn XP for every habit. Reach milestones to unlock badges. A 7-day streak earns the Week Warrior badge!' },
  { keywords: ['habit','daily','routine','complete','check'], response: '🌱 **Building eco habits:** Consistency is key! Mark off habits each day in your dashboard. Start with just 2–3 habits and build up. Your streak motivates you to keep going!' },
  { keywords: ['food','diet','vegan','meat','vegetarian'], response: '🥗 **Eco-friendly diet:** Reducing meat consumption is one of the single biggest impacts — even one meat-free day per week saves 8 lbs of CO₂. Try plant-based swaps gradually!' },
  { keywords: ['compost','waste','recycle','rubbish','trash'], response: '♻️ **Waste management:** Compost food scraps — they make up 30% of household waste. Recycle properly (clean and dry items). The best waste is no waste: buy only what you need!' },
];

const DEFAULT_RESPONSES = [
  '🌿 Great question! EcoLife helps you build daily eco-habits that make a real difference. Try asking about: plastic, water saving, energy, transport, trees, or your progress!',
  '🌱 I\'m your EcoLife assistant! Ask me about reducing plastic, saving water, cutting carbon, or how your habits help the planet.',
  '♻️ Every small action matters! I can help with eco tips on water, energy, transport, food, and waste. What would you like to know?',
];

const ecoChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: 'Please send a message!' });
    const lower = message.toLowerCase();
    
    for (const item of ECO_RESPONSES) {
      if (item.keywords.some(k => new RegExp(k).test(lower))) {
        return res.json({ reply: item.response });
      }
    }
    // Greeting
    if (/^(hi|hello|hey|hola|howdy)/.test(lower)) {
      return res.json({ reply: '👋 Hey there, eco warrior! I\'m your EcoLife assistant. Ask me anything about sustainable living, your habits, badges, or how to reduce your environmental impact!' });
    }
    // Thanks
    if (/thank|thanks|cheers/.test(lower)) {
      return res.json({ reply: '🌿 You\'re welcome! Keep up the great eco habits. Every action counts for our planet! 🌍' });
    }

    const rand = DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
    res.json({ reply: rand });
  } catch (e) { res.status(500).json({ reply: 'Sorry, something went wrong.' }); }
};

module.exports = {
  getAllHabits, completeHabit, getUserStats, updateProfile, uploadAvatar, changePassword,
  getBadges, getNotifications, markNotificationsRead,
  getDashboardData, getAnalyticsData, getHabitHistory, getDailyMission,
  ecoChat,
  checkHabit: completeHabit,
};
