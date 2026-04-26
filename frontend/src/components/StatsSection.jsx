import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import pulseBg from '../assets/forest_pulse_bg.png';

const StatCard = ({ value, label, colorClass }) => {
  const cardRef = useRef();
  
  return (
    <div className={`stat-card ${colorClass}`} ref={cardRef}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.from('.stat-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="stats-section">
      <div className="container">
        <div className="stats-header">
          <h2>Our Collective Impact</h2>
        </div>
        
        <div className="impact-grid">
          <StatCard value="45M+" label="Plastic Bottles Saved" colorClass="c-green" />
          <StatCard value="1.2k" label="Tons of CO2 Offset" colorClass="c-blue" />
          <StatCard value="890k" label="Trees Planted" colorClass="c-brown" />
          <StatCard value="250M" label="Liters of Water Purified" colorClass="c-red" />
        </div>

        {/* Real-Time Global Pulse Section */}
        <div className="pulse-container">
          <div className="pulse-bg-wrapper">
             <img src={pulseBg} alt="Forest Background" className="pulse-bg-img" />
             <div className="overlay"></div>
          </div>
          
          <div className="pulse-card-overlay">
            <div className="pulse-glass-card">
              <h3>Real-Time Global Pulse</h3>
              <p>
                Every action logged is aggregated in our global tracker. 
                We don't just build habits; we track the healing of our planet.
              </p>
              <button className="btn btn-primary pulse-btn">View Live Map</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: 120px 0;
          background: #fdfaf5;
          text-align: center;
        }
        
        .stats-header h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 5rem;
          letter-spacing: -2px;
        }
        
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 8rem;
        }
        
        .stat-card {
          background: white;
          padding: 3rem 2rem;
          border-radius: 24px;
          border-bottom: 6px solid #ccc;
          text-align: center;
          transition: var(--transition);
        }

        .stat-card:hover {
          transform: translateY(-8px);
        }

        .c-green { border-bottom-color: #2d6a4f; }
        .c-blue { border-bottom-color: #219ebc; }
        .c-brown { border-bottom-color: #fb8500; }
        .c-red { border-bottom-color: #e63946; }
        
        .stat-value {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 0.5rem;
          letter-spacing: -1px;
        }
        
        .stat-label {
          font-weight: 600;
          opacity: 0.5;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Pulse Section */
        .pulse-container {
          position: relative;
          height: 500px;
          border-radius: 50px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 50px;
        }

        .pulse-bg-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .pulse-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.2);
        }

        .pulse-card-overlay {
          position: relative;
          z-index: 2;
          width: 90%;
          max-width: 800px;
        }

        .pulse-glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          padding: 4rem;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }

        .pulse-glass-card h3 {
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          color: #1b4332;
        }

        .pulse-glass-card p {
          font-size: 1.15rem;
          line-height: 1.6;
          opacity: 0.7;
          margin-bottom: 2.5rem;
        }

        .pulse-btn {
          background: #2d6a4f !important;
          color: white !important;
          padding: 1.2rem 3rem !important;
          font-size: 1.1rem !important;
          border-radius: 50px !important;
        }

        @media (max-width: 768px) {
          .pulse-glass-card { padding: 3rem 1.5rem; }
          .impact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
