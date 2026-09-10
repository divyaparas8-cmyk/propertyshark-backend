import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { apiClient } from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pi_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  const { addToast } = useToast();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await apiClient.get('/auth/me');
      if (res?.data?.user) {
        setUser(res.data.user);
        localStorage.setItem('pi_auth_user', JSON.stringify(res.data.user));
      }
    } catch (err) {
      // Unauthenticated or backend unreachable
      if (err.status === 401) {
        setUser(null);
        localStorage.removeItem('pi_auth_user');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, rememberMe = true) => {
    if (!email || !password) {
      addToast('Please enter both email and password', 'error');
      return false;
    }

    try {
      const res = await apiClient.post('/auth/login', { email, password });
      const userData = res?.data?.user || {
        email,
        name: email.split('@')[0],
      };

      setUser(userData);
      if (rememberMe) {
        localStorage.setItem('pi_auth_user', JSON.stringify(userData));
      }
      addToast(`Welcome back, ${userData.name}!`, 'success');
      return true;
    } catch (err) {
      const msg = err.message || 'Login failed. Please check your credentials.';
      addToast(msg, 'error');
      return false;
    }
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

    try {
      const res = await apiClient.post('/auth/signup', {
        name: fullName,
        email,
        password,
        confirmPassword,
      });

      const userData = res?.data?.user || {
        name: fullName,
        email,
      };

      setUser(userData);
      localStorage.setItem('pi_auth_user', JSON.stringify(userData));
      addToast('Account created successfully!', 'success');
      return true;
    } catch (err) {
      const msg = err.message || 'Signup failed. Please try again.';
      addToast(msg, 'error');
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (err) {
      // Ignore logout errors
    } finally {
      setUser(null);
      localStorage.removeItem('pi_auth_user');
      addToast('Logged out successfully', 'info');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, signup, logout }}>
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
