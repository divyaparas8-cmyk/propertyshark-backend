import React from 'react';
import { Layers, ShieldCheck, Ruler, AlertTriangle, Map, Compass } from 'lucide-react';

export const DevelopmentTab = ({ property }) => {
  if (!property) return null;

  const dev = property.development || {};
  const eDetails = dev.eDesignationDetails || {
    effectiveDate: '11/12/2025',
    hazardousMaterials: 'Yes',
    airQuality: 'Yes',
    noise: 'No',
    ceqr: '25DCP001Q',
    ulurp: 'C250176ZMQ; N250177ZRQ',
    description:
      'Air Quality - HVAC natural gas with low Nox only; Exhaust stack location limitations; Hazardous Materials* Phase I and Phase II Testing Protocol',
  };

  return (
    <div className="space-y-8 font-sans text-[#111827]">
      {/* ZONING OVERVIEW */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#2563EB]" />
            <span>ZONING & DISTRICT DESIGNATION</span>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-[#2563EB] text-xs font-mono font-bold rounded-md border border-blue-100">
            LIC SPECIAL DISTRICT
          </span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 text-sm">
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Manufacturing Zoning</span>
            <span className="font-black text-[#2563EB] text-lg mt-1 block">{property.zoning || 'M1-5A'}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Special District</span>
            <span className="font-bold text-[#111827] text-base mt-1 block">
              {property.specialDistrict || 'LIC'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Zoning Map</span>
            <span className="font-bold text-[#111827] text-base mt-1 block">{property.zoningMap || '9B'}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">MIH Area</span>
            <span className="font-semibold text-gray-500 text-sm mt-1 block">{dev.mihArea || 'Not Found'}</span>
          </div>

          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
            <span className="text-xs text-[#4F46E5] font-bold uppercase block">E-Designation</span>
            <span className="font-black text-[#4F46E5] text-lg mt-1 block">{dev.eDesignation || 'E-848'}</span>
          </div>
        </div>
      </div>

      {/* E-DESIGNATION DETAILS CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4F46E5]" />
            <span>ENVIRONMENTAL E-DESIGNATION DETAILS (E-848)</span>
          </div>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-mono font-bold rounded-md border border-amber-200">
            ENVIRONMENTAL RESTRICTIONS
          </span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm mb-6">
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Effective Date</span>
            <span className="font-bold text-[#111827] mt-1 block">{eDetails.effectiveDate}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Hazardous Materials</span>
            <span className="font-black text-rose-600 mt-1 block">{eDetails.hazardousMaterials}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Air Quality</span>
            <span className="font-black text-rose-600 mt-1 block">{eDetails.airQuality}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Noise Mitigation</span>
            <span className="font-bold text-gray-500 mt-1 block">{eDetails.noise}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">CEQR Number</span>
            <span className="font-mono font-bold text-[#2563EB] mt-1 block">{eDetails.ceqr}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100 col-span-1 sm:col-span-3">
            <span className="text-xs text-[#667085] font-bold uppercase block">ULURP Numbers</span>
            <span className="font-mono font-bold text-[#111827] mt-1 block">{eDetails.ulurp}</span>
          </div>
        </div>

        <div className="p-5 bg-indigo-50/40 rounded-2xl border border-indigo-100">
          <span className="text-xs text-[#4F46E5] font-bold uppercase block mb-1">
            E-Designation Requirement Description
          </span>
          <p className="text-xs font-medium text-[#111827] leading-relaxed">{eDetails.description}</p>
        </div>
      </div>

      {/* FAR & BUILDABLE AREA CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#6D28D9]" />
            <span>FAR & BUILDABLE AREA METRICS</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#2563EB] uppercase">MAX FAR 5.0</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Lot Area</span>
            <span className="font-black text-[#111827] mt-1 block">
              {property.lotAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Existing Building Area</span>
            <span className="font-black text-[#111827] mt-1 block">
              {property.buildingAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Current FAR</span>
            <span className="font-black text-[#111827] mt-1 block">{property.far.current}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold block uppercase">Commercial / Facility FAR</span>
            <span className="font-black text-[#2563EB] mt-1 block">
              {property.far.commercial} / {property.far.facility}
            </span>
          </div>

          <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 col-span-1 sm:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#4F46E5] font-bold uppercase tracking-wider">
                Maximum Buildable Area
              </span>
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
              <span className="text-xs text-[#6D28D9] font-bold uppercase tracking-wider">
                Remaining Buildable Area
              </span>
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

      {/* ADDITIONAL STREET & MAP METRICS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Compass className="w-5 h-5 text-gray-500" />
          <span>STREET FRONTAGE & REZONING INFORMATION</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Frontage</span>
            <span className="font-semibold text-gray-500 mt-1 block">{dev.frontage || 'Not Found'}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Nearest Wide Street</span>
            <span className="font-semibold text-gray-500 mt-1 block">
              {dev.nearestWideStreet || 'Not Found'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Distance to Wide Street</span>
            <span className="font-semibold text-gray-500 mt-1 block">
              {dev.distanceToWideStreet || 'Not Found'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Rezoning Projects</span>
            <span className="font-semibold text-gray-500 mt-1 block">
              {dev.rezoningProjects || 'Not Confirmed'}
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100 col-span-1 sm:col-span-2">
            <span className="text-xs text-[#667085] font-bold uppercase block">Planimetric Map</span>
            <span className="font-semibold text-gray-500 mt-1 block">
              {dev.planimetricMap || 'Not Found / Not Confirmed'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
