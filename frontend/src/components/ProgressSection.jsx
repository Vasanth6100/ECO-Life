import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Globe, Users, Zap, Lock, Shield } from 'lucide-react';

const ProgressSection = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.from('.progress-card', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.progress-bar-fill', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
      width: 0,
      duration: 1.5,
      delay: 0.5,
      ease: 'power2.inOut',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="progress-section">
      <div className="container">
        <div className="progress-top-grid">
          {/* Main Level Card */}
          <div className="progress-card seedling-card">
            <span className="card-tag">YOUR PROGRESS</span>
            <h2>Seedling to Guardian</h2>
            
            <div className="level-indicator">
              <div className="plant-circle">
                <span className="plant-emoji">🌲</span>
                <div className="lvl-tag">LVL 24</div>
              </div>
            </div>

            <div className="progress-stats-footer">
              <div className="label-row">
                <span>Seed Level 23</span>
                <span>945/1000 XP</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar-fill" style={{ width: '94.5%' }}></div>
              </div>
            </div>
          </div>

          <div className="right-stack">
            {/* Achievements Card */}
            <div className="progress-card achievement-card">
              <h3>Rare Achievements Unlocked</h3>
              <div className="achievement-row">
                <div className="ach-icon"><Globe size={24} /></div>
                <div className="ach-icon"><Users size={24} /></div>
                <div className="ach-icon"><Zap size={24} /></div>
                <div className="ach-icon locked"><Lock size={20} /></div>
              </div>
            </div>

            <div className="metric-row">
              {/* Guardians Card */}
              <div className="progress-card metric-card gold">
                <div className="m-val">12k</div>
                <div className="m-label">ACTIVE GUARDIANS</div>
              </div>
              {/* Streak Card */}
              <div className="progress-card metric-card white">
                <div className="m-val red">42</div>
                <div className="m-label">DAY STREAK</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .progress-section {
          padding: 100px 0;
          background: #fdfaf5;
        }
        
        .progress-top-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .right-stack {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .progress-card {
          border-radius: 40px;
          padding: 3rem;
          background: white;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .seedling-card {
          display: flex;
          flex-direction: column;
        }

        .card-tag {
          font-size: 0.75rem;
          font-weight: 800;
          opacity: 0.4;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }

        .progress-card h2 {
          font-size: 2.8rem;
          letter-spacing: -1.5px;
          margin-bottom: 3rem;
        }

        .level-indicator {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .plant-circle {
          width: 220px;
          height: 220px;
          background: #f1f0e8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .plant-emoji {
          font-size: 5rem;
        }

        .lvl-tag {
          position: absolute;
          bottom: -15px;
          background: #2d6a4f;
          color: white;
          padding: 0.6rem 1.4rem;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.9rem;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 0.8rem;
          color: #000;
        }

        .progress-track {
          height: 14px;
          background: #e9e5d7;
          border-radius: 20px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: #2d6a4f;
          border-radius: 20px;
        }

        .achievement-card {
          background: #1a74e5;
          color: white;
          padding: 2.5rem 3rem;
        }

        .achievement-card h3 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 2rem;
          font-style: italic;
          letter-spacing: -0.5px;
        }

        .achievement-row {
          display: flex;
          gap: 1.2rem;
        }

        .ach-icon {
          width: 54px;
          height: 54px;
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ach-icon.locked {
          background: rgba(0,0,0,0.1);
          border-color: rgba(255,255,255,0.1);
          opacity: 0.5;
        }

        .metric-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 1.5rem;
        }

        .metric-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .metric-card.gold {
          background: #ffcc00;
        }

        .m-val {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1;
        }

        .m-val.red { color: #e63946; border-bottom: 4px solid #e63946; }

        .m-label {
          font-size: 0.75rem;
          font-weight: 800;
          opacity: 0.7;
        }

        @media (max-width: 1024px) {
          .progress-top-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default ProgressSection;
