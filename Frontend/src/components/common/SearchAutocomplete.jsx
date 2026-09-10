import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, MapPin, Building, ArrowRight } from 'lucide-react';
import { propertyApi } from '../../api/propertyApi';
import { useToast } from '../../context/ToastContext';

export const SearchAutocomplete = ({
  placeholder = 'Search address, city, ZIP or BBL...',
  className = '',
  inputClassName = '',
  buttonClassName = '',
  onSelectSuggestion,
  autoFocus = false,
  showButton = true,
  buttonText = 'SEARCH PROPERTY',
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isResolving, setIsResolving] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const reqSequenceRef = useRef(0);
  const debounceTimerRef = useRef(null);
  const { addToast } = useToast();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle typing with 300ms debounce & stale request protection
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setError(null);
    setSelectedIndex(-1);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const currentSeq = ++reqSequenceRef.current;

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await propertyApi.autocompleteProperties(value.trim());
        // Stale request check
        if (currentSeq === reqSequenceRef.current) {
          setSuggestions(results || []);
          setIsOpen(true);
          setIsLoading(false);
        }
      } catch (err) {
        if (currentSeq === reqSequenceRef.current) {
          setError('Failed to load suggestions');
          setSuggestions([]);
          setIsLoading(false);
        }
      }
    }, 300);
  };

  // Perform Property Identity Resolution & Open Dashboard in New Tab
  const handleSelect = async (item) => {
    setIsOpen(false);
    setIsResolving(true);
    const displayAddress = typeof item === 'string' ? item : item.label || item.address || query;

    setQuery(displayAddress);

    try {
      const resolved = await propertyApi.resolveProperty(item);
      setIsResolving(false);

      if (resolved && resolved.bbl) {
        addToast(`Confirmed BBL: ${resolved.bbl} | BIN: ${resolved.bin || 'N/A'}`, 'success');

        if (onSelectSuggestion) {
          onSelectSuggestion(resolved);
        }

        // Open Property Dashboard in a NEW browser tab/window
        const targetUrl = `/property/${resolved.bbl}/overview`;
        window.open(targetUrl, '_blank');
      } else {
        addToast('Could not resolve BBL/BIN for this property', 'error');
      }
    } catch (err) {
      setIsResolving(false);
      console.error('Resolution error:', err);
      addToast('Address resolution failed. Please try again.', 'error');
    }
  };

  // Keyboard Navigation: Arrow Up, Arrow Down, Enter, Escape
  const handleKeyDown = (e) => {
    if (!isOpen && e.key === 'ArrowDown') {
      if (suggestions.length > 0) setIsOpen(true);
      return;
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isOpen && selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelect(suggestions[selectedIndex]);
      } else if (query.trim()) {
        handleSelect(query.trim());
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setError(null);
    setSelectedIndex(-1);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div ref={dropdownRef} className={`relative w-full z-50 ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) handleSelect(query.trim());
        }}
        className="relative flex flex-col sm:flex-row items-center gap-2 p-2 bg-[#10182D]/95 border border-white/25 rounded-2xl shadow-2xl backdrop-blur-xl transition-all focus-within:border-[#3B82F6] focus-within:ring-4 focus-within:ring-[#2563EB]/30"
      >
        <div className="relative flex-1 flex items-center w-full">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 absolute left-3.5 sm:left-4 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0 && query.trim().length >= 2) setIsOpen(true);
            }}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={`w-full pl-11 sm:pl-14 pr-10 py-3.5 sm:py-4 h-12 sm:h-14 bg-transparent text-white placeholder-gray-400 font-medium text-sm sm:text-lg focus:outline-none ${inputClassName}`}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 text-gray-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {showButton && (
          <button
            type="submit"
            disabled={isLoading || isResolving}
            className={`w-full sm:w-auto px-6 sm:px-8 h-12 sm:h-14 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] hover:opacity-95 text-white font-black rounded-xl shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs sm:text-base tracking-wider transition-all transform active:scale-95 cursor-pointer whitespace-nowrap ${buttonClassName}`}
          >
            {isLoading || isResolving ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <>
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </button>
        )}
      </form>

      {/* DARK SLATE LIQUID GLASS CARD AUTOCOMPLETE DROPDOWN */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 p-1.5 bg-[#0F172A]/85 border border-white/20 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden z-[999] backdrop-blur-3xl ring-1 ring-white/10 text-left font-sans">
          <div className="bg-gradient-to-b from-[#1E293B]/90 via-[#0F172A]/85 to-[#1E293B]/90 rounded-[22px] overflow-hidden p-1 text-left">
            {isLoading && suggestions.length === 0 && (
              <div className="p-5 text-center text-gray-300 text-sm font-medium flex items-center justify-center gap-2.5">
                <Loader2 className="w-5 h-5 animate-spin text-[#60A5FA]" />
                <span>Fetching NYC Planning GeoSearch suggestions...</span>
              </div>
            )}

            {!isLoading && suggestions.length === 0 && query.trim().length >= 2 && (
              <div className="p-5 text-center text-gray-300 text-sm font-medium">
                No matching NYC property suggestions found. Press Enter to search.
              </div>
            )}

            {error && (
              <div className="p-3 text-center text-rose-300 text-xs font-semibold bg-rose-950/50 border border-rose-800/60 rounded-xl">
                {error}
              </div>
            )}

            {suggestions.length > 0 && (
              <ul className="max-h-60 overflow-y-auto space-y-1 py-1 px-0.5 pr-1 text-left">
                {suggestions.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <li
                      key={item.bbl ? `${item.bbl}-${index}` : index}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-2.5 text-left ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 border border-indigo-400/50 text-white shadow-md transform scale-[1.005]'
                          : 'hover:bg-white/10 text-gray-200'
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg shrink-0 transition-all ${
                          isSelected
                            ? 'bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] text-white shadow-md shadow-indigo-500/40'
                            : 'bg-white/10 text-[#60A5FA]'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <div className="text-xs sm:text-sm font-bold text-white truncate tracking-tight drop-shadow-xs text-left">
                          {item.label || item.address}
                        </div>
                        {item.borough && (
                          <div className="text-[11px] text-gray-300 font-semibold truncate mt-0.5 text-left">
                            {item.borough}, NY {item.zip || ''}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
