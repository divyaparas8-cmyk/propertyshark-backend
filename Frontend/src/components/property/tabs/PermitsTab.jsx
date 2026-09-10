import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const PermitsTab = ({ property }) => {
  const [permitsVisible, setPermitsVisible] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  if (!property) return null;

  const permits = Array.isArray(property.permits) ? property.permits : [];

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="space-y-6 text-[#111827] font-sans">
      {/* 1. PERMITS PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Permits ({permits.length})</h2>
          </div>
          <button
            onClick={() => setPermitsVisible(!permitsVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{permitsVisible ? 'Hide panel' : 'Show panel'}</span>
            {permitsVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {permitsVisible && (
          <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
            {permits.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                    <th className="py-3 px-4">Filing date</th>
                    <th className="py-3 px-4">Job number</th>
                    <th className="py-3 px-4">Job type</th>
                    <th className="py-3 px-4">Job status</th>
                    <th className="py-3 px-4">Work type</th>
                    <th className="py-3 px-4">Initial cost</th>
                    <th className="py-3 px-4 text-center">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                  {permits.map((row, index) => {
                    const rowId = row.id || row.jobNumber || String(index);
                    const isExpanded = expandedRow === rowId;
                    return (
                      <React.Fragment key={rowId}>
                        <tr className="hover:bg-blue-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-gray-800 whitespace-nowrap">
                            {row.filingDate || 'Not available'}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-gray-900 font-semibold">
                            {row.jobNumber || 'Not available'}
                          </td>
                          <td className="py-3.5 px-4 text-gray-800">{row.jobType || 'Not available'}</td>
                          <td className="py-3.5 px-4">
                            <span className="block text-gray-900 font-medium">{row.jobStatus || 'Not available'}</span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-700">{row.workType || 'General'}</td>
                          <td className="py-3.5 px-4 font-bold text-gray-900">
                            {row.initialCost ? `$${Number(row.initialCost).toLocaleString()}` : 'Not available'}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => toggleRow(rowId)}
                              className="p-1 rounded-lg text-[#2563EB] hover:bg-blue-50 transition-colors cursor-pointer"
                              title="Toggle Details"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-[#2563EB]" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-[#2563EB]" />
                              )}
                            </button>
                          </td>
                        </tr>

                        {/* Expandable Inline Details Row */}
                        {isExpanded && (
                          <tr className="bg-blue-50/40">
                            <td colSpan={7} className="p-4 border-t border-blue-100">
                              <div className="bg-white p-4 rounded-xl border border-blue-100 text-xs space-y-2">
                                <div>
                                  <span className="text-gray-500 font-bold uppercase block text-[10px]">
                                    Applicant Contact
                                  </span>
                                  <span className="font-semibold text-gray-900">{row.applicant || 'Not available'}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 font-bold uppercase block text-[10px]">
                                    Description of Work
                                  </span>
                                  <span className="text-gray-700 leading-relaxed">{row.description || 'No description provided.'}</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-[#667085] text-sm">
                No public DOB permits found for this property (BIN {property.bin || 'N/A'}).
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

