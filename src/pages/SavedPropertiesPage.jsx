import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ExternalLink, Trash2, MapPin, Building2 } from 'lucide-react';
import { Header } from '../components/common/Header';
import { useSavedProperties } from '../context/SavedPropertiesContext';
import { propertyService } from '../services/propertyService';
import { useToast } from '../context/ToastContext';

export const SavedPropertiesPage = () => {
  const { savedBbls, toggleSaveProperty } = useSavedProperties();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    loadSavedProperties();
  }, [savedBbls]);

  const loadSavedProperties = async () => {
    setLoading(true);
    try {
      const items = [];
      for (const bbl of savedBbls) {
        const p = await propertyService.getPropertyByBBL(bbl);
        if (p) items.push(p);
      }
      setProperties(items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNewTab = (bbl) => {
    window.open(`/property/${bbl}`, '_blank');
    addToast(`Opening BBL ${bbl} in new browser tab`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#111827] flex flex-col font-sans pt-20">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="mb-8 pb-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#111827] flex items-center gap-3">
              <Bookmark className="w-7 h-7 text-[#2563EB] fill-[#2563EB]" />
              <span>Saved Portfolio Properties</span>
            </h1>
            <p className="text-sm text-[#667085] mt-1">
              Quick access to your saved NYC real estate research parcels ({properties.length} saved).
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-[#667085]">Loading saved properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-lg mx-auto my-8">
            <Building2 className="w-12 h-12 text-[#667085] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#111827] mb-2">No Saved Properties</h3>
            <p className="text-sm text-[#667085] mb-6">
              You haven't saved any property records yet. Click "Save Property" on any parcel to bookmark it here.
            </p>
            <Link
              to="/search?q=42-07+12th+St"
              className="px-6 py-3.5 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#6D28D9] text-white font-bold rounded-xl text-sm shadow-md hover:opacity-95 transition-all inline-block"
            >
              Browse Sample Record
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <div
                key={property.bbl}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded bg-[#0A1020] text-white text-xs font-bold uppercase tracking-wider">
                      {property.borough}
                    </span>
                    <span className="font-mono text-xs text-[#667085] font-semibold">BBL: {property.bbl}</span>
                  </div>

                  <h3 className="text-2xl font-black text-[#111827]">{property.address}</h3>
                  <p className="text-xs text-[#667085] font-semibold flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                    {property.city}, {property.state} {property.zip}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100 text-xs">
                    <div>
                      <span className="text-[#667085] block font-medium uppercase text-[11px]">Owner</span>
                      <span className="font-bold text-[#111827] truncate block">{property.owner}</span>
                    </div>
                    <div>
                      <span className="text-[#667085] block font-medium uppercase text-[11px]">Zoning / FAR</span>
                      <span className="font-bold text-[#111827] block">
                        <span className="text-[#2563EB]">{property.zoning}</span> • FAR {property.far.commercial}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => toggleSaveProperty(property.bbl, property.address)}
                    className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>

                  <button
                    onClick={() => handleOpenNewTab(property.bbl)}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#6D28D9] hover:opacity-95 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>VIEW PROPERTY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
