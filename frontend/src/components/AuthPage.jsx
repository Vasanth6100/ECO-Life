import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Mail, Lock, User, Info, ArrowRight, Save, Layout, Bug, TreePine, Bird, ShieldCheck } from 'lucide-react';
import pottedPlants from '../assets/potted_plants.png';

const AuthPage = ({ onBack }) => {
  const [activeGuardian, setActiveGuardian] = useState('BEETLE');
  const authRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.auth-col', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
    
    gsap.from('.auth-image', {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.3
    });
  }, { scope: authRef });

  const guardians = [
    { id: 'BEAR', name: 'BEAR', icon: <ShieldCheck size={20} /> },
    { id: 'BEETLE', name: 'BEETLE', icon: <Bug size={20} /> },
    { id: 'SPROUT', name: 'SPROUT', icon: <TreePine size={20} /> },
    { id: 'OWL', name: 'OWL', icon: <Bird size={20} /> },
  ];

  return (
    <div className="auth-page" ref={authRef}>
      <div className="auth-container">
        {/* Column 1: Brand & Image */}
        <div className="auth-col brand-col">
          <div className="brand-content">
            <h1 className="logo-text" onClick={onBack} style={{ cursor: 'pointer' }}>ECOLIFE</h1>
            <p className="tagline">Your digital garden of daily progress.</p>
          </div>
          <div className="auth-image-wrapper">
            <img src={pottedPlants} alt="Potted Plants" className="auth-image" />
          </div>
        </div>

        {/* Column 2: Login Form */}
        <div className="auth-col login-col">
          <div className="form-wrapper">
            <div className="form-head">
              <h2>Welcome back</h2>
              <p>Continue your green journey.</p>
            </div>
            
            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="admin@urbanease.com" />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••••••" />
              </div>

              <div className="form-meta">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Keep me logged in
                </label>
                <a href="#" className="forgot-link">Forgot?</a>
              </div>

              <button className="btn-auth btn-login">
                Login to EcoLife <ArrowRight size={20} />
              </button>
            </form>

            <p className="alt-action">
              New here? <span className="link-text">Create an account</span>
            </p>
          </div>
        </div>

        {/* Column 3: Signup Form */}
        <div className="auth-col join-col">
          <div className="form-wrapper">
            <div className="form-head">
              <h2>Join EcoLife</h2>
              <p>Start tracking your sustainable habits today.</p>
            </div>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" placeholder="admin@urbanease" />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••••••" />
                </div>
              </div>

              <div className="guardian-selector">
                <div className="selector-header">
                  <label>Choose Your Guardian</label>
                  <span className="select-badge">SELECT ONE</span>
                </div>
                <div className="guardian-grid">
                  {guardians.map((g) => (
                    <div 
                      key={g.id} 
                      className={`guardian-card ${activeGuardian === g.id ? 'active' : ''}`}
                      onClick={() => setActiveGuardian(g.id)}
                    >
                      {activeGuardian === g.id && <span className="chosen-tag">CHOSEN</span>}
                      <div className="guardian-icon">{g.icon}</div>
                      <span className="guardian-name">{g.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="requirement-box">
                <div className="req-icon"><Info size={18} /></div>
                <p>Passwords must be at least 8 characters long and include a number.</p>
              </div>

              <button className="btn-auth btn-signup">
                Plant My First Seed <Save size={18} />
              </button>
            </form>

            <p className="alt-action">
              Already a guardian? <span className="link-text">Log in instead</span>
            </p>
          </div>
        </div>
      </div>

      <footer className="auth-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span>ECOLIFE</span> © 2024 Keep it green.
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Community Guidelines</a>
            <a href="#">Help Center</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          background-color: #f5f1e8;
          display: flex;
          flex-direction: column;
          padding: 0;
          color: #1b4332;
          font-family: 'Inter', sans-serif;
        }

        .auth-container {
          flex: 1;
          display: flex;
          align-items: stretch;
          justify-content: center;
          width: 100%;
          max-width: 100vw;
          margin: 0;
          padding: 2rem;
          gap: 2rem;
        }

        .auth-col {
          flex: 1;
          border-radius: 40px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        /* Column 1: Brand */
        .brand-col {
          background: transparent;
          justify-content: space-between;
          padding: 2rem;
        }

        .logo-text {
          font-size: 5rem;
          font-weight: 800;
          color: #2d6a4f;
          margin: 0;
          letter-spacing: -2px;
          line-height: 1;
        }

        .tagline {
          font-size: 1.4rem;
          opacity: 0.8;
          font-weight: 500;
          margin-top: 1rem;
        }

        .auth-image-wrapper {
          width: 100%;
          aspect-ratio: 1/1;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .auth-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Column 2: Login */
        .login-col {
          background: #e9e5d7;
          padding: 3rem;
        }

        /* Column 3: Signup */
        .join-col {
          background: #ffffff;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.05);
        }

        .form-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .form-head {
          margin-bottom: 2.5rem;
        }

        .form-head h2 {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #1b4332;
        }

        .form-head p {
          font-size: 1.1rem;
          opacity: 0.6;
          font-weight: 500;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .input-group label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1b4332;
        }

        .input-group input {
          width: 100%;
          padding: 1.4rem 1.8rem;
          border-radius: 100px;
          border: none;
          background: #eef2ff;
          font-family: inherit;
          font-size: 1rem;
          color: #1b4332;
          font-weight: 500;
        }

        .input-group input::placeholder {
          color: #1b4332;
          opacity: 0.4;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
        }

        .forgot-link {
          color: #1b4332;
          text-decoration: none;
          font-weight: 700;
          border-bottom: 2px solid #1b4332;
        }

        .btn-auth {
          margin-top: 1rem;
          padding: 1.4rem;
          border-radius: 100px;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }

        .btn-login {
          background-color: #2d6a4f;
        }

        .btn-login:hover {
          background-color: #1b4332;
          transform: translateY(-2px);
        }

        .btn-signup {
          background-color: #004d4d;
        }

        .btn-signup:hover {
          background-color: #003333;
          transform: translateY(-2px);
        }

        .alt-action {
          margin-top: auto;
          padding-top: 2rem;
          text-align: center;
          font-size: 1rem;
          font-weight: 600;
          opacity: 0.6;
        }

        .link-text {
          color: #1b4332;
          text-decoration: underline;
          cursor: pointer;
          opacity: 1;
        }

        /* Guardian Selector */
        .guardian-selector {
          margin: 1rem 0;
        }

        .selector-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .selector-header label {
          font-size: 0.9rem;
          font-weight: 700;
        }

        .select-badge {
          font-size: 0.7rem;
          font-weight: 800;
          color: #8a7b54;
        }

        .guardian-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .guardian-card {
          aspect-ratio: 1/1.2;
          background: #f0eee6;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          position: relative;
          border: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .guardian-card.active {
          background: #74c69d;
          border-color: #1b4332;
        }

        .chosen-tag {
          position: absolute;
          top: -10px;
          background: #232323;
          color: white;
          font-size: 0.6rem;
          font-weight: 900;
          padding: 3px 8px;
          border-radius: 5px;
        }

        .guardian-icon {
          color: #1b4332;
          opacity: 0.7;
        }

        .guardian-card.active .guardian-icon {
          opacity: 1;
        }

        .guardian-name {
          font-size: 0.7rem;
          font-weight: 800;
          opacity: 0.5;
        }

        .guardian-card.active .guardian-name {
          opacity: 0.8;
        }

        /* Requirement Box */
        .requirement-box {
          display: flex;
          gap: 1rem;
          background: #fce7e7;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 5px solid #ef4444;
          align-items: center;
        }

        .req-icon {
          color: #ef4444;
          flex-shrink: 0;
        }

        .requirement-box p {
          font-size: 0.95rem;
          font-weight: 600;
          color: #7f1d1d;
          line-height: 1.4;
          margin: 0;
        }

        /* Footer */
        .auth-footer {
          background: #f5f1e8;
          padding: 2rem 4rem;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(0,0,0,0.08);
          padding-top: 2rem;
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0.6;
        }

        .footer-links {
          display: flex;
          gap: 3rem;
        }

        .footer-links a {
          color: inherit;
          text-decoration: none;
        }

        @media (max-width: 1400px) {
          .auth-container {
            gap: 1.5rem;
            padding: 1.5rem;
          }
          .logo-text { font-size: 4rem; }
          .form-head h2 { font-size: 2.2rem; }
        }

        @media (max-width: 1100px) {
          .auth-container {
            flex-direction: column;
          }
          .auth-col {
            width: 100%;
          }
          .brand-col {
            text-align: center;
            align-items: center;
          }
          .auth-image-wrapper {
            max-width: 500px;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
