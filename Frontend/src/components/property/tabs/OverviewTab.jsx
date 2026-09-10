import React, { useState } from 'react';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';

export const OverviewTab = ({ property }) => {
  const [panelVisible, setPanelVisible] = useState(true);

  if (!property) return null;

  const lotArea = Number(property.lotAreaSqFt || 0);
  const buildingArea = Number(property.buildingAreaSqFt || 0);
  const commercialFar = Number(property.far?.commercial || 0);

  const maxBuildableArea = lotArea > 0 && commercialFar > 0 ? lotArea * commercialFar : 0;
  const remainingBuildableArea = maxBuildableArea > 0 ? Math.max(0, maxBuildableArea - buildingArea) : 0;

  const blockAndLot = property.bbl && property.bbl.length === 10
    ? `${property.bbl.slice(1, 6)}-${property.bbl.slice(6)}`
    : 'Not available';

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
              <InfoRow label="Property address" value={property.address || 'Not available'} />
              <InfoRow
                label="Alternate address(es)"
                value={property.publicRecordAddress || property.address || 'Not available'}
              />
              <InfoRow label="Zip code" value={property.zip || 'Not available'} />
              <InfoRow label="Neighborhood" value={property.neighborhood || property.borough || 'Not available'} />
              <InfoRow label="Borough" value={property.borough || 'Not available'} />
              <InfoRow label="Block & lot" value={blockAndLot} />
            </div>

            {/* 2. OWNER & SALE CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-4">
              <div>
                <h3 className="font-bold text-[#111827] text-base mb-3">Owner</h3>
                <InfoRow label="Name" value={property.owner || 'Not available'} />
                <InfoRow label="Address" value={property.ownerAddress || 'Not available'} />
              </div>

              <div className="pt-2 border-t border-gray-200/80 space-y-1">
                <InfoRow label="Sale date" value={property.lastSale?.date || 'Not available'} />
                <InfoRow
                  label="Sale price"
                  value={
                    property.lastSale?.price
                      ? `$${Number(property.lastSale.price).toLocaleString()}`
                      : 'Not available'
                  }
                />
                <InfoRow label="Arm's length" value="Not available" />
                <InfoRow label="Transaction type" value={property.lastSale?.docType || 'Not available'} />
              </div>
            </div>

            {/* 3. PROPERTY TAXES CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Property Taxes</h3>
              <InfoRow label="Tax class" value={property.taxInfo?.taxClass || 'Not available'} />
              <InfoRow
                label="Property tax"
                value={
                  property.taxInfo?.annualTax
                    ? `$${Number(property.taxInfo.annualTax).toLocaleString()}`
                    : 'Not available'
                }
              />
            </div>

            {/* 4. LOT CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Lot</h3>
              <InfoRow label="Lot sq. ft." value={lotArea > 0 ? lotArea.toLocaleString() : 'Not available'} />
              <InfoRow label="Lot dimensions" value={property.lotDimensions || 'Not available'} />
              <InfoRow label="Ground elevation" value="Not available" />
              <InfoRow label="Corner lot" value="Not available" />
              <InfoRow label="Lot shape" value="Not available" />
            </div>

            {/* 5. ZONING CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Zoning</h3>
              <InfoRow label="Zoning districts" value={property.zoning || 'Not available'} infoIcon />
              <InfoRow
                label="Special district"
                value={property.specialDistrict || 'Not available'}
              />
              <InfoRow label="MIH area" value="Not available" />
              <InfoRow label="Zoning map" value={property.zoningMap || 'Not available'} />
            </div>
          </div>

          {/* ================= RIGHT COLUMN CARDS ================= */}
          <div className="space-y-6">
            {/* 1. BUILDING CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Building</h3>
              <InfoRow
                label="Property type"
                value={property.propertyType || 'Not available'}
                infoIcon
              />
              <InfoRow label="Square feet" value={buildingArea > 0 ? buildingArea.toLocaleString() : 'Not available'} />
              <InfoRow label="Building dimensions" value={property.buildingDimensions || 'Not available'} />
              <InfoRow label="Buildings on lot" value={property.numBuildings ? String(property.numBuildings) : 'Not available'} />
              <InfoRow label="Stories" value={property.stories ? String(property.stories) : 'Not available'} />
              <InfoRow label="Roof height" value="Not available" />
              <InfoRow label="Year built" value={property.yearBuilt ? String(property.yearBuilt) : 'Not available'} />
            </div>

            {/* 2. PROXIMITY CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <InfoRow label="Proximity" value="Not available" />
              <InfoRow label="Building material" value="Not available" />
              <InfoRow label="Grade" value="Not available" />
            </div>

            {/* 3. USE CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Use</h3>
              <InfoRow label="Commercial units" value={property.units !== null && property.units !== undefined ? String(property.units) : 'Not available'} />
              <InfoRow
                label="Factory sq. ft."
                value={
                  property.factoryAreaSqFt
                    ? Number(property.factoryAreaSqFt).toLocaleString()
                    : 'Not available'
                }
              />
              <InfoRow label="Certificate(s) of occupancy" value="Not available" />
            </div>

            {/* 4. FLOOR AREA RATIO (FAR) CARD */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">Floor Area Ratio (FAR)</h3>
              <InfoRow
                label="Commercial FAR"
                value={property.far?.commercial !== undefined && property.far?.commercial !== null ? String(property.far.commercial) : 'Not available'}
              />
              <InfoRow
                label="Facility FAR"
                value={property.far?.facility !== undefined && property.far?.facility !== null ? String(property.far.facility) : 'Not available'}
              />
              <InfoRow
                label="Current FAR"
                value={
                  property.far?.built !== undefined && property.far?.built !== null
                    ? String(property.far.built)
                    : property.far?.current !== undefined && property.far?.current !== null
                    ? String(property.far.current)
                    : 'Not available'
                }
                infoIcon
              />
              <InfoRow
                label="Max buildable area"
                value={maxBuildableArea > 0 ? `${maxBuildableArea.toLocaleString()} sq. ft.` : 'Not available'}
              />
              <InfoRow
                label="Current built area"
                value={buildingArea > 0 ? `${buildingArea.toLocaleString()} sq. ft.` : 'Not available'}
              />
              <InfoRow
                label="Buildable area"
                value={maxBuildableArea > 0 ? `${remainingBuildableArea.toLocaleString()} sq. ft.` : 'Not available'}
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
        isLink && value !== 'Not available' ? 'text-[#2563EB] hover:underline cursor-pointer' : 'text-[#111827]'
      }`}
    >
      {value}
    </span>
  </div>
);

