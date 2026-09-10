import { apiClient } from './apiClient';
import mockProperties from '../data/mockProperties.json';

/**
 * Frontend property service calling Node.js Express Backend REST API
 * Fallbacks to mock dataset if backend service is unreachable.
 */
export const propertyService = {
  searchProperties: async (query) => {
    try {
      const q = query ? encodeURIComponent(query.trim()) : '';
      const res = await apiClient.get(`/properties/search?q=${q}`);
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      console.warn('[Property Service API Fallback] Using local property dataset for search.');
    }

    // Fallback search
    if (!query || !query.trim()) {
      return mockProperties;
    }
    const qLower = query.trim().toLowerCase();
    return mockProperties.filter((p) =>
      p.bbl.toLowerCase().includes(qLower) ||
      p.bin.toLowerCase().includes(qLower) ||
      p.address.toLowerCase().includes(qLower) ||
      p.city.toLowerCase().includes(qLower) ||
      p.borough.toLowerCase().includes(qLower) ||
      p.owner.toLowerCase().includes(qLower)
    );
  },

  getPropertyByBBL: async (bbl) => {
    try {
      const res = await apiClient.get(`/properties/${bbl}`);
      if (res?.data) {
        return res.data;
      }
    } catch (err) {
      console.warn(`[Property Service API Fallback] Using local property record for BBL ${bbl}.`);
    }

    // Fallback single property
    const property = mockProperties.find((p) => p.bbl === bbl);
    return property || mockProperties[0];
  },
};
