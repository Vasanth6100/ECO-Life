import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);
  const isLogin = location.pathname === '/login';
  const [selectedGuardian, setSelectedGuardian] = useState('Beetle');
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name || 'Eco Hero', formData.email, formData.password, selectedGuardian.toLowerCase());
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Auth Error:', err);
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const guardians = [
    { name: 'Bear', icon: '🐻' },
    { name: 'Beetle', icon: '🪲' },
    { name: 'Sprout', icon: '🌱' },
    { name: 'Owl', icon: '🦉' }
  ];

  return (
    <div className="auth-page" style={{ 
      minHeight: '100vh', 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr',
      background: 'var(--bg-beige)'
    }}>
      {/* Left: Branding */}
      <div className="auth-left section-padding" style={{ padding: '40px', background: 'var(--card-beige)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Leaf size={40} color="var(--primary-green)" fill="var(--accent-green)" />
          <h1 style={{ fontSize: '2.5rem' }}>ECOLIFE</h1>
        </div>
        <p style={{ fontSize: '1.25rem', color: 'var(--secondary-text)', marginBottom: '40px' }}>
          Your digital garden of daily progress
        </p>
        <div className="plant-image" style={{ 
          width: '100%', 
          height: '300px', 
          background: 'linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 100%)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-soft)'
        }}>
           {/* Simple Potted Plant Mockup */}
           <div style={{ width: '120px', height: '100px', background: '#8D6E63', borderRadius: '10px 10px 40px 40px', position: 'relative' }}>
              <div style={{ width: '4px', height: '150px', background: '#388E3C', position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)' }}>
                <div style={{ width: '60px', height: '30px', background: '#4CAF50', borderRadius: '50px 0 50px 0', position: 'absolute', top: '20px', left: '4px' }}></div>
                <div style={{ width: '60px', height: '30px', background: '#4CAF50', borderRadius: '0 50px 0 50px', position: 'absolute', top: '60px', right: '4px' }}></div>
                <div style={{ width: '80px', height: '40px', background: '#66BB6A', borderRadius: '50px 0 50px 0', position: 'absolute', top: '0', left: '-40px' }}></div>
              </div>
           </div>
        </div>
      </div>

      {/* Right: Auth Form */}
      <div className="auth-right flex-center" style={{ padding: '40px' }}>
        {isLogin ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="neo-card" 
            style={{ padding: '40px', width: '100%', maxWidth: '400px', background: 'white' }}
          >
            <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>Welcome Back</h2>
            {error && <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary-text)' }} />
                  <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="hero@ecolife.com" style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'var(--bg-beige)', border: 'none', borderRadius: '12px' }} />
                </div>
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary-text)' }} />
                  <input name="password" value={formData.password} onChange={handleChange} required type="password" placeholder="••••••••" style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'var(--bg-beige)', border: 'none', borderRadius: '12px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ width: 'auto' }} /> Keep me logged in
                </label>
                <a href="#" style={{ color: 'var(--primary-green)', fontWeight: '600' }}>Forgot?</a>
              </div>
              <Button type="submit" size="lg" disabled={isLoading} style={{ width: '100%', marginTop: '16px' }}>{isLoading ? 'Loading...' : 'Login to EcoLife'}</Button>
              
              <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
                Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>Sign up</Link>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="neo-card" 
            style={{ padding: '40px', width: '100%', maxWidth: '400px', background: 'white' }}
          >
            <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>New Journey</h2>
            {error && <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group">
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary-text)' }} />
                  <input name="name" value={formData.name} onChange={handleChange} required type="text" placeholder="Your Display Name" style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'var(--bg-beige)', border: 'none', borderRadius: '12px' }} />
                </div>
              </div>
              <div className="input-group">
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary-text)' }} />
                  <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Your Email Address" style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'var(--bg-beige)', border: 'none', borderRadius: '12px' }} />
                </div>
              </div>
              <div className="input-group">
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary-text)' }} />
                  <input name="password" value={formData.password} onChange={handleChange} required type="password" placeholder="Create Password" style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'var(--bg-beige)', border: 'none', borderRadius: '12px' }} />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', fontSize: '0.9rem' }}>Choose Your Guardian</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {guardians.map(g => (
                    <div 
                      key={g.name}
                      onClick={() => setSelectedGuardian(g.name)}
                      style={{ 
                        padding: '12px', 
                        textAlign: 'center', 
                        background: selectedGuardian === g.name ? 'var(--light-green)' : 'var(--bg-beige)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        border: selectedGuardian === g.name ? '2px solid var(--accent-green)' : '2px solid transparent',
                        fontSize: '1.5rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      {g.icon}
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" size="lg" disabled={isLoading} style={{ width: '100%', marginTop: '16px' }}>{isLoading ? 'Loading...' : 'Plant My First Seed'}</Button>

              <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>Login</Link>
              </div>
            </form>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 1200px) {
          .auth-page { grid-template-columns: 1fr; }
          .auth-left { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
