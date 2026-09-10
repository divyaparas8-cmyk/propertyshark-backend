import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ChevronUp, ChevronDown, Droplets, Building, FileCheck, CheckCircle2 } from 'lucide-react';

export const RiskTab = ({ property }) => {
  const [showFloodRisk, setShowFloodRisk] = useState(true);
  const [showBuildingSafety, setShowBuildingSafety] = useState(true);
  const [showZoningRisk, setShowZoningRisk] = useState(true);

  if (!property) return null;

  const environmentalRisks = [
    { label: 'FEMA Flood Zone', value: 'Zone X (Minimal Hazard)', status: 'Low Risk', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Storm Surge Vulnerability', value: 'Category 3 & Above', status: 'Moderate', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'DEC Environmental Spills', value: 'No Active Records', status: 'Clear', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Sea Level Rise Index', value: 'Low Coastal Exposure', status: 'Minimal', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ];

  const buildingSafetyList = [
    { title: 'Local Law 11 (FISP Façade)', status: 'SAFE (Cycle 9 Compliant)', desc: 'Exterior masonry and façade verified structurally sound by QWEI inspector.' },
    { title: 'Local Law 97 Carbon Emissions', status: 'COMPLIANT', desc: 'Building annual emissions remain below the 2024–2029 GHG emissions limit.' },
    { title: 'DOB Vacate / Emergency Orders', status: 'NONE RECORDED', desc: 'No active DOB vacate, stop-work, or emergency structural orders.' },
    { title: 'HPD Alternative Enforcement', status: 'NOT IN AEP', desc: 'Property is not subject to HPD mandatory enforcement list.' },
  ];

  const regulatoryOverlays = [
    { label: 'Landmark Status', value: 'Not Landmarked', desc: 'Not located in a NYC LPC Historic District.' },
    { label: 'Special District', value: 'MX-8 Overlay', desc: 'Subject to Special Mixed Use District regulations.' },
    { label: 'Unused Air Rights', value: '5,200 sq ft', desc: 'Remaining buildable FAR development rights.' },
    { label: 'Coastal Zone Management', value: 'Out of Zone', desc: 'Not restricted by WRP coastal zone rules.' },
  ];

  return (
    <div className="space-y-6 font-sans text-[#111827]">
      {/* Risk Summary Header Banner */}
      <div className="bg-[#0A1020] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white uppercase">Property Risk Assessment Profile</h2>
              <p className="text-xs text-gray-300 font-mono">BBL: {property.bbl} • Overall Risk Index: LOW</p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
            ✓ Low Risk Profile
          </span>
        </div>
      </div>

      {/* 1. Environmental & Flood Hazard Assessment */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              Flood & Environmental Risk
            </h3>
          </div>
          <button
            onClick={() => setShowFloodRisk(!showFloodRisk)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showFloodRisk ? (
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

        {showFloodRisk && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {environmentalRisks.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FA] border border-gray-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">{item.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.color}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm font-extrabold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Structural & Building Safety Risk */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              Building Safety & Compliance Risk
            </h3>
          </div>
          <button
            onClick={() => setShowBuildingSafety(!showBuildingSafety)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showBuildingSafety ? (
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

        {showBuildingSafety && (
          <div className="space-y-3">
            {buildingSafetyList.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#F8F9FA] border border-gray-200/80">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-xs text-gray-500 pl-6">{item.desc}</p>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold font-mono whitespace-nowrap">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Zoning & Regulatory Restrictions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              Regulatory & Zoning Overlay Risk
            </h3>
          </div>
          <button
            onClick={() => setShowZoningRisk(!showZoningRisk)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showZoningRisk ? (
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

        {showZoningRisk && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regulatoryOverlays.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FA] border border-gray-200/80 space-y-1">
                <span className="text-[11px] font-bold text-gray-500 uppercase block">{item.label}</span>
                <span className="text-sm font-extrabold text-gray-900 block">{item.value}</span>
                <span className="text-[11px] text-gray-500 block leading-tight">{item.desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
