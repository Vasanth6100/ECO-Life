import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Award, Flame, CheckCircle, RefreshCw, Clock } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../utils/api';

const CAT_META = {
  'Waste Reduction':    { color: '#E74C3C', bg: '#FEF2F2', emoji: '♻️' },
  'Transportation':     { color: '#2D9CDB', bg: '#EFF8FF', emoji: '🚲' },
  'Water Conservation': { color: '#16A085', bg: '#F0FFFA', emoji: '💧' },
  'Energy Saving':      { color: '#F39C12', bg: '#FFFBEB', emoji: '⚡' },
  'Green Contribution': { color: '#27AE60', bg: '#F0FFF0', emoji: '🌳' },
};

function timeAgo(date) {
  const secs = Math.floor((Date.now() - new Date(date)) / 1000);
  if (secs < 60) return 'just now';
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

const Skeleton = ({ h = '1rem', w = '100%', r = '8px' }) => (
  <div style={{ width: w, height: h, background: 'linear-gradient(90deg,#e8e8e8 25%,#f5f5f5 50%,#e8e8e8 75%)', backgroundSize: '200% 100%', borderRadius: r, animation: 'shimmer 1.4s infinite linear' }} />
);

export default function ActivityFeed() {
  const [history, setHistory]           = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats]               = useState(null);
  const [loading, setLoading]           = useState(true);
  const [unread, setUnread]             = useState(0);
  const [showNotifs, setShowNotifs]     = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const [hRes, nRes, sRes] = await Promise.all([
        api.get('/users/habits/history'),
        api.get('/notifications'),
        api.get('/user/stats'),
      ]);
      setHistory(hRes.data.history || []);
      setNotifications(nRes.data.notifications || []);
      setUnread(nRes.data.unreadCount || 0);
      setStats(sRes.data);
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, []);

  // Poll every 30s for new notifications
  useEffect(() => {
    const t = setInterval(() => {
      api.get('/notifications').then(r => { setNotifications(r.data.notifications || []); setUnread(r.data.unreadCount || 0); }).catch(() => {});
    }, 30000);
    return () => clearInterval(t);
  }, []);

  const markRead = async () => {
    await api.put('/notifications/read').catch(() => {});
    setUnread(0);
    setNotifications(n => n.map(x => ({ ...x, read: true })));
  };

  return (
    <div style={{ display: 'flex', background: '#F8F9FA', minHeight: '100vh' }}>
      <Sidebar />
      <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>

      <main style={{ flex: 1, marginLeft: 260, padding: '36px 40px', overflowY: 'auto' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a6b3c', margin: 0 }}>Activity Feed</h1>
            <p style={{ color: '#888', marginTop: 6 }}>Your real-time eco journey and impact.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={fetchAll} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#F0FFF4', color: '#27AE60', border: '1.5px solid #BBF7D0', borderRadius: 12, fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
              <RefreshCw size={15} /> Refresh
            </button>
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setShowNotifs(p => !p); if (!showNotifs) markRead(); }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: 'white', border: '1.5px solid #E5E7EB', borderRadius: 12, fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', position: 'relative' }}>
                <Bell size={16} /> Notifications
                {unread > 0 && <span style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, background: '#EF4444', borderRadius: '50%', fontSize: '0.65rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>{unread}</span>}
              </button>

              <AnimatePresence>
                {showNotifs && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    style={{ position: 'absolute', top: '110%', right: 0, width: 320, background: 'white', borderRadius: 16, boxShadow: '0 12px 40px rgba(0,0,0,0.15)', zIndex: 999, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#1a1a2e' }}>Notifications</span>
                      <button onClick={markRead} style={{ fontSize: '0.75rem', color: '#27AE60', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Mark all read</button>
                    </div>
                    <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                      {notifications.length === 0 ? (
                        <div style={{ padding: '24px', textAlign: 'center', color: '#888', fontSize: '0.85rem' }}>🌱 No notifications yet. Complete a habit!</div>
                      ) : notifications.map((n, i) => (
                        <div key={i} style={{ padding: '14px 20px', background: n.read ? 'white' : '#F0FFF4', borderBottom: '1px solid #F9F9F9', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '1.3rem' }}>{n.icon}</span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1a1a2e' }}>{n.title}</div>
                            <div style={{ fontSize: '0.78rem', color: '#888', marginTop: 2 }}>{n.message}</div>
                            <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: 4 }}>{timeAgo(n.createdAt)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Stats row */}
        {!loading && stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Streak', value: `${stats.streakDays} days`, icon: '🔥', color: '#EF4444', bg: '#FEF2F2' },
              { label: 'Eco XP',  value: stats.xp?.toLocaleString(), icon: '⚡', color: '#F39C12', bg: '#FFFBEB' },
              { label: 'CO₂ Saved', value: `${(stats.co2Saved||0).toFixed(1)}kg`, icon: '🌍', color: '#2D9CDB', bg: '#EFF8FF' },
              { label: 'Activities', value: history.length, icon: '✅', color: '#27AE60', bg: '#F0FFF4' },
            ].map(s => (
              <div key={s.label} style={{ background: s.bg, borderRadius: 16, padding: '20px', display: 'flex', gap: 14, alignItems: 'center' }}>
                <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {loading ? (
            Array(5).fill(0).map((_, i) => <Skeleton key={i} h="100px" r="16px" />)
          ) : history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '4rem', marginBottom: 16 }}>🌱</div>
              <h3 style={{ color: '#1a6b3c', marginBottom: 8 }}>No activities yet!</h3>
              <p style={{ color: '#888', maxWidth: 300, margin: '0 auto' }}>Head to the Dashboard and complete your first eco habit to see it appear here.</p>
            </div>
          ) : (
            history.map((log, i) => {
              const cat = log.habit?.category || 'Green Contribution';
              const meta = CAT_META[cat] || { color: '#27AE60', bg: '#F0FFF4', emoji: '🌱' };
              return (
                <motion.div key={log._id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  style={{ background: 'white', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', gap: 16, alignItems: 'center', borderLeft: `4px solid ${meta.color}` }}>
                  <div style={{ width: 48, height: 48, background: meta.bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                    {log.habit?.icon || meta.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <CheckCircle size={15} color={meta.color} />
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a2e' }}>{log.habit?.name || 'Eco Habit'}</span>
                      <span style={{ fontSize: '0.7rem', background: `${meta.color}18`, color: meta.color, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{cat}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', background: '#FFF3CD', color: '#856404', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>+{log.xpEarned} XP</span>
                      {log.co2Saved > 0 && <span style={{ fontSize: '0.75rem', background: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>-{log.co2Saved}kg CO₂</span>}
                      {log.waterSaved > 0 && <span style={{ fontSize: '0.75rem', background: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>💧{log.waterSaved}L</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#888', fontSize: '0.78rem', flexShrink: 0 }}>
                    <Clock size={13} /> {timeAgo(log.dateCompleted)}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
