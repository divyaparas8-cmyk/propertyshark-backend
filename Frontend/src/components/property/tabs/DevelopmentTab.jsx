import React from 'react';
import { Layers, ShieldCheck, Ruler, Compass } from 'lucide-react';

export const DevelopmentTab = ({ property }) => {
  if (!property) return null;

  const dev = property.development || {};
  const eDetails = dev.eDesignationDetails || null;

  const lotArea = Number(property.lotAreaSqFt || 0);
  const buildingArea = Number(property.buildingAreaSqFt || 0);
  const commercialFar = Number(property.far?.commercial || 0);

  const maxBuildableArea = lotArea > 0 && commercialFar > 0 ? lotArea * commercialFar : 0;
  const remainingBuildableArea = maxBuildableArea > 0 ? Math.max(0, maxBuildableArea - buildingArea) : 0;

  return (
    <div className="space-y-8 font-sans text-[#111827]">
      {/* ZONING OVERVIEW */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#2563EB]" />
            <span>ZONING & DISTRICT DESIGNATION</span>
          </div>
          {property.specialDistrict && (
            <span className="px-3 py-1 bg-blue-50 text-[#2563EB] text-xs font-mono font-bold rounded-md border border-blue-100">
              {property.specialDistrict}
            </span>
          )}
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 text-sm">
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Zoning District</span>
            <span className="font-black text-[#2563EB] text-lg mt-1 block">{property.zoning || 'Not available'}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Special District</span>
            <span className="font-bold text-[#111827] text-base mt-1 block">
              {property.specialDistrict || 'Not available'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Zoning Map</span>
            <span className="font-bold text-[#111827] text-base mt-1 block">{property.zoningMap || 'Not available'}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">MIH Area</span>
            <span className="font-semibold text-gray-500 text-sm mt-1 block">{dev.mihArea || 'Not available'}</span>
          </div>

          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
            <span className="text-xs text-[#4F46E5] font-bold uppercase block">E-Designation</span>
            <span className="font-black text-[#4F46E5] text-lg mt-1 block">{dev.eDesignation || 'None'}</span>
          </div>
        </div>
      </div>

      {/* E-DESIGNATION DETAILS CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4F46E5]" />
            <span>ENVIRONMENTAL E-DESIGNATION DETAILS</span>
          </div>
        </h3>

        {eDetails ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm mb-6">
            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Effective Date</span>
              <span className="font-bold text-[#111827] mt-1 block">{eDetails.effectiveDate || 'Not available'}</span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Hazardous Materials</span>
              <span className="font-bold text-gray-700 mt-1 block">{eDetails.hazardousMaterials || 'Not available'}</span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Air Quality</span>
              <span className="font-bold text-gray-700 mt-1 block">{eDetails.airQuality || 'Not available'}</span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Noise Mitigation</span>
              <span className="font-bold text-gray-700 mt-1 block">{eDetails.noise || 'Not available'}</span>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-[#667085] text-sm border border-gray-100 rounded-2xl">
            No environmental E-Designations or environmental restrictions returned for this parcel in public records.
          </div>
        )}
      </div>

      {/* FAR & BUILDABLE AREA CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#6D28D9]" />
            <span>FAR & BUILDABLE AREA METRICS</span>
          </div>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Lot Area</span>
            <span className="font-black text-[#111827] mt-1 block">
              {lotArea > 0 ? `${lotArea.toLocaleString()} sq ft` : 'Not available'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Existing Building Area</span>
            <span className="font-black text-[#111827] mt-1 block">
              {buildingArea > 0 ? `${buildingArea.toLocaleString()} sq ft` : 'Not available'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Current Built FAR</span>
            <span className="font-black text-[#111827] mt-1 block">{property.far?.built || property.far?.current || 'Not available'}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Commercial / Facility FAR</span>
            <span className="font-black text-[#2563EB] mt-1 block">
              {property.far?.commercial || '0'} / {property.far?.facility || '0'}
            </span>
          </div>

          <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 col-span-1 sm:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#4F46E5] font-bold uppercase tracking-wider">
                Maximum Buildable Area
              </span>
            </div>
            <span className="font-black text-[#111827] text-2xl">
              {maxBuildableArea > 0 ? `${maxBuildableArea.toLocaleString()} sq ft` : 'Not available'}
            </span>
          </div>

          <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50/50 rounded-2xl border border-indigo-100 col-span-1 sm:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#6D28D9] font-bold uppercase tracking-wider">
                Remaining Buildable Area
              </span>
            </div>
            <span className="font-black text-[#2563EB] text-2xl">
              {maxBuildableArea > 0 ? `${remainingBuildableArea.toLocaleString()} sq ft` : 'Not available'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

