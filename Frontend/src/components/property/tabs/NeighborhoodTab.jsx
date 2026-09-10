import React, { useState } from 'react';
import { MapPin, Compass, ChevronUp, ChevronDown } from 'lucide-react';

export const NeighborhoodTab = ({ property }) => {
  const [showOverview, setShowOverview] = useState(true);

  if (!property) return null;

  const neighborhoodStats = [
    { label: 'Borough', value: property.borough || 'Not available', icon: MapPin },
    { label: 'Zip Code', value: property.zip || 'Not available', icon: Compass },
  ];

  return (
    <div className="space-y-6 font-sans text-[#111827]">
      {/* 1. Neighborhood Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              Neighborhood & Location Overview
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
              Located in <strong className="text-gray-900">{property.borough || 'New York'}</strong> ({property.zip || 'NY'}), this parcel is positioned within the NYC public tax and zoning registry.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </div>
  );
};

