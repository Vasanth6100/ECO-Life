import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MousePointer2 } from 'lucide-react';
import earthImg from '../assets/earth.png';

const Hero = () => {
  const heroRef = useRef();
  const earthRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.hero-title span', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power4.out',
    })
    .from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.5')
    .from('.hero-btns', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.5')
    .from(earthRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)',
    }, '-=1');

    // Floating animation for bubbles
    gsap.to('.bubble', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      duration: 'random(2, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Earth rotation
    gsap.to(earthRef.current, {
      rotation: 360,
      duration: 50,
      repeat: -1,
      ease: 'none'
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="hero">
      {/* Decorative Bubbles */}
      <div className="bubbles-container">
        <div className="bubble b1"></div>
        <div className="bubble b2"></div>
        <div className="bubble b3"></div>
        <div className="bubble b4"></div>
        <div className="bubble b5"></div>
      </div>

      <div className="container hero-grid">
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Save the </span>
            <span className="highlight-green">Planet,</span><br />
            <span className="highlight-blue">One Habit </span>
            <span>at a Time</span>
          </h1>
          <p className="hero-subtitle">
            Gamify your sustainable lifestyle. Grow your digital forest while 
            reducing your real-world carbon footprint.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="earth-frame" ref={earthRef}>
            <img src={earthImg} alt="3D Earth" className="earth-sticker" />
            
            {/* Floating UI Badges (Simulating prototype) */}
            <div className="ui-badge ub1">🌱</div>
            <div className="ui-badge ub2">💧</div>
            <div className="ui-badge ub3">☀️</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          padding: 180px 0 100px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: visible;
        }

        .hero-title {
          font-size: clamp(3.5rem, 9vw, 6rem);
          line-height: 0.95;
          letter-spacing: -3px;
          margin-bottom: 2rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text);
          opacity: 0.7;
          max-width: 520px;
          margin-bottom: 3rem;
          line-height: 1.6;
        }

        .hero-btns {
          display: flex;
          gap: 1.2rem;
        }

        .btn {
          padding: 1.2rem 2.8rem;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          border: none;
        }

        .btn-secondary {
          background: #f0eee2;
          color: var(--text);
          border: none;
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .earth-frame {
          position: relative;
          width: 550px;
          height: 550px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .earth-frame::before {
          content: '';
          position: absolute;
          width: 90%;
          height: 90%;
          background: #d8f3dc;
          border-radius: 50%;
          z-index: -1;
        }

        .earth-sticker {
          width: 90%;
          height: auto;
          filter: drop-shadow(0 30px 60px rgba(0,0,0,0.1));
        }

        /* Floating Bubbles */
        .bubbles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .bubble {
          position: absolute;
          border-radius: 50%;
          background: #ffb703;
          opacity: 0.8;
        }

        .b1 { width: 40px; height: 40px; top: 15%; right: 10%; }
        .b2 { width: 60px; height: 60px; bottom: 20%; left: 5%; background: #219ebc; }
        .b3 { width: 25px; height: 25px; top: 40%; right: 45%; background: #fb8500; }
        .b4 { width: 15px; height: 15px; top: 20%; left: 40%; }
        .b5 { width: 30px; height: 30px; bottom: 10%; right: 15%; }

        /* UI Badges */
        .ui-badge {
          position: absolute;
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          animation: float 4s infinite ease-in-out;
        }

        .ub1 { top: 10%; left: 10%; animation-delay: 0s; }
        .ub2 { bottom: 15%; left: 5%; animation-delay: 1s; }
        .ub3 { top: 30%; right: -5%; animation-delay: 2s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @media (max-width: 1100px) {
          .hero-grid { grid-template-columns: 1fr; gap: 4rem; text-align: center; }
          .hero-content { display: flex; flex-direction: column; align-items: center; }
          .earth-frame { width: 400px; height: 400px; margin: 0 auto; }
          .hero-visual { justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
