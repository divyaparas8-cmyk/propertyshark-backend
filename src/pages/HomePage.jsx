import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ArrowRight, Building2, X, User, LogOut, ShieldCheck } from 'lucide-react';
import { Header } from '../components/common/Header';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user, logout } = useAuth();

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      setErrorMsg('Please enter an address, city, ZIP or BBL.');
      addToast('Please enter a search query', 'error');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }, 250);
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const scrollToSearch = () => {
    const searchContainer = document.getElementById('hero-search-container');
    const searchInput = document.getElementById('hero-search-input');
    if (searchContainer) {
      searchContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (searchInput) {
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    }
  };

  const handleProfileClick = () => {
    addToast(`Signed in as ${user?.name || 'Analyst'} (Analyst Account)`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#111827] flex flex-col font-sans selection:bg-[#4F46E5] selection:text-white pt-20">
      {/* FIXED NAVBAR */}
      <Header />

      {/* 1. HERO + PROPERTY SEARCH SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between bg-[#0A1020] text-white overflow-hidden">
        {/* Background Image: Cinematic NYC skyline */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center filter saturate-110 brightness-[0.7]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1496871455396-14e568c5ef19?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        {/* Dark Navy Overlay + Blue-Purple Gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(180deg, rgba(10, 16, 32, 0.7) 0%, rgba(16, 24, 45, 0.8) 50%, rgba(10, 16, 32, 0.95) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 z-10 opacity-35 mix-blend-overlay"
          style={{
            background: `linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)`,
          }}
        />

        {/* Hero Central Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-16 sm:py-24 w-full">
          {/* Eyebrow + Thin Gradient Line */}
          <div className="inline-flex flex-col items-center mb-6">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#A78BFA] uppercase mb-2">
              PROPERTY INTELLIGENCE
            </span>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] rounded-full" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6 drop-shadow-md">
            Explore Every Property. <br />
            <span className="gradient-text-light">Understand What Matters.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Property records, valuation, permits, violations, zoning and more — connected in one place.
          </p>

          {/* PRIMARY SEARCH BOX */}
          <div id="hero-search-container" className="max-w-[780px] mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex flex-col sm:flex-row items-center gap-2 p-2 bg-[#10182D]/90 border border-white/25 rounded-2xl shadow-2xl backdrop-blur-xl transition-all focus-within:border-[#3B82F6] focus-within:ring-4 focus-within:ring-[#2563EB]/30"
            >
              <div className="relative flex-1 flex items-center w-full">
                <Search className="w-6 h-6 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  id="hero-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Search by address, city, ZIP or BBL..."
                  className="w-full pl-14 pr-10 py-4 h-14 bg-transparent text-white placeholder-gray-400 font-medium text-base sm:text-lg focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-gray-400 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-8 h-14 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] hover:opacity-95 text-white font-black rounded-xl shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 text-sm sm:text-base tracking-wider transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>SEARCH PROPERTY</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {errorMsg && (
              <p className="mt-3 text-xs font-semibold text-rose-400 bg-rose-950/80 border border-rose-800 rounded-lg py-1.5 px-3 inline-block">
                {errorMsg}
              </p>
            )}

            {/* Verified Quick Parcel Suggestions */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
              <span className="font-medium text-gray-400">Quick sample search:</span>
              <button
                type="button"
                onClick={() => handleQuickSearch('42-07 12th St')}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#3B82F6] hover:text-white border border-white/15 transition-all font-mono font-semibold"
              >
                42-07 12th St (Queens)
              </button>
              <button
                type="button"
                onClick={() => handleQuickSearch('4004580098')}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#3B82F6] hover:text-white border border-white/15 transition-all font-mono font-semibold"
              >
                BBL 4004580098
              </button>
              <button
                type="button"
                onClick={() => handleQuickSearch('350 5th Ave')}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#3B82F6] hover:text-white border border-white/15 transition-all font-mono font-semibold"
              >
                350 5th Ave (Manhattan)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE PROPERTY INTELLIGENCE */}
      <section className="py-24 bg-[#F7F8FC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#4F46E5] uppercase block mb-2">
              DISCOVER MORE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight mb-4">
              Explore Property Intelligence
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full mx-auto mb-4" />
            <p className="text-lg text-[#667085] font-normal leading-relaxed">
              Go beyond a basic property record and see the details that shape a property.
            </p>
          </div>

          {/* TWO LARGE IMAGE CARDS */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-lg shadow-gray-200/50 hover:shadow-2xl transition-all duration-500 group flex flex-col">
              <div className="relative h-[320px] sm:h-[400px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
                  alt="NYC commercial property records"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/80 via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 bg-[#0A1020]/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  PARCEL DATA
                </span>
              </div>
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#111827] mb-3">
                    Property Records
                  </h3>
                  <p className="text-[#667085] text-base leading-relaxed mb-6">
                    Explore ownership, building details, lot information, zoning and public records.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#2563EB] hover:text-[#4F46E5] uppercase tracking-wider transition-colors cursor-pointer group-hover:translate-x-1 duration-300"
                >
                  <span>EXPLORE RECORDS →</span>
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-lg shadow-gray-200/50 hover:shadow-2xl transition-all duration-500 group flex flex-col">
              <div className="relative h-[320px] sm:h-[400px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2070&auto=format&fit=crop"
                  alt="NYC street history"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/80 via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 bg-[#0A1020]/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  TIMELINE
                </span>
              </div>
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#111827] mb-3">
                    Property History
                  </h3>
                  <p className="text-[#667085] text-base leading-relaxed mb-6">
                    Review sales, assessments, permits, violations and historical activity.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#2563EB] hover:text-[#4F46E5] uppercase tracking-wider transition-colors cursor-pointer group-hover:translate-x-1 duration-300"
                >
                  <span>VIEW HISTORY →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROPERTY DATA CONNECTED IN ONE PLACE (Full-width cinematic section) */}
      <section className="relative min-h-[550px] sm:min-h-[620px] flex items-center bg-[#0A1020] text-white overflow-hidden py-24">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center filter saturate-110 brightness-75"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        {/* Dark Navy Overlay + Blue/Purple gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(90deg, rgba(10, 16, 32, 0.95) 0%, rgba(17, 28, 53, 0.85) 50%, rgba(49, 46, 129, 0.65) 100%)`,
          }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#A78BFA] uppercase block mb-3">
              CONNECTED DATA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-6">
              Property Data. <br />
              <span className="gradient-text-light">Connected in One Place.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Bring together property records, valuation, permits, violations, zoning and documents to understand the complete property story.
            </p>
            <button
              type="button"
              onClick={scrollToSearch}
              className="px-8 py-4 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] hover:opacity-95 text-white font-bold rounded-xl shadow-xl shadow-indigo-500/30 inline-flex items-center gap-2 text-sm uppercase tracking-wider transition-all transform active:scale-95 cursor-pointer"
            >
              <span>EXPLORE DATA →</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. EVERYTHING YOU NEED TO KNOW ABOUT A PROPERTY (Final main content section) */}
      <section className="py-24 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Text Content */}
            <div className="lg:col-span-5">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#4F46E5] uppercase block mb-3">
                PROPERTY RESEARCH
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#111827] leading-tight tracking-tight mb-6">
                Everything You Need <br className="hidden sm:inline" />
                to Know About a Property
              </h2>
              <p className="text-[#667085] text-lg leading-relaxed mb-8">
                Go beyond a single record. Explore valuation history, taxes, permits, violations, contacts, documents, zoning and development information.
              </p>
              <button
                type="button"
                onClick={scrollToSearch}
                className="px-8 py-4 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 inline-flex items-center gap-2 text-sm uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer"
              >
                <span>START RESEARCH →</span>
              </button>
            </div>

            {/* Right Asymmetric Editorial Image Collage (4 images) */}
            <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
              {/* Image 1: Large Left */}
              <div className="col-span-7 rounded-3xl overflow-hidden shadow-xl border border-gray-100 group h-[380px]">
                <img
                  src="https://images.unsplash.com/photo-1546412414-8035e1776c9a?q=80&w=2070&auto=format&fit=crop"
                  alt="NYC Brownstone"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Stacked Right Column */}
              <div className="col-span-5 flex flex-col gap-4">
                {/* Image 2: Medium Top Right */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 group h-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2070&auto=format&fit=crop"
                    alt="Manhattan Skyline"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Image 3: Medium Bottom Right */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 group h-[184px]">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Architectural details"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Image 4: Overlapping Badge Image */}
              <div className="absolute -bottom-6 left-6 w-36 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block group">
                <img
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop"
                  alt="Aerial city block"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LARGE PREMIUM FOOTER (4-Column Layout) */}
      <footer className="bg-[#080D18] text-white border-t border-white/10 py-16 relative overflow-hidden">
        {/* Subtle Ambient Blue-Purple Gradient Light */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.35) 0%, rgba(37, 99, 235, 0.15) 50%, rgba(8, 13, 24, 0.95) 100%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
            {/* COLUMN 1 — BRAND */}
            <div className="space-y-4">
              <Link to="/home" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#4F46E5] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-black text-lg tracking-wider uppercase text-white">
                  PROPERTY <span className="text-[#A78BFA] font-light">INTELLIGENCE</span>
                </span>
              </Link>
              <p className="text-sm font-semibold text-[#2563EB]">
                Property research made clearer.
              </p>
              <p className="text-xs text-[#98A2B3] leading-relaxed">
                Property Intelligence brings together verified public property data to help users research ownership, valuation, permits, violations, zoning and development information in one place.
              </p>
            </div>

            {/* COLUMN 2 — ABOUT PROPERTY INTELLIGENCE */}
            <div id="about" className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <span>ABOUT PROPERTY INTELLIGENCE</span>
              </h4>
              <p className="text-xs text-[#98A2B3] leading-relaxed">
                Property Intelligence is a property research platform designed to make New York City public property records easier to explore and understand.
              </p>
              <p className="text-xs text-[#98A2B3] leading-relaxed pt-1">
                The platform connects multiple public data sources so users can move from a property address to a clearer view of its history, records and development information.
              </p>
            </div>

            {/* COLUMN 3 — PLATFORM */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
                PLATFORM
              </h4>
              <ul className="space-y-2.5 text-xs text-[#98A2B3]">
                <li>
                  <Link
                    to="/home"
                    className="hover:text-white hover:underline transition-colors block py-0.5"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    onClick={scrollToSearch}
                    className="hover:text-white hover:underline transition-colors text-left py-0.5 cursor-pointer"
                  >
                    Search
                  </button>
                </li>
                <li>
                  <Link
                    to="/saved-properties"
                    className="hover:text-white hover:underline transition-colors block py-0.5"
                  >
                    Saved Properties
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 4 — ACCOUNT */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
                ACCOUNT
              </h4>
              <ul className="space-y-2.5 text-xs text-[#98A2B3]">
                <li className="text-gray-300">
                  Signed in as: <strong className="text-white">{user?.name || 'Analyst'}</strong>
                </li>
                <li>
                  <button
                    onClick={handleProfileClick}
                    className="hover:text-white hover:underline transition-colors cursor-pointer text-left block py-0.5"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-[#A78BFA] hover:text-white hover:underline transition-colors cursor-pointer flex items-center gap-1 py-0.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#98A2B3]">
            <div>© 2026 Property Intelligence. All rights reserved.</div>
            <div className="flex items-center gap-1.5 font-medium text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>Built with verified public data.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
