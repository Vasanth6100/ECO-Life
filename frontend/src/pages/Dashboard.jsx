import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bike, 
  Droplets, 
  Zap, 
  ShoppingBag, 
  Check, 
  Calendar as CalendarIcon, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const habits = [
    { name: 'No Plastic', desc: 'Avoided single-use plastics today', icon: <ShoppingBag />, color: '#E74C3C' },
    { name: 'Cycling', desc: 'Commuted via bike (5km)', icon: <Bike />, color: '#2D9CDB' },
    { name: 'Save Water', desc: 'Kept shower under 5 minutes', icon: <Droplets />, color: '#2FAE66' },
    { name: 'Save Electricity', desc: 'Turned off unused devices', icon: <Zap />, color: '#F4C430' },
  ];

  return (
    <div className="dashboard-layout" style={{ display: 'flex', background: 'var(--bg-beige)', minHeight: '100vh' }}>
      <Sidebar />
      
      <main style={{ flex: 1, marginLeft: '280px', padding: '40px' }}>
        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Green Habit Tracker</h1>
            <p style={{ color: 'var(--secondary-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} color="var(--accent-green)" />
              12.4kg CO2 saved this week
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="glass-card" style={{ padding: '12px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--secondary-text)' }}>STREAK</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-green)' }}>7 Days 🔥</div>
            </div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px' }}>
          {/* Main Habit Grid */}
          <section>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {habits.map((habit, i) => (
                <motion.div 
                  key={habit.name}
                  whileHover={{ scale: 1.02 }}
                  className="neo-card"
                  style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: `${habit.color}20`, 
                      color: habit.color,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {habit.icon}
                    </div>
                    <Check size={20} color="var(--accent-green)" style={{ opacity: 0.3 }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{habit.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>{habit.desc}</p>
                  </div>
                  <button style={{ 
                    marginTop: '8px',
                    width: '100%', 
                    padding: '12px', 
                    background: 'var(--light-green)', 
                    color: 'var(--primary-green)',
                    fontWeight: 'bold',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    CHECK
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Garden Progress Card */}
            <div className="neo-card" style={{ marginTop: '40px', padding: '32px', background: 'linear-gradient(90deg, var(--card-beige) 0%, #fff 100%)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                 <h3 style={{ fontSize: '1.25rem' }}>Garden Progress</h3>
                 <span style={{ fontWeight: 'bold', color: 'var(--primary-green)' }}>80% to Sproutling</span>
               </div>
               <div style={{ width: '100%', height: '12px', background: 'var(--bg-beige)', borderRadius: '10px', overflow: 'hidden' }}>
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '80%' }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   style={{ height: '100%', background: 'var(--accent-green)' }}
                 ></motion.div>
               </div>
               <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                 {[1,2,3,4,5].map(i => (
                   <div key={i} style={{ width: '40px', height: '40px', background: i <= 4 ? 'var(--light-green)' : 'var(--bg-beige)', borderRadius: '8px', opacity: i <= 4 ? 1 : 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     🌱
                   </div>
                 ))}
               </div>
            </div>
          </section>

          {/* Right Panel */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <CalendarIcon size={20} color="var(--primary-green)" />
                <h3 style={{ fontSize: '1rem' }}>Activity Calendar</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {Array.from({ length: 31 }).map((_, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      width: '100%', 
                      aspectRatio: '1', 
                      background: [5, 12, 14, 15, 18, 20, 21].includes(i+1) ? 'var(--accent-green)' : 'var(--bg-beige)',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: [5, 12, 14, 15, 18, 20, 21].includes(i+1) ? 'white' : 'var(--secondary-text)'
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '24px', background: 'var(--highlight-yellow)', borderRadius: 'var(--radius-md)', color: 'var(--dark-text)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1rem' }}>Daily Mission</h3>
                <Zap size={18} />
              </div>
              <p style={{ fontSize: '0.9rem', marginBottom: '16px', fontWeight: '500' }}>Complete 5 water tasks to unlock the "Ocean Guard" badge.</p>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>3/5 Completed</div>
            </div>

            <div className="neo-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Growth Milestones</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Tree Planter', date: 'Yesterday', icon: '🌳' },
                  { title: 'Solar Soul', date: '2 days ago', icon: '☀️' },
                  { title: 'Waste Warrior', date: '4 days ago', icon: '♻️' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--light-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{m.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{m.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--secondary-text)' }}>{m.date}</div>
                    </div>
                    <ArrowUpRight size={14} style={{ marginLeft: 'auto', opacity: 0.3 }} />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 1200px) {
          .dashboard-layout main { margin-left: 80px; }
          .dashboard-layout main > div { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
