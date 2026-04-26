import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Star, Lock, ChevronUp, Users } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Skeleton = ({ width = '100%', height = '1.2rem', radius = '8px' }) => (
  <div style={{ width, height, background: 'linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%)', backgroundSize: '200%', borderRadius: radius, animation: 'shimmer 1.5s infinite' }} />
);

const BADGE_ICONS = {
  'Sproutling': '🌱',
  'Hydration Hero': '💧',
  '7 Day Streak': '🔥',
  'Ocean Guardian': '🌊',
  'Forest King': '🌳',
};

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await api.get('/users/analytics');
        setAnalyticsData(res.data);
      } catch (err) {
        setError('Failed to load analytics.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  const leaderboard = analyticsData?.leaderboard || [];
  const userRank = analyticsData?.userRank || '—';
  const totalUsers = analyticsData?.totalUsers || 0;
  const badges = analyticsData?.badges || [];

  // All possible badges to show locked/unlocked state
  const allBadges = ['Sproutling', 'Hydration Hero', '7 Day Streak', 'Ocean Guardian', 'Forest King'];

  return (
    <div className="dashboard-layout" style={{ display: 'flex', background: 'var(--bg-beige)', minHeight: '100vh' }}>
      <Sidebar />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <main style={{ flex: 1, marginLeft: '280px', padding: '40px' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Growth Center</h1>
          <p style={{ color: 'var(--secondary-text)' }}>Analyze your sustainable impact over time</p>
        </header>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '12px 20px', borderRadius: '12px', marginBottom: '24px' }}>{error}</div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px' }}>
          {/* Main Analytics Area */}
          <section>
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
              <div className="neo-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>Your Global Rank</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'var(--highlight-yellow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award color="white" size={32} />
                  </div>
                  {loading ? <Skeleton width="80px" height="2rem" /> : (
                    <div>
                      <div style={{ fontSize: '2rem', fontWeight: '800' }}>#{userRank}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>of {totalUsers} users</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="neo-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>Badges Earned</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'var(--light-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star color="var(--primary-green)" size={32} fill="var(--accent-green)" />
                  </div>
                  {loading ? <Skeleton width="80px" height="2rem" /> : (
                    <div>
                      <div style={{ fontSize: '2rem', fontWeight: '800' }}>{badges.length}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>of {allBadges.length} possible</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Badge Display */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Your Badge Collection</h3>
              {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '20px' }}>
                  {[1,2,3,4,5].map(i => <Skeleton key={i} height="120px" radius="16px" />)}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '20px' }}>
                  {allBadges.map(badgeName => {
                    const earned = badges.includes(badgeName);
                    return (
                      <div key={badgeName} className="neo-card" style={{ padding: '20px', textAlign: 'center', opacity: earned ? 1 : 0.4, position: 'relative' }}>
                        {!earned && <Lock size={14} style={{ position: 'absolute', top: '10px', right: '10px' }} />}
                        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{BADGE_ICONS[badgeName] || '🏅'}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{badgeName}</div>
                        {earned && <div style={{ fontSize: '0.65rem', color: 'var(--primary-green)', fontWeight: 'bold', marginTop: '4px' }}>EARNED</div>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Weekly Chart */}
            <div className="neo-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>XP Progress Chart</h3>
              {loading ? <Skeleton height="240px" /> : (
                <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                  <svg width="100%" height="100%" viewBox="0 0 800 240" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[0, 60, 120, 180, 240].map(y => (
                      <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                    ))}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                      d="M0,200 Q100,180 200,120 T400,100 T600,150 T800,40"
                      fill="none"
                      stroke="var(--accent-green)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path d="M0,200 Q100,180 200,120 T400,100 T600,150 T800,40 L800,240 L0,240 Z" fill="url(#chartGradient)" />
                    {[0, 200, 400, 600, 800].map((x, i) => {
                      const y = [200, 120, 100, 150, 40][i];
                      return <circle key={i} cx={x} cy={y} r="6" fill="var(--primary-green)" stroke="white" strokeWidth="2" />;
                    })}
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', color: 'var(--secondary-text)', fontSize: '0.8rem' }}>
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Right Panel: Leaderboard */}
          <aside>
            <div className="neo-card" style={{ padding: '32px', position: 'sticky', top: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Star size={20} color="var(--highlight-yellow)" fill="var(--highlight-yellow)" />
                Leaderboard
              </h3>
              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[1,2,3,4,5].map(i => <Skeleton key={i} height="52px" radius="12px" />)}
                </div>
              ) : leaderboard.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--secondary-text)', padding: '32px 0' }}>
                  <Users size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
                  <p>No users yet. Be the first!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {leaderboard.map((u, idx) => {
                    const isCurrentUser = u.name === user?.name;
                    return (
                      <div key={u._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: isCurrentUser ? 'var(--light-green)' : 'transparent', borderRadius: 'var(--radius-sm)', border: isCurrentUser ? '1px solid var(--accent-green)' : 'none' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', width: '20px', color: 'var(--secondary-text)' }}>{idx + 1}</div>
                        <div style={{ width: '40px', height: '40px', background: 'var(--bg-beige)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} alt={u.name} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{u.name} {isCurrentUser && '(You)'}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--secondary-text)' }}>{u.xp?.toLocaleString()} XP</div>
                        </div>
                        {idx < 3 && <ChevronUp size={16} color="var(--accent-green)" />}
                      </div>
                    );
                  })}
                </div>
              )}
              <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-beige)', borderRadius: '12px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--secondary-text)' }}>
                🔄 Auto-refreshes every 30s
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
