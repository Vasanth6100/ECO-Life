import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Factory, Trash2, Zap } from 'lucide-react';

const ProblemSection = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.from('.problem-card', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: sectionRef });

  const problems = [
    {
      icon: <Factory size={32} />,
      title: 'Invisible Impact',
      desc: "It's hard to stay motivated when your actions feel like a drop in the ocean. We make your impact visible.",
      img: '🏭'
    },
    {
      icon: <Trash2 size={32} />,
      title: 'Hero Fatigue',
      desc: 'Trying to save the planet alone feels overwhelming. We unlock the community support to keep going.',
      img: '🗑️'
    },
    {
      icon: <Zap size={32} />,
      title: 'Broken Streaks',
      desc: 'Life happens. Without a playful way to recover, one missed day often leads to giving up entirely.',
      img: '⚡'
    }
  ];

  return (
    <section ref={sectionRef} className="problem-section">
      <div className="container">
        <div className="section-header">
          <span className="badge-red">THE PROBLEM</span>
          <h2>Small actions are being lost in a big mess.</h2>
        </div>

        <div className="grid-3">
          {problems.map((p, i) => (
            <div key={i} className="problem-card">
              <div className="emoji-badge">{p.img}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .problem-section {
          background-color: var(--bg);
          padding: 120px 0;
          text-align: center;
        }
        
        .section-header {
          margin-bottom: 5rem;
        }
        
        .section-header h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          max-width: 800px;
          margin: 1.5rem auto 0;
          letter-spacing: -2px;
        }
        
        .problem-card {
          background: #f0eee2;
          padding: 4rem 2.5rem;
          border-radius: 40px;
          text-align: left;
          position: relative;
          transition: var(--transition);
          border: 1px solid rgba(0,0,0,0.02);
        }
        
        .problem-card:hover {
          transform: translateY(-10px);
          background: white;
          box-shadow: 0 30px 60px rgba(0,0,0,0.05);
        }
        
        .emoji-badge {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          background: white;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.02);
        }
        
        .problem-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1.2rem;
          letter-spacing: -0.5px;
        }
        
        .problem-card p {
          color: var(--text);
          opacity: 0.6;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .problem-card { padding: 3rem 2rem; }
        }
      `}</style>
    </section>
  );
};

export default ProblemSection;
