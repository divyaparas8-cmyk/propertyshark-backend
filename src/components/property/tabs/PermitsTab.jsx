import React, { useState } from 'react';
import { FileText, Eye, X, CheckCircle, Info, DollarSign, Calendar, HardHat } from 'lucide-react';

export const PermitsTab = ({ property }) => {
  const [selectedPermit, setSelectedPermit] = useState(null);

  if (!property) return null;

  const permits = property.permits || [];

  return (
    <div className="space-y-8">
      {/* DOB Permits Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-brand-text flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-accent" />
              <span>DOB Permit & Job Filing Records</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              NYC Department of Buildings alteration and work filings (Datasets ic3t-wcy2 & w9ak-ipjd).
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                <th className="py-3.5 px-6">Filing Date</th>
                <th className="py-3.5 px-6">Permit / Job #</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Approved / Action Date</th>
                <th className="py-3.5 px-6">Work Type</th>
                <th className="py-3.5 px-6">Initial Cost</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
              {permits.map((p, idx) => (
                <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-brand-text">{p.date}</td>
                  <td className="py-4 px-6 font-mono font-bold text-gray-900">{p.permitNumber}</td>
                  <td className="py-4 px-6">{p.type}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        p.status.includes('Approved') || p.status.includes('Issued')
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{p.latestActionDate}</td>
                  <td className="py-4 px-6">
                    {p.workType === 'Not Found' ? (
                      <span className="text-gray-400 font-mono text-xs">Not Found</span>
                    ) : (
                      <span className="font-semibold text-gray-900">{p.workType}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">
                    {typeof p.initialCost === 'number' ? `$${p.initialCost.toLocaleString()}` : p.initialCost}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {p.permitNumber !== 'Not Found' ? (
                      <button
                        onClick={() => setSelectedPermit(p)}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-brand-accent hover:text-white text-xs font-bold text-gray-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-mono">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expandable Permit Details Modal */}
      {selectedPermit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-brand-accent flex items-center justify-center">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-text">DOB Permit Specification</h3>
                  <span className="font-mono text-xs text-gray-500">Job #{selectedPermit.permitNumber}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPermit(null)}
                className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold text-xs">Filing Status</span>
                  <span className="font-bold text-gray-900 text-xs">{selectedPermit.filingStatus || 'Approved'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold text-xs">Work Classification</span>
                  <span className="font-bold text-gray-900 text-xs">{selectedPermit.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold text-xs">Primary Applicant</span>
                  <span className="font-bold text-brand-accent text-xs">{selectedPermit.applicant || 'Mohammad Shahid'}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase block mb-1">Scope of Work</span>
                <p className="text-gray-700 text-xs leading-relaxed bg-white p-3 rounded-xl border border-gray-200">
                  {selectedPermit.description || 'General alteration and filing compliant with NYC DOB code requirements.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 text-[11px] font-semibold uppercase block">Initial Estimated Cost</span>
                  <span className="text-base font-extrabold text-emerald-600">
                    ${typeof selectedPermit.initialCost === 'number' ? selectedPermit.initialCost.toLocaleString() : selectedPermit.initialCost}
                  </span>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 text-[11px] font-semibold uppercase block">Action Date</span>
                  <span className="text-base font-extrabold text-gray-900">{selectedPermit.latestActionDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedPermit(null)}
                className="px-5 py-2.5 bg-brand-dark text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
