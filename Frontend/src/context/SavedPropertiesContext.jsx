import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { savedPropertyApi } from '../api/savedPropertyApi';

const SavedPropertiesContext = createContext(null);

export const SavedPropertiesProvider = ({ children }) => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { user } = useAuth();

  // Load saved properties from API when authenticated user changes
  useEffect(() => {
    let isMounted = true;
    const fetchSaved = async () => {
      if (!user) {
        setSavedProperties([]);
        return;
      }
      setLoading(true);
      try {
        const data = await savedPropertyApi.getSavedProperties();
        if (isMounted) {
          setSavedProperties(data || []);
        }
      } catch (err) {
        console.warn('Could not fetch saved properties from API:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSaved();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const savedBbls = savedProperties.map((p) => p.bbl);

  const isSaved = (bbl) => savedBbls.includes(String(bbl));

  const toggleSaveProperty = async (bbl, address = 'Property', bin = null) => {
    const cleanBbl = String(bbl);
    const currentlySaved = isSaved(cleanBbl);

    if (currentlySaved) {
      // Optimistic update
      setSavedProperties((prev) => prev.filter((item) => item.bbl !== cleanBbl));
      addToast(`Removed ${address} from saved properties`, 'info');

      try {
        await savedPropertyApi.deleteSavedProperty(cleanBbl);
      } catch (err) {
        console.error('Delete saved property API error:', err);
      }
    } else {
      // Optimistic update
      const newTemp = { id: `temp-${Date.now()}`, bbl: cleanBbl, bin: bin || '', address };
      setSavedProperties((prev) => [newTemp, ...prev]);
      addToast(`Saved ${address} to your portfolio`, 'success');

      try {
        const created = await savedPropertyApi.saveProperty({ bbl: cleanBbl, bin, address });
        if (created?.savedProperty) {
          setSavedProperties((prev) =>
            prev.map((item) => (item.bbl === cleanBbl ? created.savedProperty : item))
          );
        }
      } catch (err) {
        console.error('Save property API error:', err);
      }
    }
  };

  return (
    <SavedPropertiesContext.Provider
      value={{ savedProperties, savedBbls, isSaved, toggleSaveProperty, loading }}
    >
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
