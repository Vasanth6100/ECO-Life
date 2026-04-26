import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Shield, Users, TreeDeciduous, Zap, Droplets, Bike, ShoppingBag } from 'lucide-react';
import Button from '../components/Button';
import Footer from '../components/Footer';

const LandingPage = () => {
  const earthRef = useRef(null);

  useEffect(() => {
    gsap.to(earthRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }, []);

  const features = [
    {
      title: "Invisible Impact",
      desc: "Track the hidden CO2 savings of every small daily choice.",
      icon: <Zap className="text-[var(--primary-green)]" size={32} />
    },
    {
      title: "Hero Fatigue",
      desc: "Gamified streaks and rewards keep your eco-motivation high.",
      icon: <Shield className="text-[var(--primary-green)]" size={32} />
    },
    {
      title: "Broken Streaks",
      desc: "Protect your progress with Streak Shields and community support.",
      icon: <TreeDeciduous className="text-[var(--primary-green)]" size={32} />
    }
  ];

  const stats = [
    { value: "45M+", label: "Plastic Bottles Saved" },
    { value: "1.2k", label: "Tons CO2 Offset" },
    { value: "890k", label: "Trees Planted" },
    { value: "250M", label: "Liters Water Purified" }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section section-padding" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '24px' }}>
              Save the Planet, <br />
              <span style={{ color: 'var(--accent-green)' }}>One Habit</span> <br />
              <span style={{ color: 'var(--blue-accent)' }}>at a Time</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--secondary-text)', marginBottom: '40px', maxWidth: '500px' }}>
              Transform your daily actions into a lush digital forest. Join thousands of eco-heroes making a real-world difference.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </motion.div>

          <motion.div
            className="hero-image-container flex-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div className="glow-ring" style={{
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(47, 174, 102, 0.2) 0%, transparent 70%)',
              position: 'absolute',
              zIndex: 0
            }}></div>

            <div ref={earthRef} className="earth-container" style={{ width: '300px', height: '300px', position: 'relative', zIndex: 1 }}>
              {/* Simple CSS Earth placeholder */}
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #2D9CDB 0%, #1F7A3D 100%)',
                borderRadius: '50%',
                boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.2), 0 0 40px rgba(47, 174, 102, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Face/Cute elements */}
                <div style={{ width: '40px', height: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '10px', position: 'absolute', top: '40%', left: '30%' }}></div>
                <div style={{ width: '40px', height: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '10px', position: 'absolute', top: '40%', right: '30%' }}></div>
                <div style={{ width: '30px', height: '15px', borderBottom: '4px solid rgba(255,255,255,0.8)', borderRadius: '50%', position: 'absolute', bottom: '35%' }}></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section section-padding" style={{ background: 'var(--card-beige)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Small actions are being lost in a big mess.</h2>
            <p style={{ color: 'var(--secondary-text)' }}>We make environmental impact visible, rewarding, and social.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="neo-card"
                style={{ padding: '40px', textAlign: 'center' }}
              >
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
                <h3 style={{ marginBottom: '16px' }}>{f.title}</h3>
                <p style={{ color: 'var(--secondary-text)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Forest Section */}
      <section className="forest-section section-padding" style={{ overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Your habits, visualized as a forest</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--secondary-text)', marginBottom: '32px' }}>
              Watch your digital ecosystem grow as you complete daily tasks. Every checkmark plants a seed, every streak grows a tree.
            </p>
            <Button variant="secondary">Explore Guilds</Button>
          </div>

          <div className="floating-cards" style={{ position: 'relative', height: '400px' }}>
            {[
              { label: 'Daily Tracking', color: 'var(--accent-green)', top: '10%', left: '10%', rotate: -5 },
              { label: 'Guilds', color: 'var(--blue-accent)', top: '40%', left: '50%', rotate: 5 },
              { label: 'Rewards', color: 'var(--highlight-yellow)', top: '10%', left: '60%', rotate: 8 },
              { label: 'Streak Shields', color: 'var(--primary-green)', top: '60%', left: '15%', rotate: -8 }
            ].map((card, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3 + i, repeat: -1, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: card.top,
                  left: card.left,
                  padding: '20px 30px',
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-soft)',
                  fontWeight: 'bold',
                  color: card.color,
                  transform: `rotate(${card.rotate}deg)`,
                  whiteSpace: 'nowrap',
                  zIndex: 4 - i
                }}
              >
                {card.label}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section-padding" style={{ background: 'var(--primary-green)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', color: 'var(--highlight-yellow)', marginBottom: '8px' }}>{s.value}</h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section section-padding">
        <div className="container">
          <div className="glass-card" style={{
            background: 'var(--primary-green)',
            padding: '80px',
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '24px' }}>Join the Community of Eco Heroes</h2>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Button size="lg" variant="secondary">Sign Up Free</Button>
              <Button size="lg" variant="outline" style={{ borderColor: 'white', color: 'white' }}>Member Login</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @media (max-width: 992px) {
          .hero-section .container { grid-template-columns: 1fr; text-align: center; }
          .hero-section p { margin-left: auto; margin-right: auto; }
          .hero-section div { justify-content: center; }
          .hero-image-container { order: -1; }
          .forest-section .container { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

// redeploy trigger