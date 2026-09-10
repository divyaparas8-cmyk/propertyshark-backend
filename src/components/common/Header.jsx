import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Search, Bookmark, Info, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header = ({ transparent = false }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/home', icon: Building2 },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Saved Properties', path: '/saved', icon: Bookmark },
    { name: 'About', path: '/about', icon: Info },
  ];

  const headerBgClass = transparent
    ? 'bg-brand-dark/80 backdrop-blur-md border-b border-white/10 text-white'
    : 'bg-brand-dark text-white border-b border-brand-dark-border shadow-md';

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors duration-200 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/home" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-red-600 flex items-center justify-center shadow-lg shadow-brand-accent/30 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight uppercase text-white flex items-center gap-1">
              Property<span className="text-brand-accent font-black">Intel</span>
            </span>
            <span className="text-[10px] text-gray-400 tracking-wider font-semibold block -mt-1 uppercase">
              NYC Records & Intelligence
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-accent text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: User profile & Logout */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3 border-l border-gray-700/80 pl-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-accent flex items-center justify-center font-bold text-xs uppercase">
                  {user.name ? user.name.slice(0, 2) : 'US'}
                </div>
                <span className="text-sm font-semibold text-gray-200 max-w-[130px] truncate">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-white/10 hover:bg-rose-600 hover:text-white text-gray-300 transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-dark border-b border-brand-dark-border px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                  isActive ? 'bg-brand-accent text-white' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
          {user && (
            <div className="pt-4 border-t border-gray-700 flex flex-col gap-3">
              <div className="flex items-center gap-3 px-2">
                <User className="w-5 h-5 text-brand-accent" />
                <span className="text-sm font-semibold text-white">{user.name} ({user.email})</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-rose-600 text-white font-medium text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
