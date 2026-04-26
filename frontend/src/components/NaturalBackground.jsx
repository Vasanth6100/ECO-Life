import React, { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CartoonTree, CartoonBush, CartoonFlower, Sprout } from './GreeneryAssets';

const NaturalBackground = () => {
  const bgRef = useRef();

  // Generate memoized random positions for background elements
  const greeneryData = useMemo(() => {
    const assets = [CartoonTree, CartoonBush, CartoonFlower, Sprout];
    return Array.from({ length: 60 }).map((_, i) => ({
      Component: assets[i % assets.length],
      top: `${Math.random() * 800}%`,
      left: `${(i % 2 === 0 ? 0 : 70) + Math.random() * 30}%`,
      scale: 0.3 + Math.random() * 0.8,
      opacity: 0.05 + Math.random() * 0.1,
      rotation: Math.random() * 360,
      depth: 0.5 + Math.random() * 2,
      duration: 10 + Math.random() * 20
    }));
  }, []);

  // Fast leaf particles for scroll feedback
  const particleData = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      top: `${Math.random() * 800}%`,
      left: `${Math.random() * 100}%`,
      size: 5 + Math.random() * 10,
      speed: 2 + Math.random() * 4,
      delay: Math.random() * 5
    }));
  }, []);

  useGSAP(() => {
    const elements = gsap.utils.toArray('.bg-element');
    
    elements.forEach((el, i) => {
      const data = greeneryData[i];
      
      gsap.to(el, {
        y: '+=20',
        x: '+=10',
        rotation: '+=5',
        duration: data.duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to(el, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: data.depth,
        },
        y: (i % 2 === 0 ? -1000 : 1000) * data.depth,
        rotation: data.rotation + 180,
        ease: 'none'
      });
    });

    // Particle scroll animation
    const particles = gsap.utils.toArray('.leaf-particle');
    particles.forEach((p, i) => {
      const data = particleData[i];
      gsap.to(p, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: data.speed,
        },
        x: (i % 2 === 0 ? 500 : -500),
        y: (i % 3 === 0 ? 300 : -300),
        rotation: 720,
        ease: 'none'
      });
    });

    gsap.to('.blob', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
      y: 500,
      scale: 1.5,
      rotation: 90,
      ease: 'none'
    });
  }, { scope: bgRef });

  return (
    <div ref={bgRef} className="natural-bg">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="blob blob-4"></div>

      {greeneryData.map((data, i) => (
        <div 
          key={i} 
          className="bg-element"
          style={{
            position: 'absolute',
            top: data.top,
            left: data.left,
            opacity: data.opacity,
            pointerEvents: 'none',
            zIndex: -1,
            transform: `scale(${data.scale}) rotate(${data.rotation}deg)`
          }}
        >
          <data.Component />
        </div>
      ))}

      {particleData.map((data, i) => (
        <div 
          key={`p-${i}`}
          className="leaf-particle"
          style={{
            position: 'absolute',
            top: data.top,
            left: data.left,
            width: data.size,
            height: data.size * 1.5,
            background: i % 2 === 0 ? '#52b788' : '#74c69d',
            borderRadius: '50% 0 50% 0',
            opacity: 0.1,
            pointerEvents: 'none',
            zIndex: -1
          }}
        />
      ))}

      <style jsx>{`
        .natural-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }
        
        .blob {
          position: fixed;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.05;
          z-index: -2;
        }
        
        .blob-1 { background: radial-gradient(circle, #52b788 0%, transparent 70%); top: -10%; left: -10%; }
        .blob-2 { background: radial-gradient(circle, #ffca3a 0%, transparent 70%); top: 30%; right: -20%; }
        .blob-3 { background: radial-gradient(circle, #a2d2ff 0%, transparent 70%); bottom: 10%; left: 10%; }
        .blob-4 { background: radial-gradient(circle, #b7e4c7 0%, transparent 70%); top: 60%; left: -20%; }
      `}</style>
    </div>
  );
};

export default NaturalBackground;
