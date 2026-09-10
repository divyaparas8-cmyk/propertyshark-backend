import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pi_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const { addToast } = useToast();

  const login = async (email, password, rememberMe = true) => {
    if (!email || !password) {
      addToast('Please enter both email and password', 'error');
      return false;
    }

    // Mock validation
    const nameFromEmail = email.split('@')[0].replace('.', ' ');
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const userData = {
      email,
      name: formattedName || 'Property Analyst',
      loggedInAt: new Date().toISOString(),
    };

    setUser(userData);
    if (rememberMe) {
      localStorage.setItem('pi_auth_user', JSON.stringify(userData));
    }
    addToast(`Welcome back, ${userData.name}!`, 'success');
    return true;
  };

  const signup = async (fullName, email, password, confirmPassword) => {
    if (!fullName || !email || !password) {
      addToast('Please fill in all required fields', 'error');
      return false;
    }

    if (password !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return false;
    }

    const userData = {
      name: fullName,
      email,
      loggedInAt: new Date().toISOString(),
    };

    setUser(userData);
    localStorage.setItem('pi_auth_user', JSON.stringify(userData));
    addToast('Account created successfully!', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pi_auth_user');
    addToast('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
