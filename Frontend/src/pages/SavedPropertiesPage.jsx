import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, ArrowRight, Trash2, MapPin, Building2 } from 'lucide-react';
import { Header } from '../components/common/Header';
import { useSavedProperties } from '../context/SavedPropertiesContext';
import { propertyService } from '../services/propertyService';
import { useToast } from '../context/ToastContext';

export const SavedPropertiesPage = () => {
  const { savedBbls, toggleSaveProperty } = useSavedProperties();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const navigate = useNavigate();

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

  const handleViewProperty = (bbl) => {
    navigate(`/property/${bbl}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#111827] flex flex-col font-sans pt-20">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Header Title */}
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

        {/* Loading State */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-[#667085]">Loading saved properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto my-8">
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
          /* FULL WIDTH PROPERTY LIST */
          <div className="grid gap-6">
            {properties.map((property) => (
              <div
                key={property.bbl}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-4 flex-1">
                  {/* Top Row Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-3 py-1 rounded-md bg-[#0A1020] text-white font-bold tracking-wider uppercase">
                      {property.borough}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-indigo-50 text-[#4F46E5] font-bold border border-indigo-100 uppercase">
                      {property.propertyType}
                    </span>
                    <span className="font-mono text-[#667085] bg-gray-100 px-2.5 py-1 rounded text-xs font-semibold">
                      BBL: {property.bbl}
                    </span>
                    <span className="font-mono text-[#667085] bg-gray-100 px-2.5 py-1 rounded text-xs font-semibold">
                      BIN: {property.bin}
                    </span>
                  </div>

                  {/* Address Heading */}
                  <div>
                    <h3 className="text-2xl font-black text-[#111827] tracking-tight">
                      {property.address}
                    </h3>
                    <p className="text-xs font-semibold text-[#667085] flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>{property.city}, {property.state} {property.zip}</span>
                    </p>
                  </div>

                  {/* Property Meta Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-200/80">
                    <div>
                      <span className="text-[#667085] block font-bold uppercase text-xs tracking-wider mb-1">Owner</span>
                      <span className="font-extrabold text-[#111827] text-sm sm:text-base truncate block">{property.owner}</span>
                    </div>
                    <div>
                      <span className="text-[#667085] block font-bold uppercase text-xs tracking-wider mb-1">Lot / Building Area</span>
                      <span className="font-extrabold text-[#111827] text-sm sm:text-base block">
                        {property.lotAreaSqFt.toLocaleString()} sq ft / {property.buildingAreaSqFt.toLocaleString()} sq ft
                      </span>
                    </div>
                    <div>
                      <span className="text-[#667085] block font-bold uppercase text-xs tracking-wider mb-1">Year Built / Zoning</span>
                      <span className="font-extrabold text-[#111827] text-sm sm:text-base block">
                        {property.yearBuilt} • <span className="text-[#2563EB] font-black">{property.zoning}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[#667085] block font-bold uppercase text-xs tracking-wider mb-1">Commercial FAR</span>
                      <span className="font-extrabold text-[#111827] text-sm sm:text-base block">{property.far.commercial}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column Actions */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                  <button
                    onClick={() => toggleSaveProperty(property.bbl, property.address)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    title="Remove from Saved Portfolio"
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                    <span>Remove</span>
                  </button>

                  <button
                    onClick={() => handleViewProperty(property.bbl)}
                    className="px-6 py-3.5 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#6D28D9] hover:opacity-95 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <span>VIEW PROPERTY</span>
                    <ArrowRight className="w-4 h-4" />
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
