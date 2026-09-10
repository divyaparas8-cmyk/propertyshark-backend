import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Building2,
  Bookmark,
  Share2,
  Copy,
  ArrowLeft,
  XCircle,
  CheckCircle2,
  MapPin,
  FileText,
  DollarSign,
  Percent,
  HardHat,
  ShieldAlert,
  Contact,
  Landmark,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Header } from '../components/common/Header';
import { propertyService } from '../services/propertyService';
import { useSavedProperties } from '../context/SavedPropertiesContext';
import { useToast } from '../context/ToastContext';

// Import Tab Components
import { OverviewTab } from '../components/property/tabs/OverviewTab';
import { ValuationTab } from '../components/property/tabs/ValuationTab';
import { TaxTab } from '../components/property/tabs/TaxTab';
import { PermitsTab } from '../components/property/tabs/PermitsTab';
import { ViolationsTab } from '../components/property/tabs/ViolationsTab';
import { ContactsTab } from '../components/property/tabs/ContactsTab';
import { FinancialsTab } from '../components/property/tabs/FinancialsTab';
import { DocumentsTab } from '../components/property/tabs/DocumentsTab';
import { DevelopmentTab } from '../components/property/tabs/DevelopmentTab';

export const PropertyDashboardPage = () => {
  const { bbl = '4004580098', tab = 'overview' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isSaved, toggleSaveProperty } = useSavedProperties();
  const { addToast } = useToast();

  const activeTab = tab.toLowerCase();

  useEffect(() => {
    loadPropertyData();
  }, [bbl]);

  const loadPropertyData = async () => {
    setLoading(true);
    try {
      const data = await propertyService.getPropertyByBBL(bbl);
      setProperty(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSearch = () => {
    // Attempt window.close() since property opens in a new browser tab/window
    try {
      window.close();
    } catch (e) {
      // Fallback to navigate
    }
    // If window.close() was blocked or not closed, navigate to /search
    setTimeout(() => {
      navigate('/search');
    }, 100);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Property Intelligence — ${property?.address}`,
          text: `Check out property records for ${property?.address} (BBL: ${property?.bbl})`,
          url: shareUrl,
        });
        addToast('Property link shared successfully!', 'success');
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(shareUrl);
    addToast('Property URL copied to clipboard!', 'success');
  };

  const handleCopyDetails = () => {
    if (!property) return;
    const summaryText = `${property.address}, ${property.city}, ${property.state} ${property.zip} | BBL: ${property.bbl} | BIN: ${property.bin} | Owner: ${property.owner} | Zoning: ${property.zoning}`;
    navigator.clipboard.writeText(summaryText);
    addToast('Property details copied to clipboard!', 'success');
  };

  const tabsConfig = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'valuation', label: 'Valuation', icon: DollarSign },
    { id: 'tax', label: 'Tax', icon: Percent },
    { id: 'permits', label: 'Permits', icon: HardHat },
    { id: 'violations', label: 'Violations', icon: ShieldAlert },
    { id: 'contacts', label: 'Contacts', icon: Contact },
    { id: 'financials', label: 'Financials', icon: Landmark },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'development', label: 'Development', icon: Layers },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
        <Header transparent={false} />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-semibold text-gray-500">Retrieving NYC Parcel Record BBL {bbl}...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
        <Header transparent={false} />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Record Not Found</h2>
          <p className="text-sm text-gray-500 mb-6">No public parcel record matches BBL {bbl}.</p>
          <Link
            to="/search"
            className="px-6 py-3 bg-brand-accent text-white font-bold rounded-xl text-sm hover:bg-brand-accent-hover transition-colors"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const saved = isSaved(property.bbl);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
      {/* Header */}
      <Header transparent={false} />

      {/* Property Header Banner */}
      <div className="bg-brand-dark border-b border-brand-dark-border text-white pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Actions Row */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <button
              onClick={handleBackToSearch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Search</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyDetails}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy Summary"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy Details</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Share Property Link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                onClick={() => toggleSaveProperty(property.bbl, property.address)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  saved
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-brand-accent hover:bg-brand-accent-hover text-white shadow-md'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
                <span>{saved ? 'Saved' : 'Save Property'}</span>
              </button>
            </div>
          </div>

          {/* Title & Details */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-brand-accent text-white text-xs font-black uppercase tracking-wider">
                  PROPERTY INTELLIGENCE
                </span>
                <span className="px-2.5 py-0.5 rounded bg-white/10 text-gray-300 text-xs font-mono font-semibold">
                  {property.borough}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {property.address}
              </h1>

              <p className="text-sm text-gray-300 font-medium flex items-center gap-2 mt-1.5">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                <span>
                  {property.city}, {property.state} {property.zip}
                </span>
              </p>
            </div>

            {/* BBL / BIN Badges */}
            <div className="flex items-center gap-3 text-xs font-mono font-semibold">
              <div className="bg-brand-dark-card px-3 py-2 rounded-xl border border-gray-700">
                <span className="text-gray-400 block text-[10px] font-sans uppercase">BBL Number</span>
                <span className="text-white text-sm font-bold">{property.bbl}</span>
              </div>
              <div className="bg-brand-dark-card px-3 py-2 rounded-xl border border-gray-700">
                <span className="text-gray-400 block text-[10px] font-sans uppercase">BIN Number</span>
                <span className="text-white text-sm font-bold">{property.bin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tab Navigation Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth py-1">
            {tabsConfig.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <Link
                  key={t.id}
                  to={`/property/${bbl}/${t.id}`}
                  className={`flex items-center gap-2 px-4 py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-brand-accent text-brand-accent bg-rose-50/50'
                      : 'border-transparent text-gray-500 hover:text-brand-text hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Tab Content View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {activeTab === 'overview' && <OverviewTab property={property} />}
        {activeTab === 'valuation' && <ValuationTab property={property} />}
        {activeTab === 'tax' && <TaxTab property={property} />}
        {activeTab === 'permits' && <PermitsTab property={property} />}
        {activeTab === 'violations' && <ViolationsTab property={property} />}
        {activeTab === 'contacts' && <ContactsTab property={property} />}
        {activeTab === 'financials' && <FinancialsTab property={property} />}
        {activeTab === 'documents' && <DocumentsTab property={property} />}
        {activeTab === 'development' && <DevelopmentTab property={property} />}
      </main>
    </div>
  );
};
