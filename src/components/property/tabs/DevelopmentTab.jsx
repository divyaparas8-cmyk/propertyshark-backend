import React from 'react';
import { Layers, AlertCircle, ShieldAlert, Calculator, CheckCircle2, Info, Building } from 'lucide-react';

export const DevelopmentTab = ({ property }) => {
  if (!property) return null;

  const dev = property.development || {};
  const eDetails = dev.eDesignationDetails || {};

  // Calculations
  const lotArea = property.lotAreaSqFt || 12000;
  const buildingArea = property.buildingAreaSqFt || 12000;
  const commercialFar = property.far?.commercial || 5;

  const maxBuildableSqFt = lotArea * commercialFar; // 60,000
  const remainingBuildableSqFt = Math.max(0, maxBuildableSqFt - buildingArea); // 48,000

  return (
    <div className="space-y-8">
      {/* Zoning Overview Grid */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Layers className="w-5 h-5 text-brand-accent" />
          <span>Zoning & Designation Profile</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Manufacturing Zoning</span>
            <span className="text-lg font-black text-brand-accent mt-1 block">{property.zoning || 'M1-5A'}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Special District</span>
            <span className="text-lg font-black text-gray-900 mt-1 block">{property.specialDistrict || 'LIC'}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Zoning Map</span>
            <span className="text-lg font-black text-gray-900 mt-1 block">{property.zoningMap || '9B'}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">MIH Area</span>
            <span className="text-lg font-black text-rose-600 mt-1 block font-mono">{dev.mihArea || 'Not Found'}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">E-Designation</span>
            <span className="text-lg font-black text-brand-accent mt-1 block font-mono">
              {dev.eDesignation || 'E-848'}
            </span>
          </div>
        </div>
      </div>

      {/* E-Designation Details */}
      {dev.eDesignation && dev.eDesignation !== 'None' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
          <h3 className="text-lg font-bold text-brand-text mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <span>E-Designation Environmental Specifications ({dev.eDesignation})</span>
          </h3>

          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-xs text-gray-400 font-semibold block uppercase">Effective Date</span>
                <span className="font-bold text-gray-900 mt-0.5 block">{eDetails.effectiveDate || '11/12/2025'}</span>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-semibold block uppercase">Hazardous Materials</span>
                <span className="font-bold text-rose-600 mt-0.5 block">{eDetails.hazardousMaterials || 'Yes'}</span>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-semibold block uppercase">Air Quality</span>
                <span className="font-bold text-rose-600 mt-0.5 block">{eDetails.airQuality || 'Yes'}</span>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-semibold block uppercase">Noise Standard</span>
                <span className="font-bold text-gray-700 mt-0.5 block">{eDetails.noise || 'No'}</span>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-semibold block uppercase">CEQR Number</span>
                <span className="font-bold font-mono text-gray-900 mt-0.5 block">
                  {eDetails.ceqr || '25DCP001Q'}
                </span>
              </div>

              <div className="sm:col-span-3">
                <span className="text-xs text-gray-400 font-semibold block uppercase">ULURP Numbers</span>
                <span className="font-bold font-mono text-gray-900 mt-0.5 block">
                  {eDetails.ulurp || 'C250176ZMQ; N250177ZRQ'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase mb-1">Detailed Description</span>
              <p className="text-xs text-gray-800 font-medium bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 leading-relaxed">
                {eDetails.description ||
                  'Air Quality - HVAC natural gas with low Nox only; Exhaust stack location limitations; Hazardous Materials* Phase I and Phase II Testing Protocol'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floor Area Ratio (FAR) & Buildable Area Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <span className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            Floor Area Ratio (FAR) & Buildable Area Calculations
          </span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg uppercase tracking-wider">
            Calculated Engine
          </span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold block uppercase">Lot Area</span>
            <span className="text-lg font-extrabold text-gray-900 mt-1 block">
              {lotArea.toLocaleString()} sq ft
            </span>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold block uppercase">Existing Building Area</span>
            <span className="text-lg font-extrabold text-gray-900 mt-1 block">
              {buildingArea.toLocaleString()} sq ft
            </span>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold block uppercase">Current FAR</span>
            <span className="text-lg font-extrabold text-gray-900 mt-1 block">
              {property.far.current}
            </span>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold block uppercase">Commercial FAR</span>
            <span className="text-lg font-extrabold text-brand-accent mt-1 block">
              {property.far.commercial}
            </span>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold block uppercase">Facility FAR</span>
            <span className="text-lg font-extrabold text-gray-900 mt-1 block">
              {property.far.facility}
            </span>
          </div>
        </div>

        {/* Calculated Results Highlights */}
        <div className="grid sm:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100">
          <div className="bg-emerald-50/80 border border-emerald-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Maximum Buildable Area
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-700 text-white text-[10px] font-black rounded uppercase">
                Calculated
              </span>
            </div>
            <span className="text-3xl font-black text-emerald-900 block">
              {maxBuildableSqFt.toLocaleString()} sq ft
            </span>
            <span className="text-xs text-emerald-700 font-medium mt-2 block">
              Formula: Lot Area (12,000 sq ft) × Commercial FAR (5) = 60,000 sq ft
            </span>
          </div>

          <div className="bg-blue-50/80 border border-blue-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                Remaining Buildable Area
              </span>
              <span className="px-2.5 py-0.5 bg-blue-700 text-white text-[10px] font-black rounded uppercase">
                Calculated
              </span>
            </div>
            <span className="text-3xl font-black text-blue-900 block">
              {remainingBuildableSqFt.toLocaleString()} sq ft
            </span>
            <span className="text-xs text-blue-700 font-medium mt-2 block">
              Formula: Max Buildable (60,000) - Existing Building Area (12,000) = 48,000 sq ft
            </span>
          </div>
        </div>
      </div>

      {/* Additional Development Fields Table (Explicit Not Found) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Building className="w-5 h-5 text-gray-500" />
          <span>Surrounding Parcel & Planimetric Specs</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-sm">
          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Frontage</span>
            <span className="font-mono text-gray-500 mt-0.5 block">{dev.frontage || 'Not Found'}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Nearest Wide Street</span>
            <span className="font-mono text-gray-500 mt-0.5 block">{dev.nearestWideStreet || 'Not Found'}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Distance to Wide Street</span>
            <span className="font-mono text-gray-500 mt-0.5 block">{dev.distanceToWideStreet || 'Not Found'}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Rezoning Projects</span>
            <span className="font-mono text-gray-500 mt-0.5 block">{dev.rezoningProjects || 'Not confirmed'}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Planimetric Map</span>
            <span className="font-mono text-gray-500 mt-0.5 block">{dev.planimetricMap || 'Not Found / Not confirmed'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
