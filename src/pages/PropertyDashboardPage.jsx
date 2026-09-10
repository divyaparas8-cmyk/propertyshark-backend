import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  Bookmark,
  Share2,
  Copy,
  ArrowLeft,
  MapPin,
  FileText,
  DollarSign,
  Percent,
  HardHat,
  ShieldAlert,
  Contact,
  Landmark,
  Layers,
  Check,
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

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Property Intelligence — ${property?.address}`,
          text: `Property Intelligence report for ${property?.address} (BBL: ${property?.bbl})`,
          url: shareUrl,
        });
        addToast('Property URL shared successfully!', 'success');
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(shareUrl);
    addToast('Property URL copied to clipboard!', 'success');
  };

  const handleCopyAddress = () => {
    if (!property) return;
    navigator.clipboard.writeText(`${property.address}, ${property.city}, ${property.state} ${property.zip}`);
    addToast('Property address copied to clipboard!', 'success');
  };

  const handleCopyBBL = () => {
    if (!property) return;
    navigator.clipboard.writeText(property.bbl);
    addToast('BBL Number copied to clipboard!', 'success');
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
      <div className="min-h-screen bg-[#F7F8FC] text-[#111827] flex flex-col font-sans">
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-semibold text-[#667085]">Retrieving NYC Parcel Record BBL {bbl}...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F7F8FC] text-[#111827] flex flex-col font-sans">
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-[#111827] mb-2">Property Record Not Found</h2>
          <p className="text-sm text-[#667085] mb-6">No public parcel record matches BBL {bbl}.</p>
          <Link
            to="/search"
            className="px-6 py-3 bg-[#0A1020] text-white font-bold rounded-xl text-sm hover:bg-[#10182D] transition-colors"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const saved = isSaved(property.bbl);

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#111827] flex flex-col font-sans">
      {/* Property Intelligence Header Banner */}
      <div className="bg-[#0A1020] border-b border-white/10 text-white pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Search</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyAddress}
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy Address"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>COPY ADDRESS</span>
              </button>

              <button
                onClick={handleCopyBBL}
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy BBL"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>COPY BBL</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Share Property Link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>SHARE</span>
              </button>

              <button
                onClick={() => toggleSaveProperty(property.bbl, property.address)}
                className={`px-5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                  saved
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#6D28D9] text-white'
                    : 'bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#6D28D9] text-white hover:opacity-95'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
                <span>{saved ? 'SAVED PROPERTY' : 'SAVE PROPERTY'}</span>
              </button>
            </div>
          </div>

          {/* Title & Identifiers */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-3 py-1 rounded bg-[#2563EB] text-white text-xs font-black uppercase tracking-wider">
                  PROPERTY DASHBOARD
                </span>
                <span className="px-3 py-1 rounded bg-white/10 text-gray-300 text-xs font-mono font-bold uppercase">
                  {property.borough}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {property.address}
              </h1>

              <p className="text-base text-gray-300 font-medium flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#A78BFA] shrink-0" />
                <span>
                  {property.city}, {property.state} {property.zip}
                </span>
              </p>
            </div>

            {/* BBL & BIN Cards */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="bg-[#10182D] px-4 py-3 rounded-2xl border border-white/15">
                <span className="text-gray-400 block text-[10px] font-sans uppercase font-bold tracking-wider mb-0.5">
                  BBL NUMBER
                </span>
                <span className="text-white text-base font-extrabold">{property.bbl}</span>
              </div>
              <div className="bg-[#10182D] px-4 py-3 rounded-2xl border border-white/15">
                <span className="text-gray-400 block text-[10px] font-sans uppercase font-bold tracking-wider mb-0.5">
                  BIN NUMBER
                </span>
                <span className="text-white text-base font-extrabold">{property.bin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tab Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth py-1">
            {tabsConfig.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <Link
                  key={t.id}
                  to={`/property/${bbl}/${t.id}`}
                  className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-[#2563EB] text-[#2563EB] bg-blue-50/50'
                      : 'border-transparent text-[#667085] hover:text-[#111827] hover:border-gray-300'
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

      {/* Main Tab View Component */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
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
