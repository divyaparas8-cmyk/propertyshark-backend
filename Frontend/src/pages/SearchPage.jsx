import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, Building, MapPin, Filter, ArrowLeft, Bookmark, ArrowRight } from 'lucide-react';
import { Header } from '../components/common/Header';
import { propertyService } from '../services/propertyService';
import { useSavedProperties } from '../context/SavedPropertiesContext';
import { useToast } from '../context/ToastContext';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [searchInput, setSearchInput] = useState(queryParam);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBorough, setSelectedBorough] = useState('ALL');

  const { isSaved, toggleSaveProperty } = useSavedProperties();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchInput(queryParam);
    fetchResults(queryParam);
  }, [queryParam]);

  const fetchResults = async (q) => {
    setLoading(true);
    try {
      const data = await propertyService.searchProperties(q);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSearchParams({ q: searchInput.trim() });
  };

  // Navigate to property dashboard in the same tab
  const handleViewProperty = (bbl) => {
    navigate(`/property/${bbl}`);
  };

  const filteredResults = results.filter((item) => {
    if (selectedBorough !== 'ALL' && item.borough.toUpperCase() !== selectedBorough.toUpperCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#111827] flex flex-col font-sans pt-20">
      <Header />

      {/* Top Search Controls Header Bar */}
      <div className="bg-[#0A1020] border-b border-white/10 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-gray-400">
            <Link to="/home" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-[#A78BFA] font-bold">Property Search</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mb-4">
            Search NYC Properties
          </h1>

          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by address, city, ZIP or BBL (e.g. 42-07 12th St)..."
                className="w-full pl-12 pr-4 py-3.5 bg-[#10182D] border border-white/15 rounded-xl text-white placeholder-gray-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#6D28D9] hover:opacity-95 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Search Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Results Header & Borough Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-2xl font-black text-[#111827]">
              Property Search Results
            </h2>
            <p className="text-sm text-[#667085] mt-1">
              Showing {filteredResults.length} matching parcel records for{' '}
              <span className="font-bold text-[#111827]">"{queryParam || 'All Records'}"</span>
            </p>
          </div>

          {/* Borough Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Borough:
            </span>
            {['ALL', 'QUEENS', 'MANHATTAN', 'BROOKLYN'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBorough(b)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedBorough === b
                    ? 'bg-[#0A1020] text-white shadow-md'
                    : 'bg-white text-[#667085] border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-[#667085]">Connecting to NYC Public Property Datasets...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredResults.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto my-8">
            <Building className="w-12 h-12 text-[#667085] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#111827] mb-2">No Matching Records Found</h3>
            <p className="text-sm text-[#667085] mb-6">
              No record matches "{queryParam}". Try searching for sample address <span className="font-mono font-bold text-[#2563EB]">42-07 12th St</span> or BBL <span className="font-mono font-bold text-[#2563EB]">4004580098</span>.
            </p>
            <button
              onClick={() => {
                setSearchInput('42-07 12th St');
                setSearchParams({ q: '42-07 12th St' });
              }}
              className="px-6 py-3 bg-[#0A1020] text-white rounded-xl text-sm font-bold hover:bg-[#10182D] transition-colors cursor-pointer"
            >
              Search Verified Sample Record
            </button>
          </div>
        )}

        {/* Verified Property Cards Grid */}
        {!loading && filteredResults.length > 0 && (
          <div className="grid gap-6">
            {filteredResults.map((property) => {
              const saved = isSaved(property.bbl);
              return (
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

                  {/* Actions Right Column */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    <button
                      onClick={() => toggleSaveProperty(property.bbl, property.address)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                        saved
                          ? 'bg-indigo-50 border-indigo-200 text-[#4F46E5]'
                          : 'bg-gray-50 border-gray-200 text-[#667085] hover:bg-gray-100'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#4F46E5]' : ''}`} />
                      <span>{saved ? 'Saved' : 'Save Property'}</span>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
