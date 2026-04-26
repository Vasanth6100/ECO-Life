import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, Rss, Award, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', icon: <Home size={24} />, path: '/mobile-profile' },
    { name: 'Activity', icon: <Activity size={24} />, path: '/mobile-timeline' },
    { name: 'Feed', icon: <Rss size={24} />, path: '/mobile-feed' },
    { name: 'Badges', icon: <Award size={24} />, path: '/mobile-badges' },
    { name: 'Profile', icon: <User size={24} />, path: '/mobile-settings' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`nav-item ${isActive ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
