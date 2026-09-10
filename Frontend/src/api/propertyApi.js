import { apiClient } from '../services/apiClient.js';

export const propertyApi = {
  autocompleteProperties: async (query) => {
    if (!query || query.trim().length < 2) return [];
    try {
      const response = await apiClient.get(`/properties/autocomplete?q=${encodeURIComponent(query)}`);
      return response.data || [];
    } catch (err) {
      console.error('Property autocomplete API error:', err);
      return [];
    }
  },

  resolveProperty: async (input) => {
    try {
      const payload = typeof input === 'string' ? { address: input } : input;
      const response = await apiClient.post('/properties/resolve', payload);
      return response.data;
    } catch (err) {
      console.error('Property identity resolution error:', err);
      throw err;
    }
  },

  searchProperties: async (query) => {
    try {
      const response = await apiClient.get(`/properties/search?q=${encodeURIComponent(query)}`);
      return response.data || [];
    } catch (err) {
      console.error('Property search API error:', err);
      return [];
    }
  },

  getPropertyByBbl: async (bbl) => {
    try {
      const response = await apiClient.get(`/properties/${bbl}`);
      return response.data;
    } catch (err) {
      console.error(`Get property by BBL (${bbl}) error:`, err);
      throw err;
    }
  },
};
