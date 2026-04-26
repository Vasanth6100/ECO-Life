import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data && response.data.token) {
      // Save entire user object (which now includes token) for convenience
      const userData = { ...response.data.user, token: response.data.token };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    }
    return null;
  };

  const register = async (name, email, password, guardian) => {
    const response = await api.post('/auth/register', { name, email, password, guardian });
    if (response.data && response.data.token) {
      const userData = { ...response.data.user, token: response.data.token };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
