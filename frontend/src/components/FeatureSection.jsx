import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Check } from 'lucide-react';

const FeatureSection = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    // Left side bento box animation
    gsap.from('.feature-brick', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      scale: 0.8,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'back.out(1.7)',
    });

    // Right side text animation
    gsap.from('.feature-text-content > *', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      x: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="feature-section">
      <div className="container feature-grid">
        <div className="feature-visual">
          <div className="bento-grid">
            <div className="feature-brick brick-beige">
              <div className="brick-icon">📈</div>
              <h4>Daily Tracking</h4>
              <p>Simple habit logging in seconds.</p>
            </div>
            <div className="feature-brick brick-blue">
              <div className="brick-icon">👥</div>
              <h4>Guilds</h4>
              <p>Join neighborhoods and save the planet together.</p>
            </div>
            <div className="feature-brick brick-green">
              <div className="brick-icon">🛡️</div>
              <h4>Streak Shields</h4>
              <p>Protect your progress even on busy days.</p>
            </div>
            <div className="feature-brick brick-yellow">
              <div className="brick-icon">🏆</div>
              <h4>Rewards</h4>
              <p>Unlock real-world discounts from eco-brands.</p>
            </div>
          </div>
        </div>

        <div className="feature-text-content">
          <h2>Your habits, visualized as a forest.</h2>
          <p>
            EcoLife turns your daily wins into biological oxygen. Every time 
            you take a plastic bottle or bike to work, your digital tree 
            grows. Completing your forest funds reforestation 
            projects around the globe.
          </p>
          <ul className="feature-list">
            <li>
              <div className="check-circle"><Check size={14} strokeWidth={3} /></div>
              <span>Verified impact data with blockchain transparency</span>
            </li>
            <li>
              <div className="check-circle"><Check size={14} strokeWidth={3} /></div>
              <span>Personalized habit suggestions based on your lifestyle</span>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .feature-section {
          padding: 150px 0;
          background: #fdfaf5;
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 6rem;
        }
        
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .feature-brick {
          padding: 2.5rem 2rem;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          transition: var(--transition);
          border: 2px solid #000;
          box-shadow: 4px 4px 0px #000;
        }
        
        .feature-brick:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0px #000;
        }
        
        .brick-beige { background-color: #e9e3d5; }
        .brick-blue { background-color: #a2d2ff; }
        .brick-green { background-color: #b7e4c7; }
        .brick-yellow { background-color: #ffca3a; }
        
        .brick-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .feature-brick h4 {
          font-size: 1.25rem;
          font-weight: 800;
        }
        
        .feature-brick p {
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0.8;
        }
        
        .feature-text-content h2 {
          font-size: clamp(2.5rem, 4.5vw, 4rem);
          margin-bottom: 2rem;
          letter-spacing: -2px;
          line-height: 1;
        }
        
        .feature-text-content p {
          font-size: 1.2rem;
          color: var(--text);
          opacity: 0.7;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        
        .feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .feature-list li {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .check-circle {
          width: 28px;
          height: 28px;
          background: #2d6a4f;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .feature-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .feature-text-content {
            order: 1;
            text-align: center;
          }
          .feature-visual { order: 2; }
          .feature-list li { justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default FeatureSection;
