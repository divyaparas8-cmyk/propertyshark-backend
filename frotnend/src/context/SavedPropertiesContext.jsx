import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const SavedPropertiesContext = createContext(null);

export const SavedPropertiesProvider = ({ children }) => {
  const [savedBbls, setSavedBbls] = useState(() => {
    const saved = localStorage.getItem('pi_saved_properties');
    return saved ? JSON.parse(saved) : ['4004580098']; // Pre-save 42-07 12th St as default example
  });

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('pi_saved_properties', JSON.stringify(savedBbls));
  }, [savedBbls]);

  const isSaved = (bbl) => savedBbls.includes(bbl);

  const toggleSaveProperty = (bbl, address = 'Property') => {
    if (savedBbls.includes(bbl)) {
      setSavedBbls((prev) => prev.filter((id) => id !== bbl));
      addToast(`Removed ${address} from saved properties`, 'info');
    } else {
      setSavedBbls((prev) => [...prev, bbl]);
      addToast(`Saved ${address} to your portfolio`, 'success');
    }
  };

  return (
    <SavedPropertiesContext.Provider value={{ savedBbls, isSaved, toggleSaveProperty }}>
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
