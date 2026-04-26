import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Lock, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../utils/api';

const CATEGORY_COLORS = { Nature: '#27AE60', Water: '#16A085', Energy: '#F39C12' };

const Skeleton = ({ h = '1rem', w = '100%', r = '8px' }) => (
  <div style={{ width: w, height: h, background: 'linear-gradient(90deg,#e8e8e8 25%,#f5f5f5 50%,#e8e8e8 75%)', backgroundSize: '200% 100%', borderRadius: r, animation: 'shimmer 1.4s infinite linear' }} />
);

export default function BadgesRoom() {
  const [badges, setBadges] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([api.get('/badges'), api.get('/user/stats')])
      .then(([bRes, sRes]) => { setBadges(bRes.data.badges); setStats({ ...bRes.data, ...sRes.data }); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filters = ['All', 'Unlocked', 'Locked', 'Nature', 'Water', 'Energy'];
  const filtered = badges.filter(b => {
    if (filter === 'Unlocked') return b.unlocked;
    if (filter === 'Locked') return !b.unlocked;
    if (['Nature', 'Water', 'Energy'].includes(filter)) return b.category === filter;
    return true;
  }).filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()));

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div style={{ display: 'flex', background: '#F8F9FA', minHeight: '100vh' }}>
      <Sidebar />
      <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>

      <main style={{ flex: 1, marginLeft: 260, padding: '36px 40px', overflowY: 'auto' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a6b3c', margin: 0 }}>🏆 Trophy Room</h1>
            {loading
              ? <Skeleton h="0.9rem" w="260px" r="6px" />
              : <p style={{ color: '#888', marginTop: 6 }}>You've unlocked <strong style={{ color: '#27AE60' }}>{unlockedCount}</strong> of {badges.length} badges. Keep going!</p>
            }
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ padding: '10px 20px', background: '#FFF3CD', borderRadius: 40, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800 }}>
              <Star size={18} color="#F59E0B" fill="#F59E0B" />
              {loading ? <Skeleton w="60px" h="1rem" /> : <span>{stats?.xp?.toLocaleString()} XP</span>}
            </div>
            <div style={{ padding: '10px 20px', background: '#F0FFF4', borderRadius: 40, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800 }}>
              <Trophy size={18} color="#27AE60" />
              {loading ? <Skeleton w="40px" h="1rem" /> : <span>LVL {Math.floor((stats?.xp || 0) / 1000) + 1}</span>}
            </div>
          </div>
        </header>

        {/* Progress bar */}
        {!loading && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem', fontWeight: 600, color: '#444' }}>
                <span>Badge Collection Progress</span>
                <span style={{ color: '#27AE60' }}>{unlockedCount} / {badges.length}</span>
              </div>
              <div style={{ height: 10, background: '#F0F0F0', borderRadius: 10, overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${badges.length ? (unlockedCount / badges.length) * 100 : 0}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{ height: '100%', background: 'linear-gradient(90deg,#27AE60,#2ECC71)', borderRadius: 10 }} />
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28, gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '9px 20px', background: filter === f ? '#27AE60' : 'white', color: filter === f ? 'white' : '#888', border: 'none', borderRadius: 40, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: '0.2s' }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', padding: '8px 16px', borderRadius: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Search size={16} color="#888" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search badges…"
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.85rem', width: 140 }} />
          </div>
        </div>

        {/* Badge Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 24 }}>
            {Array(8).fill(0).map((_, i) => <Skeleton key={i} h="240px" r="20px" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#888' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
            <p>No badges match your filter.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 24, marginBottom: 40 }}>
            {filtered.map((badge, i) => (
              <motion.div key={badge.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -8, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
                style={{ background: badge.unlocked ? 'white' : 'rgba(255,255,255,0.6)', borderRadius: 20, padding: '32px 24px', textAlign: 'center', position: 'relative', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: badge.unlocked ? `2px solid ${badge.color}22` : '2px dashed #E5E7EB', transition: '0.3s', opacity: badge.unlocked ? 1 : 0.75 }}>
                {!badge.unlocked && (
                  <div style={{ position: 'absolute', top: 14, right: 14, color: '#9CA3AF' }}><Lock size={16} /></div>
                )}
                <div style={{ width: 80, height: 80, margin: '0 auto 16px', background: badge.unlocked ? `${badge.color}18` : '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', boxShadow: badge.unlocked ? `0 8px 20px ${badge.color}30` : 'none' }}>
                  {badge.icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 6, color: badge.unlocked ? '#1a1a2e' : '#9CA3AF' }}>{badge.title}</h3>
                <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: 12, lineHeight: 1.5 }}>{badge.description}</p>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, background: `${CATEGORY_COLORS[badge.category] || '#27AE60'}18`, color: CATEGORY_COLORS[badge.category] || '#27AE60', padding: '3px 10px', borderRadius: 20 }}>
                  {badge.category}
                </span>
                {badge.unlocked && (
                  <div style={{ marginTop: 14, fontSize: '0.72rem', color: '#888' }}>
                    ✅ Unlocked
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Featured CTA */}
        <section style={{ background: 'linear-gradient(135deg,#1a6b3c,#27AE60)', padding: '48px', borderRadius: 24, color: 'white', display: 'grid', gridTemplateColumns: '1.5fr 1fr', alignItems: 'center', boxShadow: '0 20px 40px rgba(26,107,60,0.3)' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: 12, color: 'white' }}>The Golden Sprout 🌿</h2>
            <p style={{ opacity: 0.9, marginBottom: 24, maxWidth: 420, lineHeight: 1.6 }}>Our most prestigious badge. Reach Level 50 and save 5,000kg of CO₂ to unlock this legendary achievement.</p>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px 24px', borderRadius: 16, textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{stats?.co2Saved?.toFixed(1) || '0'}kg</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>CO₂ Saved</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px 24px', borderRadius: 16, textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{Math.min(((stats?.co2Saved || 0) / 5000) * 100, 100).toFixed(1)}%</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Progress</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <motion.div animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '120px' }}>🌿</motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
