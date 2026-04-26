import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CTASection = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.from('.cta-content > *', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="container">
        <div className="cta-box">
          <div className="cta-content">
            <h1>Join the Community of Eco Heroes.</h1>
            <p>Start your journey today. It's free to start, fun to play, and meaningful to the world.</p>
            <div className="cta-btns">
              <button className="btn btn-white">Sign Up Free</button>
              <button className="btn btn-outline">Member Login</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          padding: 100px 0 150px;
          background: #fdfaf5;
        }
        
        .cta-box {
          background: #1b4332;
          color: white;
          border-radius: 60px;
          padding: 8rem 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(27, 67, 50, 0.2);
        }
        
        .cta-box::after {
          content: 'H';
          position: absolute;
          bottom: -50px;
          right: -20px;
          font-size: 20rem;
          font-weight: 900;
          opacity: 0.03;
          pointer-events: none;
        }
        
        .cta-content h1 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          margin-bottom: 2rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          letter-spacing: -3px;
          line-height: 1;
        }
        
        .cta-content p {
          font-size: 1.3rem;
          opacity: 0.7;
          margin-bottom: 4rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        
        .cta-btns {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }
        
        .btn-white {
          background: white;
          color: #1b4332;
          padding: 1.2rem 3rem;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          cursor: pointer;
        }
        
        .btn-outline {
          background: transparent;
          border: 2px solid rgba(255,255,255,0.4);
          color: white;
          padding: 1.2rem 3rem;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: white;
        }

        @media (max-width: 768px) {
          .cta-box { padding: 5rem 2rem; border-radius: 40px; }
          .cta-btns { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
