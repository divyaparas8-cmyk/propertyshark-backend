import React, { useState } from 'react';
import { Info, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

export const OverviewTab = ({ property }) => {
  const [panelVisible, setPanelVisible] = useState(true);

  if (!property) return null;

  const lotArea = property.lotAreaSqFt || 12000;
  const buildingArea = property.buildingAreaSqFt || 12000;
  const commercialFar = property.far?.commercial || 5;

  const maxBuildableArea = lotArea * commercialFar; // 60,000
  const remainingBuildableArea = Math.max(0, maxBuildableArea - buildingArea); // 48,000

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
          <h2 className="text-xl font-bold text-[#111827]">Overview</h2>
        </div>
        <button
          onClick={() => setPanelVisible(!panelVisible)}
          className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>{panelVisible ? 'Hide panel' : 'Show panel'}</span>
          {panelVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {panelVisible && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs sm:text-sm">
          {/* ================= LEFT COLUMN CARDS ================= */}
          <div className="space-y-6">
            {/* 1. ADDRESS CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Address</h3>
              <InfoRow label="Property address" value={property.address || '42-07 12th St'} />
              <InfoRow
                label="Alternate address(es)"
                value="42-07 - 42-11 12th St / 42-10 - 42-12 13th St"
              />
              <InfoRow label="Zip code" value={property.zip || '11101'} />
              <InfoRow label="Neighborhood" value="Hunters Point" />
              <InfoRow label="Borough" value={property.borough || 'Queens'} />
              <InfoRow label="Block & lot" value="00458-0098" />
            </div>

            {/* 2. OWNER & SALE CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-4">
              <div>
                <h3 className="font-bold text-[#111827] text-base mb-3">Owner</h3>
                <InfoRow label="Name" value={property.owner || 'Jorich, LLC'} isLink />
                <InfoRow label="Address" value="46 Carman St, Massapequa, NY 11758" />
                <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                  <span className="text-[#6B7280] font-medium flex items-center gap-1">
                    Real Owners <Info className="w-3.5 h-3.5 text-gray-400" />
                  </span>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-[#2563EB] hover:bg-blue-50 transition-colors cursor-pointer">
                    View contact
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200/80 space-y-1">
                <InfoRow label="Sale date" value="10/26/2017" />
                <InfoRow label="Sale price" value="$1" />
                <InfoRow label="Arm's length" value="No" />
                <InfoRow label="Transaction type" value="Institutional / lender sale" />
              </div>
            </div>

            {/* 3. PROPERTY TAXES CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Property Taxes</h3>
              <InfoRow label="Tax class" value={property.taxInfo?.taxClass || '4'} />
              <InfoRow label="Property tax" value="$77,295" />
            </div>

            {/* 4. LOT CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Lot</h3>
              <InfoRow label="Lot sq. ft." value={lotArea.toLocaleString()} />
              <InfoRow label="Lot dimensions" value="59.58 ft x 200 ft" />
              <InfoRow label="Ground elevation" value="18 ft" />
              <InfoRow label="Corner lot" value="No" />
              <InfoRow label="Lot shape" value="Regular" />
            </div>

            {/* 5. ZONING CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Zoning</h3>
              <InfoRow label="Zoning districts" value={property.zoning || 'M1-5A'} infoIcon />
              <InfoRow
                label="Special district"
                value="Long Island City Mixed Use District (LIC)"
              />
              <InfoRow label="MIH area" value="No" />
              <InfoRow label="Zoning map" value={property.zoningMap || '9b'} isLink />
            </div>
          </div>

          {/* ================= RIGHT COLUMN CARDS ================= */}
          <div className="space-y-6">
            {/* 1. BUILDING CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Building</h3>
              <InfoRow
                label="Property type"
                value="Factory - Industrial Semi-Fireproof (F4)"
                infoIcon
              />
              <InfoRow label="Square feet" value={buildingArea.toLocaleString()} />
              <InfoRow label="Building dimensions" value="59.42 ft x 200 ft" />
              <InfoRow label="Buildings on lot" value="1" />
              <InfoRow label="Stories" value={property.stories || '1'} />
              <InfoRow label="Roof height" value="17 ft" />
              <InfoRow label="Year built" value={property.yearBuilt || '1931'} />
            </div>

            {/* 2. PROXIMITY CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <InfoRow label="Proximity" value="2-Side abutted" />
              <InfoRow label="Building material" value="Masonry" />
              <InfoRow label="Grade" value="C-" />
            </div>

            {/* 3. USE CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Use</h3>
              <InfoRow label="Commercial units" value={property.units || '2'} />
              <InfoRow label="Factory sq. ft." value="6,000" />
              <InfoRow label="Certificate(s) of occupancy" value="Click here" isLink />
            </div>

            {/* 4. FLOOR AREA RATIO (FAR) CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Floor Area Ratio (FAR)</h3>
              <InfoRow label="Commercial FAR" value={property.far?.commercial || '5'} />
              <InfoRow label="Facility FAR" value={property.far?.facility || '5'} />
              <InfoRow label="Current FAR" value={property.far?.current || '1.00'} infoIcon />
              <InfoRow label="Max buildable area" value={`${maxBuildableArea.toLocaleString()} sq. ft.`} />
              <InfoRow label="Current built area" value={`${buildingArea.toLocaleString()} sq. ft.`} />
              <InfoRow
                label="Buildable area"
                value={`${remainingBuildableArea.toLocaleString()} sq. ft.`}
                infoIcon
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* Helper Component for Table Rows */
const InfoRow = ({ label, value, isLink, infoIcon }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
    <span className="text-[#6B7280] font-medium flex items-center gap-1">
      {label}
      {infoIcon && <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />}
    </span>
    <span
      className={`font-semibold text-right ${
        isLink ? 'text-[#2563EB] hover:underline cursor-pointer' : 'text-[#111827]'
      }`}
    >
      {value}
    </span>
  </div>
);
