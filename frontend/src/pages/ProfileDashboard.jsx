import React, { useState, useEffect, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, TrendingUp, Calendar, Award, Droplets, Zap, LogOut,
  Leaf, CheckCircle, Circle, ChevronDown, ChevronUp
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/* ───── Skeleton ───── */
const Skeleton = ({ w = '100%', h = '1rem', r = '8px' }) => (
  <div style={{
    width: w, height: h,
    background: 'linear-gradient(90deg,#e8e8e8 25%,#f5f5f5 50%,#e8e8e8 75%)',
    backgroundSize: '200% 100%', borderRadius: r,
    animation: 'shimmer 1.4s infinite linear'
  }} />
);

/* ───── Category colour map ───── */
const CAT_META = {
  'Waste Reduction':    { color: '#E74C3C', bg: '#FEF2F2', emoji: '♻️' },
  'Transportation':     { color: '#2D9CDB', bg: '#EFF8FF', emoji: '🚲' },
  'Water Conservation': { color: '#16A085', bg: '#F0FFF4', emoji: '💧' },
  'Energy Saving':      { color: '#F39C12', bg: '#FFFBEB', emoji: '⚡' },
  'Green Contribution': { color: '#27AE60', bg: '#F0FFF0', emoji: '🌳' },
};

/* ───── Stat card ───── */
const StatCard = ({ icon, label, value, unit, color, bg, loading }) => (
  <motion.div whileHover={{ y: -4 }} style={{
    background: bg, borderRadius: '20px', padding: '28px',
    display: 'flex', flexDirection: 'column', gap: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden'
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: '14px', background: color + '22',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color
    }}>{icon}</div>
    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    {loading
      ? <Skeleton h="2rem" w="100px" />
      : <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: '2rem', fontWeight: 800, color }}>{typeof value === 'number' ? value.toFixed(value < 10 ? 2 : 0) : value}</span>
          <span style={{ fontSize: '0.85rem', color: '#888' }}>{unit}</span>
        </div>
    }
  </motion.div>
);

/* ───── Habit Card ───── */
const HabitCard = ({ habit, onCheck, isChecking }) => {
  const meta = CAT_META[habit.category] || { color: '#27AE60', bg: '#F0FFF0', emoji: '🌱' };
  const done = habit.completedToday;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={done ? {} : { y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
      style={{
        background: done ? meta.bg : '#fff',
        border: `2px solid ${done ? meta.color : '#F0F0F0'}`,
        borderRadius: '20px', padding: '20px',
        display: 'flex', flexDirection: 'column', gap: '14px',
        transition: 'border 0.3s, background 0.3s',
        opacity: done ? 0.85 : 1
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '12px',
          background: meta.color + '18',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem'
        }}>{habit.icon}</div>
        <span style={{
          fontSize: '0.65rem', fontWeight: 700,
          color: meta.color, background: meta.color + '18',
          padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase'
        }}>{habit.category}</span>
      </div>

      {/* Name & desc */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4, color: '#1a1a2e' }}>{habit.name}</div>
        <div style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.5 }}>{habit.desc}</div>
      </div>

      {/* Rewards row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.7rem', background: '#FFF3CD', color: '#856404', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }}>+{habit.xpReward} XP</span>
        {habit.co2Saved > 0 && <span style={{ fontSize: '0.7rem', background: '#D1FAE5', color: '#065F46', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }}>-{habit.co2Saved}kg CO₂</span>}
        {habit.waterSaved > 0 && <span style={{ fontSize: '0.7rem', background: '#DBEAFE', color: '#1E40AF', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }}>💧{habit.waterSaved}L</span>}
        {habit.treesPlanted > 0 && <span style={{ fontSize: '0.7rem', background: '#D1FAE5', color: '#065F46', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }}>🌳×{habit.treesPlanted}</span>}
      </div>

      {/* Button */}
      <button
        onClick={() => !done && !isChecking && onCheck(habit._id)}
        disabled={done || isChecking}
        style={{
          width: '100%', padding: '10px',
          background: done ? meta.color : `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`,
          color: 'white', border: 'none', borderRadius: '12px',
          fontWeight: 700, fontSize: '0.85rem',
          cursor: done ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'opacity 0.2s',
          opacity: isChecking ? 0.7 : 1
        }}
      >
        {done ? <><CheckCircle size={16} /> Completed Today</> : isChecking ? 'Saving…' : <><Circle size={16} /> Mark Done</>}
      </button>
    </motion.div>
  );
};

