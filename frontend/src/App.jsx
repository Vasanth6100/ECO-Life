import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import LandingPlayground from './pages/LandingPlayground';
import AuthPage from './pages/AuthPage';
import ProfileDashboard from './pages/ProfileDashboard';
import Analytics from './pages/Analytics';
import Progress from './pages/Progress';
import SettingsPage from './pages/SettingsPage';
import BadgesRoom from './pages/BadgesRoom';
import ActivityFeed from './pages/ActivityFeed';
import ActivityTimeline from './pages/ActivityTimeline';
import ChatPage from './pages/ChatPage';
import { AuthProvider, AuthContext } from './context/AuthContext';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontSize: '1.2rem', color: '#27AE60' }}>🌱 Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const DASHBOARD_PATHS = ['/dashboard', '/analytics', '/progress', '/badges', '/feed', '/history', '/settings', '/chat'];

const AppContent = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const isAuthOrLanding = ['/', '/login', '/signup'].includes(location.pathname);
  const isDashboard = DASHBOARD_PATHS.some(p => location.pathname.startsWith(p));

  return (
    <>
      {!isAuthOrLanding && !isDashboard && <Navbar />}
      <Routes>
        <Route path="/"        element={<LandingPlayground />} />
        <Route path="/login"   element={<AuthPage />} />
        <Route path="/signup"  element={<AuthPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><ProfileDashboard /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/progress"  element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/badges"    element={<ProtectedRoute><BadgesRoom /></ProtectedRoute>} />
        <Route path="/feed"      element={<ProtectedRoute><ActivityFeed /></ProtectedRoute>} />
        <Route path="/history"   element={<ProtectedRoute><ActivityTimeline /></ProtectedRoute>} />
        <Route path="/settings"  element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/chat"      element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="*"          element={<LandingPlayground />} />
      </Routes>
      {/* Floating chatbot appears on all protected pages */}
      {user && isDashboard && location.pathname !== '/chat' && <ChatBot />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
