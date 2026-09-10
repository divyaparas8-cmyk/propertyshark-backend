import React from 'react';
import { Building, Layers, MapPin, Calendar, User, Ruler, CheckCircle } from 'lucide-react';

export const OverviewTab = ({ property }) => {
  if (!property) return null;

  return (
    <div className="space-y-8">
      {/* Summary Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Property Type
          </span>
          <span className="text-sm font-extrabold text-brand-text block">{property.propertyType}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Lot Area
          </span>
          <span className="text-sm font-extrabold text-brand-text block">
            {property.lotAreaSqFt.toLocaleString()} sq ft
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Building Area
          </span>
          <span className="text-sm font-extrabold text-brand-text block">
            {property.buildingAreaSqFt.toLocaleString()} sq ft
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Year Built
          </span>
          <span className="text-sm font-extrabold text-brand-text block">{property.yearBuilt}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Owner
          </span>
          <span className="text-sm font-extrabold text-brand-text block truncate" title={property.owner}>
            {property.owner}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Zoning
          </span>
          <span className="text-sm font-extrabold text-brand-accent block">{property.zoning}</span>
        </div>
      </div>

      {/* Property Details Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Building className="w-5 h-5 text-brand-accent" />
          <span>Verified Property Details</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 text-sm">
          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Address</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.address}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Public Record Address</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.publicRecordAddress}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Borough</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.borough}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">ZIP Code</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.zip}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">BBL Number</span>
            <span className="font-bold font-mono text-gray-900 mt-0.5 block">{property.bbl}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">BIN Number</span>
            <span className="font-bold font-mono text-gray-900 mt-0.5 block">{property.bin}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Owner</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.owner}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Year Built</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.yearBuilt}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Stories</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.stories}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Units</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.units}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Lot Area</span>
            <span className="font-bold text-gray-900 mt-0.5 block">
              {property.lotAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Building Area</span>
            <span className="font-bold text-gray-900 mt-0.5 block">
              {property.buildingAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Commercial Area</span>
            <span className="font-bold text-gray-900 mt-0.5 block">
              {property.commercialAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Factory Area</span>
            <span className="font-bold text-gray-900 mt-0.5 block">
              {property.factoryAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Zoning</span>
            <span className="font-bold text-brand-accent mt-0.5 block">{property.zoning}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Special District</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.specialDistrict}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Zoning Map</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.zoningMap}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Current FAR</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.far.current}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Commercial FAR</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.far.commercial}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Facility FAR</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{property.far.facility}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
