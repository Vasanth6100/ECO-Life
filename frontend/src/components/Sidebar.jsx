import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Trees, Users, Settings, LogOut, Award, ChevronRight, MessageCircle, History } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = React.useContext(AuthContext);
  const level = Math.floor((user?.xp || 0) / 1000) + 1;

  const menuItems = [
    { name: 'Dashboard',    icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Badges',       icon: <Award size={20} />,           path: '/badges' },
    { name: 'Activity Feed',icon: <Users size={20} />,           path: '/feed' },
    { name: 'Timeline',     icon: <History size={20} />,         path: '/history' },
    { name: 'AI Assistant', icon: <MessageCircle size={20} />,   path: '/chat' },
    { name: 'Settings',     icon: <Settings size={20} />,        path: '/settings' },
  ];

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={{
      width: '260px', height: '100vh',
      background: 'var(--card-beige)',
      padding: '32px 20px',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', left: 0, top: 0,
      borderRight: '1px solid rgba(0,0,0,0.06)',
      zIndex: 100, overflowY: 'auto'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <div style={{ width: '44px', height: '44px', background: 'var(--primary-green)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Trees size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--primary-green)', fontWeight: 800, margin: 0 }}>ECOLIFE</h2>
          <div style={{ fontSize: '0.7rem', background: 'var(--highlight-yellow)', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', display: 'inline-block', marginTop: 2 }}>
            LVL {level}
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isChat = item.path === '/chat';
          return (
            <Link
              key={item.name}
              to={item.path}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '13px 16px', borderRadius: '12px',
                textDecoration: 'none',
                color: isActive ? 'white' : isChat ? 'var(--primary-green)' : 'var(--secondary-text)',
                background: isActive ? 'var(--primary-green)' : isChat ? 'rgba(39,174,96,0.1)' : 'transparent',
                fontWeight: isActive || isChat ? '700' : '500',
                fontSize: '0.9rem',
                transition: 'all 0.2s',
                border: isChat && !isActive ? '1.5px solid rgba(39,174,96,0.3)' : 'none',
              }}
            >
              {item.icon}
              <span>{item.name}</span>
              {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 16px', color: '#EF4444', background: 'rgba(239,68,68,0.07)', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem', width: '100%', marginTop: '16px' }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
