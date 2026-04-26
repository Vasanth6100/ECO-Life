import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Bell, Settings, CheckCircle, Star, Trees, ArrowRight, Recycle } from 'lucide-react';
import Button from '../components/Button';

const LandingPlayground = () => {
  const navigate = useNavigate();
  const growthPath = [
    {
      title: "Log Habits",
      subtitle: "eco-friendly actions like reusable cup or biking",
      icon: <CheckCircle size={32} color="#2E7D32" />,
      bg: "#E8F5E9"
    },
    {
      title: "Gain XP",
      subtitle: "earn XP, unlock seeds and bonuses",
      icon: <Star size={32} color="#F4C430" />,
      bg: "#FFF9C4"
    },
    {
      title: "Grow Forest",
      subtitle: "convert XP into trees and expand forest",
      icon: <Trees size={32} color="#2D9CDB" />,
      bg: "#E3F2FD"
    }
  ];

  return (
    <div className="landing-playground" style={{ background: '#F4EEDC', minHeight: '100vh', paddingBottom: '0' }}>
      {/* Header */}
      <nav style={{ padding: '24px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Leaf size={28} color="#2E7D32" fill="#2E7D32" />
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2E7D32', letterSpacing: '-0.5px' }}>EcoLife</span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button onClick={() => navigate('/login')} size="sm" style={{ background: 'white', color: '#2E7D32', border: '1.5px solid #2E7D32' }}>
            Login
          </Button>
          <Button onClick={() => navigate('/signup')} size="sm">
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '80px 0 120px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          <img 
            src="/mascot.png" 
            alt="Mascot" 
            style={{ width: '600px', height: '600px', objectFit: 'contain' }} 
          />
        </motion.div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: '4.5rem', fontWeight: '900', lineHeight: 1, marginBottom: '24px' }}>
              <span style={{ color: '#2E7D32' }}>Welcome to the</span> <br />
              <span style={{ 
                background: 'linear-gradient(90deg, #1A4D2E 0%, #2D9CDB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Living Playground</span>
            </h1>
            <p style={{ fontSize: '1.4rem', color: '#555', maxWidth: '700px', margin: '0 auto 40px', lineHeight: 1.6 }}>
              Ready to turn your small habits into a thriving ecosystem? <br />
              Let's walk through how you'll grow your forest.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              style={{ padding: '20px 48px', fontSize: '1.1rem', borderRadius: '50px', background: '#2E7D32', boxShadow: '0 10px 25px rgba(46, 125, 50, 0.3)' }}
            >
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Path to Growth Section */}
      <section style={{ padding: '100px 0', background: 'rgba(255,255,255,0.4)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '60px', color: '#1A4D2E' }}>The Path to Growth</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {growthPath.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="neo-card"
                style={{ padding: '48px 32px', textAlign: 'center', background: 'white' }}
              >
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: item.bg, 
                  borderRadius: '50%', 
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#1A4D2E' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.6 }}>{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco-Tips Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: '#1A4D2E', marginBottom: '8px' }}>Eco-Tips for New Explorers</h2>
              <p style={{ fontSize: '1.1rem', color: '#666' }}>Wisdom from the forest friends</p>
            </div>
            <button 
              onClick={() => navigate('/login')}
              style={{ 
                padding: '14px 28px', 
                background: '#2D9CDB', 
                color: 'white', 
                border: 'none', 
                borderRadius: '50px', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(45, 156, 219, 0.2)'
              }}>
              See All Tips <ArrowRight size={20} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* Barnaby Bear */}
            <div className="neo-card" style={{ display: 'flex', gap: '32px', padding: '40px', background: 'white', alignItems: 'center' }}>
              <div style={{ width: '120px', height: '120px', background: '#F5F5F5', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                🐻
              </div>
              <div>
                <h4 style={{ fontSize: '1.5rem', color: '#1A4D2E', marginBottom: '12px' }}>Sip Sustainably</h4>
                <p style={{ color: '#666', lineHeight: 1.6 }}>
                  Barnaby Bear says: "Bring your own mug! It keeps your drink warmer and our forest floors cleaner from disposable cups."
                </p>
              </div>
            </div>

            {/* Fiona Fox */}
            <div className="neo-card" style={{ display: 'flex', gap: '32px', padding: '40px', background: 'white', alignItems: 'center' }}>
              <div style={{ width: '120px', height: '120px', background: '#F5F5F5', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                🦊
              </div>
              <div>
                <h4 style={{ fontSize: '1.5rem', color: '#1A4D2E', marginBottom: '12px' }}>Power Down</h4>
                <p style={{ color: '#666', lineHeight: 1.6 }}>
                  Fiona Fox suggests: "Unplug those chargers when not in use. Even 'ghost' power adds up and we need that energy for the stars!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            style={{ 
              background: '#2E7D32', 
              borderRadius: 'var(--radius-lg)', 
              padding: '80px', 
              textAlign: 'center', 
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(46, 125, 50, 0.4)'
            }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '24px' }}>Ready to plant your first tree?</h2>
              
              <div style={{ maxWidth: '400px', margin: '0 auto 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '12px', fontWeight: 'bold' }}>
                   <span>NEWCOMER</span>
                   <span>0 / 100 XP</span>
                </div>
                <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px' }}>
                   <div style={{ width: '5%', height: '100%', background: '#F4C430', borderRadius: '10px', boxShadow: '0 0 15px #F4C430' }}></div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/login')}
                style={{ 
                  padding: '24px 60px', 
                  background: 'white', 
                  color: '#2E7D32', 
                  border: 'none', 
                  borderRadius: '50px', 
                  fontSize: '1.25rem', 
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(255,255,255,0.3)',
                  letterSpacing: '1px'
                }}
              >
                START GROWING NOW
              </button>
            </div>

            {/* Decorative leaves */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', fontSize: '150px', opacity: 0.1 }}>🍃</div>
            <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', fontSize: '150px', opacity: 0.1 }}>🌿</div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 0', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '24px' }}>
          <Leaf size={24} color="#666" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')} />
          <Recycle size={24} color="#666" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')} />
          <Trees size={24} color="#666" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')} />
        </div>
        <p style={{ color: '#999', fontSize: '0.9rem', fontWeight: '500' }}>EcoLife Living Playground © 2024</p>
      </footer>
    </div>
  );
};

export default LandingPlayground;
