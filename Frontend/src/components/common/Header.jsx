import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Search, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchClick = (e) => {
    if (location.pathname === '/home' || location.pathname === '/') {
      e.preventDefault();
      const searchBox = document.getElementById('hero-search-input');
      const searchContainer = document.getElementById('hero-search-container');
      if (searchContainer) {
        searchContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (searchBox) {
        setTimeout(() => {
          searchBox.focus();
        }, 300);
      }
    } else {
      navigate('/search');
    }
  };

  // Center Navbar links: Only Home & Saved Properties (Search is handled by SEARCH PROPERTY CTA)
  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Saved Properties', path: '/saved-properties' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0A1020] backdrop-blur-md border-b border-white/10 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LEFT: Brand Logo */}
        <Link to="/home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#4F46E5] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-black text-lg sm:text-xl tracking-wider uppercase text-white flex items-center gap-1.5">
              PROPERTY <span className="text-[#A78BFA] font-light">INTELLIGENCE</span>
            </span>
          </div>
        </Link>

        {/* RIGHT: Navigation Links, SEARCH PROPERTY CTA & User / Logout */}
        <div className="hidden md:flex items-center gap-3">
          {/* Desktop Navigation (Home, Saved Properties) placed on right side */}
          <nav className="flex items-center gap-1 mr-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/saved-properties' && location.pathname === '/saved');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/10 shadow-inner'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleSearchClick}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] hover:opacity-95 shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>SEARCH PROPERTY</span>
          </button>

          {user && (
            <div className="flex items-center gap-3 border-l border-white/10 pl-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-gray-200 max-w-[120px] truncate">
                  {user.name || 'Analyst'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A1020] border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/saved-properties' && location.pathname === '/saved');
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleSearchClick(e);
              }}
              className="w-full py-3.5 rounded-xl text-center font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] block shadow-md"
            >
              SEARCH PROPERTY
            </button>
          </div>
          {user && (
            <div className="pt-4 border-t border-white/10 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-bold text-white">{user.name || 'Analyst'}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="px-4 py-2 rounded-lg bg-white/10 text-xs font-semibold text-gray-200 hover:text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
