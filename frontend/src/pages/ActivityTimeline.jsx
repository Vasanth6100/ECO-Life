import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock, Filter, RefreshCw } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../utils/api';

const CAT_META = {
  'Waste Reduction':    { color: '#E74C3C', bg: '#FEF2F2', emoji: '♻️' },
  'Transportation':     { color: '#2D9CDB', bg: '#EFF8FF', emoji: '🚲' },
  'Water Conservation': { color: '#16A085', bg: '#F0FFFA', emoji: '💧' },
  'Energy Saving':      { color: '#F39C12', bg: '#FFFBEB', emoji: '⚡' },
  'Green Contribution': { color: '#27AE60', bg: '#F0FFF0', emoji: '🌳' },
};

const TABS = ['All', 'Waste Reduction', 'Transportation', 'Water Conservation', 'Energy Saving', 'Green Contribution'];
const TAB_LABELS = { All: 'All', 'Waste Reduction': 'Waste', 'Transportation': 'Transport', 'Water Conservation': 'Water', 'Energy Saving': 'Energy', 'Green Contribution': 'Green' };

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const Skeleton = ({ h = '1rem', w = '100%', r = '8px' }) => (
  <div style={{ width: w, height: h, background: 'linear-gradient(90deg,#e8e8e8 25%,#f5f5f5 50%,#e8e8e8 75%)', backgroundSize: '200% 100%', borderRadius: r, animation: 'shimmer 1.4s infinite linear' }} />
);

export default function ActivityTimeline() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/users/habits/history');
      setHistory(res.data.history || []);
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchHistory(); }, []);

  const filtered = activeTab === 'All'
    ? history
    : history.filter(h => h.habit?.category === activeTab);

  const totalXP    = history.reduce((s, h) => s + (h.xpEarned || 0), 0);
  const totalCO2   = history.reduce((s, h) => s + (h.co2Saved || 0), 0);
  const totalWater = history.reduce((s, h) => s + (h.waterSaved || 0), 0);

  return (
    <div style={{ display: 'flex', background: '#F8F9FA', minHeight: '100vh' }}>
      <Sidebar />
      <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>

      <main style={{ flex: 1, marginLeft: 260, padding: '36px 40px', overflowY: 'auto' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a6b3c', margin: 0 }}>Activity History</h1>
            <p style={{ color: '#888', marginTop: 6 }}>Your complete eco-journey over the last 30 days.</p>
          </div>
          <button onClick={fetchHistory} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#F0FFF4', color: '#27AE60', border: '1.5px solid #BBF7D0', borderRadius: 12, fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
            <RefreshCw size={15} /> Refresh
          </button>
        </header>

        {/* Summary cards */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'Total Activities', value: history.length, icon: '✅', color: '#27AE60', bg: '#F0FFF4' },
              { label: 'Total XP Earned', value: `${totalXP.toLocaleString()} XP`, icon: '⚡', color: '#F39C12', bg: '#FFFBEB' },
              { label: 'CO₂ Avoided', value: `${totalCO2.toFixed(2)} kg`, icon: '🌍', color: '#2D9CDB', bg: '#EFF8FF' },
            ].map(s => (
              <div key={s.label} style={{ background: s.bg, borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: '2rem' }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: '9px 18px', background: activeTab === tab ? (CAT_META[tab]?.color || '#27AE60') : 'white', color: activeTab === tab ? 'white' : '#666', border: 'none', borderRadius: 40, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', transition: '0.2s' }}>
              {CAT_META[tab]?.emoji || ''} {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Timeline */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {Array(6).fill(0).map((_, i) => <Skeleton key={i} h="90px" r="16px" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🌱</div>
            <h3 style={{ color: '#1a6b3c', marginBottom: 8 }}>No activities yet in this category</h3>
            <p style={{ color: '#888', maxWidth: 280, margin: '0 auto' }}>Complete eco habits in the Dashboard to build your timeline!</p>
          </div>
        ) : (
          <div style={{ position: 'relative', paddingLeft: 52 }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 23, top: 0, bottom: 0, width: 2, background: '#E5E7EB' }} />

            {filtered.map((log, i) => {
              const cat = log.habit?.category || 'Green Contribution';
              const meta = CAT_META[cat] || { color: '#27AE60', bg: '#F0FFF4', emoji: '🌱' };
              return (
                <motion.div key={log._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  style={{ position: 'relative', marginBottom: 24 }}>
                  {/* Timeline dot */}
                  <div style={{ position: 'absolute', left: -38, top: 16, width: 14, height: 14, background: meta.color, borderRadius: '50%', border: '3px solid white', boxShadow: `0 0 0 2px ${meta.color}44` }} />

                  <div style={{ background: 'white', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderLeft: `4px solid ${meta.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 42, height: 42, background: meta.bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                          {log.habit?.icon || meta.emoji}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a2e', marginBottom: 4 }}>{log.habit?.name || 'Eco Habit'}</div>
                          <span style={{ fontSize: '0.7rem', background: `${meta.color}18`, color: meta.color, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{cat}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#aaa', fontSize: '0.75rem', flexShrink: 0 }}>
                        <Clock size={12} /> {formatDate(log.dateCompleted)}
                      </div>
                    </div>
                    {/* Rewards */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', background: '#FFF3CD', color: '#856404', padding: '3px 10px', borderRadius: 20, fontWeight: 700 }}>+{log.xpEarned} XP</span>
                      {log.co2Saved > 0 && <span style={{ fontSize: '0.75rem', background: '#D1FAE5', color: '#065F46', padding: '3px 10px', borderRadius: 20, fontWeight: 700 }}>-{log.co2Saved}kg CO₂</span>}
                      {log.waterSaved > 0 && <span style={{ fontSize: '0.75rem', background: '#DBEAFE', color: '#1E40AF', padding: '3px 10px', borderRadius: 20, fontWeight: 700 }}>💧{log.waterSaved}L saved</span>}
                      {log.treesPlanted > 0 && <span style={{ fontSize: '0.75rem', background: '#D1FAE5', color: '#065F46', padding: '3px 10px', borderRadius: 20, fontWeight: 700 }}>🌳×{log.treesPlanted}</span>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
