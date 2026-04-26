import React from 'react';

export const CartoonTree = ({ color = "#2d6a4f", scale = 1, className = "" }) => (
  <svg 
    width="100" height="120" viewBox="0 0 100 120" 
    fill="none" xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ transform: `scale(${scale})` }}
  >
    <path d="M45 110V80" stroke="#582f0e" strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="50" r="40" fill={color} />
    <circle cx="30" cy="40" r="15" fill={color} filter="brightness(1.1)" />
    <circle cx="70" cy="45" r="20" fill={color} filter="brightness(0.9)" />
  </svg>
);

export const CartoonBush = ({ color = "#40916c", scale = 1, className = "" }) => (
  <svg 
    width="80" height="50" viewBox="0 0 80 50" 
    fill="none" xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ transform: `scale(${scale})` }}
  >
    <circle cx="20" cy="30" r="20" fill={color} />
    <circle cx="40" cy="20" r="20" fill={color} filter="brightness(1.05)" />
    <circle cx="60" cy="30" r="20" fill={color} filter="brightness(0.95)" />
  </svg>
);

export const CartoonFlower = ({ color = "#ffb703", petalColor = "#ffb703", centerColor = "#fb8500", scale = 1, className = "" }) => (
  <svg 
    width="40" height="60" viewBox="0 0 40 60" 
    fill="none" xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ transform: `scale(${scale})` }}
  >
    <path d="M20 60V35" stroke="#2d6a4f" strokeWidth="2" />
    <path d="M20 50C25 45 30 45 30 50" stroke="#2d6a4f" strokeWidth="2" />
    <circle cx="20" cy="30" r="8" fill={petalColor} />
    <circle cx="12" cy="22" r="8" fill={petalColor} />
    <circle cx="28" cy="22" r="8" fill={petalColor} />
    <circle cx="20" cy="20" r="4" fill={centerColor} />
  </svg>
);

export const Sprout = ({ color = "#74c69d", scale = 1, className = "" }) => (
  <svg 
    width="30" height="30" viewBox="0 0 30 30" 
    fill="none" xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ transform: `scale(${scale})` }}
  >
    <path d="M15 30V15" stroke="#2d6a4f" strokeWidth="2" />
    <path d="M15 15C10 10 5 15 5 15C5 15 10 20 15 15Z" fill={color} />
    <path d="M15 15C20 10 25 15 25 15C25 15 20 20 15 15Z" fill={color} filter="brightness(1.1)" />
  </svg>
);
