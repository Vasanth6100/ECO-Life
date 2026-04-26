import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Plus, Bike, ShoppingBag, Droplets, Zap, Shield, Flame } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const Progress = () => {
  const stats = [
    { label: 'CO2 Saved', value: '14.2kg', icon: <Zap size={20} />, color: '#F4C430' },
    { label: 'Water Saved', value: '420L', icon: <Droplets size={20} />, color: '#2D9CDB' },
    { label: 'Trees Offset', value: '3.5', icon: <Leaf size={20} />, color: '#2FAE66' },
  ];

  const tasks = [
    { name: 'Bike to Work', xp: '+50 XP', category: 'Travel', completed: false },
    { name: 'Reusable Bags Used', xp: '+20 XP', category: 'Shopping', completed: true },
    { name: 'Cold Water Wash', xp: '+30 XP', category: 'Home', completed: false },
  ];

  return (
    <div className="dashboard-layout" style={{ display: 'flex', background: 'var(--bg-beige)', minHeight: '100vh' }}>
      <Sidebar />
      
      <main style={{ flex: 1, marginLeft: '280px', padding: '40px' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Morning, Hero!</h1>
          <p style={{ color: 'var(--secondary-text)' }}>Your daily contribution to a greener earth</p>
        </header>

        {/* XP Progress Bar */}
        <section className="neo-card" style={{ padding: '32px', marginBottom: '40px', background: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--light-green)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flame color="var(--primary-green)" fill="var(--primary-green)" size={24} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '1.25rem' }}>Level 14</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>Status: Seed</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold' }}>2,450 / 3,000 XP</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-green)' }}>550 XP to next level</div>
            </div>
          </div>
          <div style={{ width: '100%', height: '20px', background: 'var(--bg-beige)', borderRadius: '10px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary-green), var(--accent-green))' }}
            ></motion.div>
          </div>
        </section>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {stats.map(s => (
            <div key={s.label} className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
               <div style={{ 
                 width: '40px', 
                 height: '40px', 
                 background: `${s.color}20`, 
                 color: s.color, 
                 borderRadius: '10px', 
                 margin: '0 auto 16px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center'
               }}>
                 {s.icon}
               </div>
               <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>{s.value}</div>
               <div style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', fontWeight: '600' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Task List */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
             <h2 style={{ fontSize: '1.5rem' }}>Daily Tasks</h2>
             <span style={{ fontSize: '0.9rem', color: 'var(--primary-green)', fontWeight: 'bold' }}>2 tasks remaining</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             {tasks.map((task, i) => (
               <motion.div 
                 key={task.name}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="neo-card" 
                 style={{ 
                   padding: '20px 24px', 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '20px',
                   background: task.completed ? 'rgba(47, 174, 102, 0.05)' : 'white'
                 }}
               >
                 <div style={{ 
                   width: '24px', 
                   height: '24px', 
                   borderRadius: '6px', 
                   border: `2px solid ${task.completed ? 'var(--accent-green)' : 'var(--secondary-text)'}`,
                   background: task.completed ? 'var(--accent-green)' : 'transparent',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   color: 'white'
                 }}>
                   {task.completed && <Plus size={16} style={{ transform: 'rotate(45deg)' }} />}
                 </div>
                 <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--secondary-text)' : 'var(--dark-text)' }}>{task.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--secondary-text)' }}>{task.category} • <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>{task.xp}</span></div>
                 </div>
                 <Button size="sm" variant={task.completed ? 'ghost' : 'outline'}>
                   {task.completed ? 'Done' : 'Complete'}
                 </Button>
               </motion.div>
             ))}
          </div>
        </section>

        {/* FAB */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ 
            position: 'fixed', 
            bottom: '40px', 
            right: '40px', 
            width: '64px', 
            height: '64px', 
            background: 'var(--primary-green)', 
            color: 'white', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 10px 20px rgba(31, 122, 61, 0.3)',
            zIndex: 100
          }}
        >
          <Plus size={32} />
        </motion.button>
      </main>

      <style jsx>{`
        @media (max-width: 992px) {
          .dashboard-layout main { margin-left: 80px; }
          .dashboard-layout .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Progress;
