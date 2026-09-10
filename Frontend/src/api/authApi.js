import { apiClient } from '../services/apiClient.js';

export const authApi = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (err) {
      console.error('Login API error:', err);
      throw err;
    }
  },

  signup: async (userData) => {
    try {
      const response = await apiClient.post('/auth/signup', userData);
      return response.data;
    } catch (err) {
      console.error('Signup API error:', err);
      throw err;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data?.user || null;
    } catch (err) {
      return null;
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout', {});
      return response.data;
    } catch (err) {
      console.error('Logout API error:', err);
    }
  },
};
