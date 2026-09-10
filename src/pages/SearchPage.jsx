import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Building, MapPin, ExternalLink, Filter, Layers, Calendar, User, ArrowLeft, Bookmark } from 'lucide-react';
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

  const handleViewPropertyNewTab = (bbl) => {
    const url = `/property/${bbl}`;
    window.open(url, '_blank');
    addToast(`Opening BBL ${bbl} in new browser window`, 'info');
  };

  const filteredResults = results.filter((item) => {
    if (selectedBorough !== 'ALL' && item.borough.toUpperCase() !== selectedBorough.toUpperCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
      <Header transparent={false} />

      {/* Top Search Controls Bar */}
      <div className="bg-brand-dark border-b border-brand-dark-border py-6 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-gray-400">
            <Link to="/home" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span>/</span>
            <span className="text-brand-accent">Property Search</span>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search address, city, ZIP or BBL..."
                className="w-full pl-12 pr-4 py-3 bg-brand-dark-card border border-gray-700 rounded-xl text-white placeholder-gray-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Results Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-border">
          <div>
            <h1 className="text-2xl font-bold text-brand-text">
              Property Search Results
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing {filteredResults.length} matching public records for{' '}
              <span className="font-semibold text-brand-text">"{queryParam || 'All'}"</span>
            </p>
          </div>

          {/* Borough Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Borough:
            </span>
            {['ALL', 'QUEENS', 'MANHATTAN', 'BROOKLYN'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBorough(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedBorough === b
                    ? 'bg-brand-dark text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center">
            <div className="w-10 h-10 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-gray-500">Querying NYC Public Property Datasets...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredResults.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto my-8">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-brand-text mb-1">No Matching Properties Found</h3>
            <p className="text-sm text-gray-500 mb-6">
              No record matches "{queryParam}". Try searching for sample address <span className="font-mono text-brand-accent">42-07 12th St</span> or BBL <span className="font-mono text-brand-accent">4004580098</span>.
            </p>
            <button
              onClick={() => {
                setSearchInput('42-07 12th St');
                setSearchParams({ q: '42-07 12th St' });
              }}
              className="px-5 py-2.5 bg-brand-dark text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors"
            >
              Search Verified Sample Record
            </button>
          </div>
        )}

        {/* Results Cards List */}
        {!loading && filteredResults.length > 0 && (
          <div className="grid gap-6">
            {filteredResults.map((property) => {
              const saved = isSaved(property.bbl);
              return (
                <div
                  key={property.bbl}
                  className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-3 flex-1">
                    {/* Top Row Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-brand-dark text-white font-bold tracking-wide">
                        {property.borough}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-rose-50 text-brand-accent font-bold border border-rose-200">
                        {property.propertyType}
                      </span>
                      <span className="font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                        BBL: {property.bbl}
                      </span>
                      <span className="font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                        BIN: {property.bin}
                      </span>
                    </div>

                    {/* Address Heading */}
                    <div>
                      <h2 className="text-xl font-extrabold text-brand-text flex items-center gap-2">
                        <span>{property.address}</span>
                      </h2>
                      <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                        {property.city}, {property.state} {property.zip} (Public Record: {property.publicRecordAddress})
                      </p>
                    </div>

                    {/* Property Meta Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs border-t border-gray-100">
                      <div>
                        <span className="text-gray-400 block font-medium">Owner</span>
                        <span className="font-bold text-gray-800 truncate block">{property.owner}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Lot / Building Area</span>
                        <span className="font-bold text-gray-800 block">
                          {property.lotAreaSqFt.toLocaleString()} sq ft / {property.buildingAreaSqFt.toLocaleString()} sq ft
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Year Built / Zoning</span>
                        <span className="font-bold text-gray-800 block">
                          {property.yearBuilt} • {property.zoning}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Commercial FAR</span>
                        <span className="font-bold text-gray-800 block">{property.far.commercial}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Right Side */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    <button
                      onClick={() => toggleSaveProperty(property.bbl, property.address)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        saved
                          ? 'bg-rose-50 border-rose-300 text-brand-accent'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                      title="Save Property"
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-brand-accent' : ''}`} />
                      <span>{saved ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      onClick={() => handleViewPropertyNewTab(property.bbl)}
                      className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white font-bold rounded-xl text-sm shadow-md shadow-brand-accent/30 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
                    >
                      <span>View Property</span>
                      <ExternalLink className="w-4 h-4" />
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
