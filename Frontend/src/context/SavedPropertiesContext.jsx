import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { apiClient } from '../services/apiClient';

const SavedPropertiesContext = createContext(null);

export const SavedPropertiesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [savedBbls, setSavedBbls] = useState(() => {
    const saved = localStorage.getItem('pi_saved_properties');
    return saved ? JSON.parse(saved) : ['4004580098'];
  });

  const { addToast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      fetchSavedProperties();
    }
  }, [isAuthenticated, user?.id]);

  const fetchSavedProperties = async () => {
    try {
      const res = await apiClient.get('/saved-properties');
      if (res?.data && Array.isArray(res.data)) {
        const bblList = res.data.map((item) => item.bbl);
        setSavedBbls(bblList);
        localStorage.setItem('pi_saved_properties', JSON.stringify(bblList));
      }
    } catch (err) {
      // Unauthenticated or offline fallback
    }
  };

  const isSaved = (bbl) => savedBbls.includes(bbl);

  const toggleSaveProperty = async (bbl, address = 'Property') => {
    const alreadySaved = savedBbls.includes(bbl);

    if (alreadySaved) {
      // Optimistic update
      setSavedBbls((prev) => prev.filter((id) => id !== bbl));
      addToast(`Removed ${address} from saved properties`, 'info');

      try {
        await apiClient.delete(`/saved-properties/bbl/${bbl}`);
      } catch (err) {
        // Fallback
      }
    } else {
      // Optimistic update
      setSavedBbls((prev) => [...prev, bbl]);
      addToast(`Saved ${address} to your portfolio`, 'success');

      try {
        await apiClient.post('/saved-properties', { bbl, address });
      } catch (err) {
        // Fallback
      }
    }
  };

  return (
    <SavedPropertiesContext.Provider value={{ savedBbls, isSaved, toggleSaveProperty, fetchSavedProperties }}>
      {children}
    </SavedPropertiesContext.Provider>
  );
};

export const useSavedProperties = () => {
  const context = useContext(SavedPropertiesContext);
  if (!context) {
    throw new Error('useSavedProperties must be used within SavedPropertiesProvider');
  }
  return context;
};
