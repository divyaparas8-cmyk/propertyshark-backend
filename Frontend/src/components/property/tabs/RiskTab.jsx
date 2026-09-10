import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const RiskTab = ({ property }) => {
  if (!property) return null;

  return (
    <div className="space-y-6 font-sans text-[#111827]">
      {/* Risk Summary Header Banner */}
      <div className="bg-[#0A1020] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white uppercase">Property Public Record Verification</h2>
              <p className="text-xs text-gray-300 font-mono">BBL: {property.bbl} • BIN: {property.bin || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regulatory & Zoning Overlay Risk */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide border-b border-gray-100 pb-3">
          Regulatory & Zoning Restrictions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-gray-200/80 space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase block">Zoning District</span>
            <span className="text-sm font-extrabold text-gray-900 block">{property.zoning || 'Not available'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-gray-200/80 space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase block">Special District</span>
            <span className="text-sm font-extrabold text-gray-900 block">{property.specialDistrict || 'None'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-gray-200/80 space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase block">Borough</span>
            <span className="text-sm font-extrabold text-gray-900 block">{property.borough || 'Not available'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

