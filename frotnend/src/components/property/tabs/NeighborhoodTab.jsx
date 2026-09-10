import React, { useState } from 'react';
import { MapPin, Navigation, TrendingUp, Compass, ChevronUp, ChevronDown, Award, Bus, Train, BookOpen, ShieldCheck } from 'lucide-react';

export const NeighborhoodTab = ({ property }) => {
  const [showOverview, setShowOverview] = useState(true);
  const [showTransit, setShowTransit] = useState(true);
  const [showMarket, setShowMarket] = useState(true);

  if (!property) return null;

  const transitLines = [
    { line: '7 Train', station: 'Queensboro Plaza', distance: '0.2 miles', walkTime: '4 min walk', badgeColor: 'bg-purple-600 text-white' },
    { line: 'N / W Train', station: '39th Ave - Dutch Kills', distance: '0.3 miles', walkTime: '6 min walk', badgeColor: 'bg-amber-400 text-gray-900' },
    { line: 'E / M / R Train', station: 'Queens Plaza', distance: '0.4 miles', walkTime: '8 min walk', badgeColor: 'bg-blue-600 text-white' },
    { line: 'Q102 Bus', station: '12th St & 42nd Ave', distance: '0.05 miles', walkTime: '1 min walk', badgeColor: 'bg-cyan-600 text-white' },
  ];

  const neighborhoodStats = [
    { label: 'Neighborhood', value: property.borough || 'Long Island City', icon: MapPin },
    { label: 'Community District', value: 'Queens CD 2', icon: Compass },
    { label: 'School District', value: 'NYC District 30', icon: BookOpen },
    { label: 'Safety Index', value: 'Low Risk (88/100)', icon: ShieldCheck },
  ];

  const marketMetrics = [
    { label: 'Median Price / Sq Ft', value: '$845 / sq ft', change: '+3.8% YoY' },
    { label: 'Neighborhood Median Sale', value: '$950,000', change: '+2.1% YoY' },
    { label: 'Average Days on Market', value: '45 Days', change: '-5 days YoY' },
    { label: 'Rental Yield (Est.)', value: '5.2%', change: 'Stable' },
  ];

  return (
    <div className="space-y-6 font-sans text-[#111827]">
      {/* 1. Neighborhood Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              Neighborhood Overview
            </h3>
          </div>
          <button
            onClick={() => setShowOverview(!showOverview)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showOverview ? (
              <>
                Hide panel <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show panel <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {showOverview && (
          <div className="space-y-6">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Located in <strong className="text-gray-900">{property.borough}</strong> ({property.zip}), this parcel is positioned within a vibrant commercial and mixed-use industrial district with rapid accessibility to Midtown Manhattan and major transit corridors.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {neighborhoodStats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={idx} className="bg-[#F8F9FA] p-4 rounded-2xl border border-gray-200/80 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{stat.label}</span>
                      <IconComponent className="w-4 h-4 text-[#2563EB]" />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold text-gray-900">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. Public Transit & Accessibility */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              Public Transit & Connectivity
            </h3>
          </div>
          <button
            onClick={() => setShowTransit(!showTransit)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showTransit ? (
              <>
                Hide panel <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show panel <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {showTransit && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {transitLines.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#F8F9FA] border border-gray-200/80">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black font-mono shadow-2xs ${item.badgeColor}`}>
                      {item.line}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{item.station}</h4>
                      <p className="text-[11px] text-gray-500">{item.distance}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {item.walkTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Market Trends & Analytics */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              Neighborhood Market Trends
            </h3>
          </div>
          <button
            onClick={() => setShowMarket(!showMarket)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showMarket ? (
              <>
                Hide panel <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show panel <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {showMarket && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {marketMetrics.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FA] border border-gray-200/80">
                <span className="text-[11px] font-bold text-gray-500 block uppercase mb-1">{item.label}</span>
                <span className="text-base sm:text-xl font-black text-gray-900 block">{item.value}</span>
                <span className="text-xs font-bold text-emerald-600 block mt-1">{item.change}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
