import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <Leaf size={32} color="var(--primary-green)" fill="var(--accent-green)" />
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: '800', 
            color: 'var(--primary-green)',
            letterSpacing: '-0.5px'
          }}>
            ECOLIFE
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/features" style={{ fontWeight: '600', color: 'var(--secondary-text)' }}>Features</Link>
          <Link to="/about" style={{ fontWeight: '600', color: 'var(--secondary-text)' }}>About</Link>
          <Link to="/community" style={{ fontWeight: '600', color: 'var(--secondary-text)' }}>Community</Link>
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', cursor: 'pointer' }}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
