import { apiClient } from '../services/apiClient.js';

export const savedPropertyApi = {
  getSavedProperties: async () => {
    try {
      const response = await apiClient.get('/saved-properties');
      return response.data || [];
    } catch (err) {
      console.error('Get saved properties API error:', err);
      return [];
    }
  },

  getSavedProperty: async (id) => {
    try {
      const response = await apiClient.get(`/saved-properties/${id}`);
      return response.data;
    } catch (err) {
      console.error(`Get saved property (${id}) API error:`, err);
      throw err;
    }
  },

  saveProperty: async ({ bbl, bin, address }) => {
    try {
      const response = await apiClient.post('/saved-properties', { bbl, bin, address });
      return response.data;
    } catch (err) {
      console.error('Save property API error:', err);
      throw err;
    }
  },

  deleteSavedProperty: async (idOrBbl) => {
    try {
      const response = await apiClient.delete(`/saved-properties/${idOrBbl}`);
      return response.data;
    } catch (err) {
      console.error(`Delete saved property (${idOrBbl}) API error:`, err);
      throw err;
    }
  },

  checkIsSaved: async (bbl) => {
    try {
      const response = await apiClient.get(`/saved-properties/check/${bbl}`);
      return response.data?.isSaved || false;
    } catch (err) {
      return false;
    }
  },
};
