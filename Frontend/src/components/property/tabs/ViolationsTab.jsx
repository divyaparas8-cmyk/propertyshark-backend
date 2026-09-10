import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Bell, ExternalLink } from 'lucide-react';

export const ViolationsTab = ({ property }) => {
  const [showHpdViolations, setShowHpdViolations] = useState(true);
  const [show311, setShow311] = useState(true);

  if (!property) return null;

  const complaints311 = Array.isArray(property.complaints311) ? property.complaints311 : [];

  return (
    <div className="space-y-6 font-sans text-[#111827]">
      {/* 1. HPD Violations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              HPD Violations
            </h3>
          </div>
          <button
            onClick={() => setShowHpdViolations(!showHpdViolations)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showHpdViolations ? (
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

        {showHpdViolations && (
          <div className="space-y-5">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Excessive violations can adversely affect the support provided by the NYC Department of Housing Preservation and Development (HPD).
            </p>

            <p className="text-xs text-gray-500 font-medium">
              No active HPD violation records returned for this property. Verify status directly on{' '}
              <a
                href="https://hpdonline.nyc.gov"
                target="_blank"
                rel="noreferrer"
                className="text-[#2563EB] underline hover:text-blue-700 inline-flex items-center gap-0.5"
              >
                HPD Online <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
              .
            </p>

            {/* Alert Notification Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <button className="text-xs font-bold text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 shadow-2xs transition-colors cursor-pointer mr-2">
                    Get property alerts
                  </button>
                  <span className="text-xs text-gray-600">
                    Get e-mail alerts for new property record filings, including deeds, permits, foreclosures or violations.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. 311 Complaints */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              311 Service Complaints ({complaints311.length})
            </h3>
          </div>
          <button
            onClick={() => setShow311(!show311)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {show311 ? (
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

        {show311 && (
          <div className="space-y-4">
            {complaints311.length > 0 ? (
              <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 bg-[#F8F9FA] text-[11px] font-bold text-gray-700">
                      <th className="py-3 px-4 w-28">Created</th>
                      <th className="py-3 px-4 w-20">Agency</th>
                      <th className="py-3 px-4 w-36">Type</th>
                      <th className="py-3 px-4 w-36">Descriptor</th>
                      <th className="py-3 px-4">Disposition</th>
                      <th className="py-3 px-4 w-28">Closed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-800 font-medium">
                    {complaints311.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-gray-600 whitespace-nowrap">
                          {row.createdDate || row.created || 'Not available'}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-gray-900">{row.agency || '311'}</td>
                        <td className="py-3.5 px-4 font-semibold text-gray-900">{row.complaintType || row.type || 'Service Request'}</td>
                        <td className="py-3.5 px-4 text-gray-600">{row.descriptor || '—'}</td>
                        <td className="py-3.5 px-4 text-gray-600 leading-relaxed max-w-md">
                          {row.status || row.disposition || 'Completed'}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-gray-600 whitespace-nowrap">
                          {row.closedDate || row.closed || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-center text-[#667085] text-sm">
                No 311 service complaints recorded in public dataset for this address.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

