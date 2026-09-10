import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ArrowRight, Building2, X, User, LogOut, ShieldCheck } from 'lucide-react';
import { Header } from '../components/common/Header';
import { SearchAutocomplete } from '../components/common/SearchAutocomplete';
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
    <div className="min-h-screen bg-[#F7F8FC] text-[#111827] flex flex-col font-sans selection:bg-[#4F46E5] selection:text-white pt-16 sm:pt-20">
      {/* FIXED NAVBAR */}
      <Header />

      {/* 1. HERO + PROPERTY SEARCH SECTION */}
      <section
        className="relative z-30 min-h-[80vh] sm:min-h-[90vh] flex flex-col justify-between text-white bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2070&auto=format&fit=crop')`,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark Overlay + Vibrant Tint (z-10) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(180deg, rgba(10, 16, 32, 0.4) 0%, rgba(16, 24, 45, 0.45) 50%, rgba(10, 16, 32, 0.75) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 z-10 opacity-25 mix-blend-overlay"
          style={{
            background: `linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)`,
          }}
        />

        {/* Hero Central Content (relative z-20) */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-12 sm:py-24 w-full">
          {/* Eyebrow + Thin Gradient Line */}
          <div className="inline-flex flex-col items-center mb-4 sm:mb-6">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#A78BFA] uppercase mb-2">
              PROPERTY INTELLIGENCE
            </span>
            <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] rounded-full" />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.12] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6 drop-shadow-xs">
            Explore Every Property. <br />
            <span className="gradient-text-light">Understand What Matters.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10 font-medium leading-relaxed px-2">
            Property records, valuation, permits, violations, zoning and more — connected in one place.
          </p>

          {/* PRIMARY SEARCH BOX */}
          <div id="hero-search-container" className="max-w-[780px] mx-auto relative z-40">
            <SearchAutocomplete
              placeholder="Search address, city, ZIP or BBL..."
              buttonText="SEARCH PROPERTY"
            />
          </div>
        </div>
      </section>

      {/* 2. EXPLORE PROPERTY INTELLIGENCE */}
      <section className="py-16 sm:py-24 bg-[#F7F8FC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#4F46E5] uppercase block mb-2">
              DISCOVER MORE
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-[#111827] tracking-tight mb-3 sm:mb-4">
              Explore Property Intelligence
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-lg text-[#667085] font-normal leading-relaxed">
              Go beyond a basic property record and see the details that shape a property.
            </p>
          </div>

          {/* TWO LARGE IMAGE CARDS */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-lg shadow-gray-200/50 hover:shadow-2xl transition-all duration-500 group flex flex-col">
              <div className="relative h-[220px] sm:h-[320px] lg:h-[400px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
                  alt="NYC commercial property records"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/80 via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 bg-[#0A1020]/80 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-bold px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full uppercase tracking-wider">
                  PARCEL DATA
                </span>
              </div>
              <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-3xl font-black text-[#111827] mb-2 sm:mb-3">
                    Property Records
                  </h3>
                  <p className="text-[#667085] text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    Explore ownership, building details, lot information, zoning and public records.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#2563EB] hover:text-[#4F46E5] uppercase tracking-wider transition-colors cursor-pointer group-hover:translate-x-1 duration-300"
                >
                  <span>EXPLORE RECORDS →</span>
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-lg shadow-gray-200/50 hover:shadow-2xl transition-all duration-500 group flex flex-col">
              <div className="relative h-[220px] sm:h-[320px] lg:h-[400px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2070&auto=format&fit=crop"
                  alt="NYC street history"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020]/80 via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 bg-[#0A1020]/80 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-bold px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full uppercase tracking-wider">
                  TIMELINE
                </span>
              </div>
              <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-3xl font-black text-[#111827] mb-2 sm:mb-3">
                    Property History
                  </h3>
                  <p className="text-[#667085] text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    Review sales, assessments, permits, violations and historical activity.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#2563EB] hover:text-[#4F46E5] uppercase tracking-wider transition-colors cursor-pointer group-hover:translate-x-1 duration-300"
                >
                  <span>VIEW HISTORY →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROPERTY DATA CONNECTED IN ONE PLACE */}
      <section
        className="relative min-h-[420px] sm:min-h-[580px] flex items-center text-white overflow-hidden py-16 sm:py-24 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(90deg, rgba(10, 16, 32, 0.85) 0%, rgba(17, 28, 53, 0.6) 50%, rgba(10, 16, 32, 0.25) 100%)`,
          }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#A78BFA] uppercase block mb-2 sm:mb-3">
              CONNECTED DATA
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-4 sm:mb-6">
              Property Data. <br />
              <span className="gradient-text-light">Connected in One Place.</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Bring together property records, valuation, permits, violations, zoning and documents to understand the complete property story.
            </p>
            <button
              type="button"
              onClick={scrollToSearch}
              className="px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] hover:opacity-95 text-white font-bold rounded-xl shadow-xl shadow-indigo-500/30 inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider transition-all transform active:scale-95 cursor-pointer"
            >
              <span>EXPLORE DATA →</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. EVERYTHING YOU NEED TO KNOW ABOUT A PROPERTY */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Text Content */}
            <div className="lg:col-span-5">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#4F46E5] uppercase block mb-2 sm:mb-3">
                PROPERTY RESEARCH
              </span>
              <h2 className="text-2xl sm:text-5xl font-black text-[#111827] leading-tight tracking-tight mb-4 sm:mb-6">
                Everything You Need <br className="hidden sm:inline" />
                to Know About a Property
              </h2>
              <p className="text-[#667085] text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Go beyond a single record. Explore valuation history, taxes, permits, violations, contacts, documents, zoning and development information.
              </p>
              <button
                type="button"
                onClick={scrollToSearch}
                className="px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer"
              >
                <span>START RESEARCH →</span>
              </button>
            </div>

            {/* Right Asymmetric Editorial Image Collage (Responsive for Mobile) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 relative">
              {/* Image 1: Large Left */}
              <div className="sm:col-span-7 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 group h-[220px] sm:h-[380px]">
                <img
                  src="https://images.unsplash.com/photo-1546412414-8035e1776c9a?q=80&w=2070&auto=format&fit=crop"
                  alt="NYC Brownstone"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Stacked Right Column */}
              <div className="sm:col-span-5 grid grid-cols-2 sm:flex sm:flex-col gap-3 sm:gap-4">
                {/* Image 2: Top Right */}
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-gray-100 group h-[130px] sm:h-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2070&auto=format&fit=crop"
                    alt="Manhattan Skyline"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Image 3: Bottom Right */}
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-gray-100 group h-[130px] sm:h-[184px]">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Architectural details"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Image 4: Overlapping Badge Image (Desktop Only) */}
              <div className="absolute -bottom-6 left-6 w-36 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden md:block group">
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
