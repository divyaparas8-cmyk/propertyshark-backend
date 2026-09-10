import React from 'react';
import { Building, Layers, ShieldCheck, Ruler, Sparkles } from 'lucide-react';

export const OverviewTab = ({ property }) => {
  if (!property) return null;

  return (
    <div className="space-y-8">
      {/* 6 Premium Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
            Property Type
          </span>
          <span className="text-sm font-black text-[#111827] block truncate">{property.propertyType}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
            Lot Area
          </span>
          <span className="text-sm font-black text-[#111827] block">
            {property.lotAreaSqFt.toLocaleString()} sq ft
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
            Building Area
          </span>
          <span className="text-sm font-black text-[#111827] block">
            {property.buildingAreaSqFt.toLocaleString()} sq ft
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
            Year Built
          </span>
          <span className="text-sm font-black text-[#111827] block">{property.yearBuilt}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
            Owner
          </span>
          <span className="text-sm font-black text-[#111827] block truncate" title={property.owner}>
            {property.owner}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
            Zoning
          </span>
          <span className="text-sm font-black text-[#2563EB] block">{property.zoning}</span>
        </div>
      </div>

      {/* Verified Property Details Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Building className="w-5 h-5 text-[#2563EB]" />
          <span>PROPERTY DETAILS</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 text-sm">
          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Address</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.address}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Public Record Address</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.publicRecordAddress}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Borough</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.borough}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">ZIP Code</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.zip}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">BBL Number</span>
            <span className="font-bold font-mono text-[#111827] mt-0.5 block">{property.bbl}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">BIN Number</span>
            <span className="font-bold font-mono text-[#111827] mt-0.5 block">{property.bin}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Owner</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.owner}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Year Built</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.yearBuilt}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Stories</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.stories}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Units</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.units}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Lot Area</span>
            <span className="font-bold text-[#111827] mt-0.5 block">
              {property.lotAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Building Area</span>
            <span className="font-bold text-[#111827] mt-0.5 block">
              {property.buildingAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Commercial Area</span>
            <span className="font-bold text-[#111827] mt-0.5 block">
              {property.commercialAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Factory Area</span>
            <span className="font-bold text-[#111827] mt-0.5 block">
              {property.factoryAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Zoning</span>
            <span className="font-bold text-[#2563EB] mt-0.5 block">{property.zoning}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Special District</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.specialDistrict}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Zoning Map</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.zoningMap}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Current FAR</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.far.current}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Commercial FAR</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.far.commercial}</span>
          </div>

          <div>
            <span className="text-xs text-[#667085] font-bold uppercase tracking-wider block">Facility FAR</span>
            <span className="font-bold text-[#111827] mt-0.5 block">{property.far.facility}</span>
          </div>
        </div>
      </div>

      {/* AIR RIGHTS / FAR SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#4F46E5]" />
            <span>AIR RIGHTS / FAR ANALYSIS</span>
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-[#4F46E5] text-xs font-mono font-bold rounded-md border border-indigo-100">
            M1-5A ZONING
          </span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Lot Area</span>
            <span className="font-black text-[#111827] text-base mt-1 block">
              {property.lotAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Existing Building Area</span>
            <span className="font-black text-[#111827] text-base mt-1 block">
              {property.buildingAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Current FAR</span>
            <span className="font-black text-[#111827] text-base mt-1 block">{property.far.current}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Commercial / Facility FAR</span>
            <span className="font-black text-[#2563EB] text-base mt-1 block">
              {property.far.commercial} / {property.far.facility}
            </span>
          </div>

          <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 col-span-1 sm:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#4F46E5] font-bold uppercase tracking-wider">Maximum Buildable Area</span>
              <span className="px-2 py-0.5 bg-[#4F46E5] text-white text-[10px] font-bold rounded uppercase">
                Calculated
              </span>
            </div>
            <span className="font-black text-[#111827] text-2xl">
              {property.far.maxBuildableSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50/50 rounded-2xl border border-indigo-100 col-span-1 sm:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#6D28D9] font-bold uppercase tracking-wider">Remaining Buildable Area</span>
              <span className="px-2 py-0.5 bg-[#6D28D9] text-white text-[10px] font-bold rounded uppercase">
                Calculated
              </span>
            </div>
            <span className="font-black text-[#2563EB] text-2xl">
              {property.far.remainingBuildableSqFt.toLocaleString()} sq ft
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
