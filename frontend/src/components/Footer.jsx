import React from 'react';
import { Leaf, Camera, MessageSquare, Globe, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--card-beige)', padding: '80px 0 40px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <Leaf size={28} color="var(--primary-green)" fill="var(--accent-green)" />
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-green)' }}>ECOLIFE</span>
            </div>
            <p style={{ color: 'var(--secondary-text)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Empowering individuals to make a measurable impact on the planet through daily habits and community action.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              <li><a href="#">Features</a></li>
              <li><a href="#">Guilds</a></li>
              <li><a href="#">Rewards</a></li>
              <li><a href="#">Leaderboard</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>Stay Connected</h4>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <a href="#" style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-green)' }}>
                <Camera size={20} />
              </a>
              <a href="#" style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-green)' }}>
                <MessageSquare size={20} />
              </a>
              <a href="#" style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-green)' }}>
                <Globe size={20} />
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary-text)', fontSize: '0.9rem' }}>
              <Mail size={16} />
              hello@ecolife.com
            </div>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
          <p>© 2026 ECOLIFE. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