/* ═══════════════════════════════
   MAIN COMPONENT
═══════════════════════════════ */
export default function ProfileDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats]           = useState(null);
  const [habits, setHabits]         = useState([]);
  const [mission, setMission]       = useState(null);
  const [history, setHistory]       = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  const [loadingStats, setLoadingStats]   = useState(true);
  const [loadingHabits, setLoadingHabits] = useState(true);
  const [checkingId, setCheckingId]       = useState(null);
  const [error, setError]                 = useState('');
  const [expandedCat, setExpandedCat]     = useState(null);

  /* ── fetch helpers ── */
  const fetchStats = useCallback(async () => {
    try {
      setLoadingStats(true);
      const res = await api.get('/user/stats');
      setStats(res.data);
    } catch { setError('Could not load stats.'); }
    finally { setLoadingStats(false); }
  }, []);

  const fetchHabits = useCallback(async () => {
    try {
      setLoadingHabits(true);
      const res = await api.get('/habits');
      setHabits(res.data.habits);
    } catch { setError('Could not load habits.'); }
    finally { setLoadingHabits(false); }
  }, []);

  const fetchMission = useCallback(async () => {
    try {
      const res = await api.get('/users/missions/today');
      setMission(res.data.mission);
    } catch {}
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await api.get('/users/habits/history');
      const hist = res.data.history || [];
      setHistory(hist);

      // Build last-7-days bar chart
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const rows = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const count = hist.filter(h => new Date(h.dateCompleted).toDateString() === d.toDateString()).length;
        rows.push({ label: days[d.getDay()], count, date: d });
      }
      setWeeklyData(rows);
    } catch {}
  }, []);

  /* ── initial load ── */
  useEffect(() => {
    fetchStats();
    fetchHabits();
    fetchMission();
    fetchHistory();
  }, []);

  /* ── check habit ── */
  const handleCheck = async (habitId) => {
    setCheckingId(habitId);
    // Optimistic: mark done immediately
    setHabits(prev => prev.map(h => h._id === habitId ? { ...h, completedToday: true } : h));
    try {
      const res = await api.post('/habits/complete', { habitId });
      // Update stats live from response
      setStats(prev => ({ ...prev, ...res.data.stats }));
      fetchMission(); // refresh mission progress
    } catch (err) {
      // Rollback
      setHabits(prev => prev.map(h => h._id === habitId ? { ...h, completedToday: false } : h));
      setError(err.response?.data?.message || 'Failed to complete habit.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setCheckingId(null);
    }
  };

  /* ── logout ── */
  const handleLogout = () => { logout(); navigate('/login'); };

  /* ── group habits by category ── */
  const grouped = habits.reduce((acc, h) => {
    acc[h.category] = acc[h.category] || [];
    acc[h.category].push(h);
    return acc;
  }, {});
  const categories = Object.keys(grouped);

  /* ── calendar active days ── */
  const activeDays = [...new Set(history.map(h => new Date(h.dateCompleted).getDate()))];
  const maxWeekly  = Math.max(...weeklyData.map(d => d.count), 1);

  return (
    <div style={{ display: 'flex', background: '#F8F9FA', minHeight: '100vh' }}>
      <Sidebar />

      <style>{`
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @media(max-width:900px){ .dash-main{ margin-left:0!important; padding:20px!important; } }
      `}</style>

      <main className="dash-main" style={{ flex: 1, marginLeft: 280, padding: '36px 40px', overflowY: 'auto' }}>

        {/* ── Header ── */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1a6b3c', margin: 0 }}>Eco Dashboard</h1>
            {loadingStats
              ? <Skeleton h="0.9rem" w="240px" />
              : <p style={{ color: '#666', margin: '6px 0 0', fontSize: '0.95rem' }}>
                  Welcome back, <strong>{stats?.name}</strong>! {stats?.todayCompleted} habit{stats?.todayCompleted !== 1 ? 's' : ''} done today 🌱
                </p>
            }
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {/* Streak badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFF3CD', border: '1.5px solid #F59E0B', borderRadius: 50, padding: '8px 18px' }}>
              <Flame size={18} color="#EF4444" />
              {loadingStats ? <Skeleton w="60px" h="1rem" /> : <span style={{ fontWeight: 700, color: '#92400E', fontSize: '0.9rem' }}>{stats?.streakDays ?? 0} Day Streak</span>}
            </div>
            {/* Avatar - Clickable to Settings */}
            <div 
              onClick={() => navigate('/settings')}
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '4px 8px', borderRadius: '12px', transition: 'all 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(39,174,96,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <img
                src={stats?.avatar
                  ? (stats.avatar.startsWith('/uploads') ? `http://localhost:5000${stats.avatar}` : stats.avatar)
                  : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'eco'}`}
                alt="avatar"
                style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #27AE60', objectFit: 'cover', background: '#F0FFF4' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1a2e' }}>{user?.name}</div>
                {loadingStats ? <Skeleton w="60px" h="0.75rem" /> : <div style={{ fontSize: '0.75rem', color: '#888' }}>{stats?.xp?.toLocaleString()} XP</div>}
              </div>
            </div>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* ── Error banner ── */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ background: '#FEE2E2', color: '#B91C1C', padding: '12px 20px', borderRadius: 12, marginBottom: 24, fontWeight: 600 }}>
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stats grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 36 }}>
          <StatCard icon={<Zap size={22} />}     label="CO₂ Saved"       value={stats?.co2Saved}     unit="kg"    color="#2D9CDB" bg="#EFF8FF" loading={loadingStats} />
          <StatCard icon={<Droplets size={22} />} label="Water Saved"     value={stats?.waterSaved}   unit="liters" color="#16A085" bg="#F0FFFA" loading={loadingStats} />
          <StatCard icon={<Leaf size={22} />}     label="Trees Planted"   value={stats?.treesPlanted} unit=""      color="#27AE60" bg="#F0FFF0" loading={loadingStats} />
          <StatCard icon={<Award size={22} />}    label="Eco Points (XP)" value={stats?.xp}           unit=""      color="#F39C12" bg="#FFFBEB" loading={loadingStats} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28 }}>

          {/* ────── LEFT COLUMN ────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Garden Progress */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1a1a2e' }}>🌿 Garden Progress</h3>
                {loadingStats ? <Skeleton w="60px" h="1rem" /> : <strong style={{ color: '#27AE60' }}>{stats?.gardenProgress?.toFixed(1)}%</strong>}
              </div>
              <div style={{ height: 14, background: '#F0F0F0', borderRadius: 20, overflow: 'hidden' }}>
                {!loadingStats && (
                  <motion.div initial={{ width: 0 }} animate={{ width: `${stats?.gardenProgress || 0}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{ height: '100%', background: 'linear-gradient(90deg,#27AE60,#2ECC71)', borderRadius: 20 }} />
                )}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#888', marginTop: 8 }}>
                {stats?.todayCompleted} / {stats?.totalHabits} habits completed — keep going! 🌱
              </div>
            </div>

            {/* Habits by Category */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '1.1rem', color: '#1a1a2e' }}>Today's Eco Habits</h3>

              {loadingHabits ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[...Array(6)].map((_, i) => <Skeleton key={i} h="160px" r="20px" />)}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {categories.map(cat => {
                    const meta = CAT_META[cat] || {};
                    const isOpen = expandedCat === cat || expandedCat === null;
                    const catHabits = grouped[cat];
                    const doneCount = catHabits.filter(h => h.completedToday).length;

                    return (
                      <div key={cat} style={{ border: `1.5px solid ${meta.color}33`, borderRadius: 16, overflow: 'hidden' }}>
                        {/* Category Header */}
                        <button
                          onClick={() => setExpandedCat(prev => prev === cat ? null : cat)}
                          style={{ width: '100%', padding: '14px 20px', background: meta.bg, border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                          <span style={{ fontWeight: 700, color: meta.color, fontSize: '0.9rem' }}>
                            {meta.emoji} {cat}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: '0.75rem', color: '#666' }}>{doneCount}/{catHabits.length} done</span>
                            {expandedCat === cat ? <ChevronUp size={16} color={meta.color} /> : <ChevronDown size={16} color={meta.color} />}
                          </div>
                        </button>

                        {/* Habits Grid */}
                        <AnimatePresence>
                          {(expandedCat === cat || expandedCat === null) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14, padding: 16, background: '#FAFAFA' }}>
                                {catHabits.map(habit => (
                                  <HabitCard
                                    key={habit._id}
                                    habit={habit}
                                    onCheck={handleCheck}
                                    isChecking={checkingId === habit._id}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ────── RIGHT COLUMN ────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Weekly Activity Chart */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={18} color="#27AE60" /> Weekly Activity
              </h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
                {weeklyData.map((d, i) => {
                  const pct = (d.count / maxWeekly) * 100;
                  const isToday = d.date.toDateString() === new Date().toDateString();
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div title={`${d.count} habit${d.count !== 1 ? 's' : ''}`} style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'flex-end' }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max(pct, d.count > 0 ? 8 : 4)}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                          style={{
                            width: '100%', borderRadius: '6px 6px 0 0',
                            background: isToday ? '#27AE60' : d.count > 0 ? '#86EFAC' : '#E5E7EB',
                            minHeight: 4
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.65rem', fontWeight: isToday ? 700 : 400, color: isToday ? '#27AE60' : '#888' }}>{d.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily Mission */}
            <div style={{ background: 'linear-gradient(135deg,#F59E0B,#EF4444)', borderRadius: 20, padding: 24, color: 'white', boxShadow: '0 4px 20px rgba(239,68,68,0.25)' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '1rem' }}>🎯 {mission?.title || 'Daily Eco Mission'}</h3>
              {mission
                ? <p style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 16px', opacity: 0.92 }}>{mission.task}</p>
                : <Skeleton h="0.85rem" />
              }
              {/* Progress */}
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, height: 8, marginBottom: 12, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mission ? (Math.min(mission.currentProgress, mission.target) / mission.target) * 100 : 0}%` }}
                  transition={{ duration: 0.8 }}
                  style={{ height: '100%', background: 'white', borderRadius: 20 }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                  {mission ? `${Math.min(mission.currentProgress, mission.target)} / ${mission.target} completed` : '— / —'}
                </span>
                {mission?.completed && (
                  <span style={{ background: 'white', color: '#EF4444', padding: '6px 14px', borderRadius: 20, fontWeight: 700, fontSize: '0.8rem' }}>✓ Done!</span>
                )}
              </div>
            </div>

            {/* Activity Calendar */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={18} color="#27AE60" /> Activity Calendar
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5 }}>
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} style={{ textAlign: 'center', fontSize: '0.6rem', color: '#888', fontWeight: 700, paddingBottom: 4 }}>{d}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => {
                  const active = activeDays.includes(i + 1);
                  return (
                    <div key={i} title={active ? `Day ${i + 1}: habit done` : ''} style={{
                      aspectRatio: '1',
                      background: active ? '#27AE60' : '#F3F4F6',
                      borderRadius: 4,
                      fontSize: '0.6rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: active ? 'white' : '#9CA3AF',
                      fontWeight: active ? 700 : 400,
                      transition: 'background 0.3s'
                    }}>{i + 1}</div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: '0.7rem', color: '#888' }}>
                <div style={{ width: 12, height: 12, background: '#27AE60', borderRadius: 3 }} /> Habit completed
                <div style={{ width: 12, height: 12, background: '#F3F4F6', borderRadius: 3, border: '1px solid #E5E7EB' }} /> No activity
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
