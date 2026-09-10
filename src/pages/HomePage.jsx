import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, ShieldCheck, FileText, AlertTriangle, Layers, ArrowRight, Compass, Sparkles, CheckCircle } from 'lucide-react';
import { Header } from '../components/common/Header';
import { useToast } from '../context/ToastContext';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      setErrorMsg('Please enter an address, borough, ZIP, or BBL to search.');
      addToast('Search query cannot be empty', 'error');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }, 300);
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
      {/* Sticky Top Header */}
      <Header transparent={false} />

      {/* Hero Section */}
      <div className="relative bg-brand-dark text-white overflow-hidden py-24 sm:py-32">
        {/* NYC Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center filter brightness-[0.4] saturate-120"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1496871455396-14e568c5ef19?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/75 to-brand-dark z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Comprehensive NYC Public Records Engine</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
            Research Properties. <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-rose-400">
              Understand Every Detail.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
            Explore property records, valuation, permits, violations, zoning and more — all in one place.
          </p>

          {/* Search Bar Component */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Search by address, city, ZIP or BBL (e.g. 42-07 12th St)..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-brand-text placeholder-gray-500 font-medium text-base focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white font-bold rounded-xl shadow-lg shadow-brand-accent/40 flex items-center justify-center gap-2 text-base transition-all transform active:scale-95 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Search Properties</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Validation State */}
            {errorMsg && (
              <p className="mt-2.5 text-sm font-semibold text-rose-400 bg-rose-950/80 border border-rose-800 rounded-lg py-1.5 px-3 inline-block">
                {errorMsg}
              </p>
            )}

            {/* Verified Quick Search Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-300">
              <span className="font-medium text-gray-400">Popular verified records:</span>
              <button
                onClick={() => handleQuickSearch('42-07 12th St')}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-brand-accent hover:text-white border border-white/20 transition-all font-mono"
              >
                42-07 12th St (Queens)
              </button>
              <button
                onClick={() => handleQuickSearch('11101')}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-brand-accent hover:text-white border border-white/20 transition-all font-mono"
              >
                ZIP 11101
              </button>
              <button
                onClick={() => handleQuickSearch('4004580098')}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-brand-accent hover:text-white border border-white/20 transition-all font-mono"
              >
                BBL 4004580098
              </button>
              <button
                onClick={() => handleQuickSearch('350 5th Ave')}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-brand-accent hover:text-white border border-white/20 transition-all font-mono"
              >
                350 5th Ave (Manhattan)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase Grid Section */}
      <div className="py-20 bg-brand-bg border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-brand-text tracking-tight sm:text-4xl mb-4">
              Complete NYC Real Estate Data Intelligence
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to analyze NYC properties, verify public records, and assess potential development rights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-brand-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-3">
                DOB Permits & Filings
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Access full Department of Buildings permit histories, filing dates, approved job numbers, and initial cost estimates.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Verified DOB Permit Records
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Applicant & Contractor Contacts
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-3">
                Zoning & Buildable FAR
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Analyze max allowable commercial, facility, and residential FAR. Automated buildable area calculations.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Max & Remaining Buildable Area
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  E-Designations & Special Districts
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-3">
                Valuation & Tax History
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Review 10-year assessment history, market values, tax classes, actual tax rates, and ACRIS deed transactions.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  10-Year Assessment Roll
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Exact Historical NYC Tax Rates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer Banner */}
      <div className="mt-auto bg-brand-dark py-12 border-t border-brand-dark-border text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-white mb-2">Ready to research an NYC parcel?</h3>
          <p className="text-gray-400 text-sm mb-6">Search by address, BBL, or borough to view full property intelligence.</p>
          <button
            onClick={() => handleQuickSearch('42-07 12th St')}
            className="px-8 py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white font-bold text-sm shadow-lg shadow-brand-accent/30 inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Explore 42-07 12th St Sample</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
