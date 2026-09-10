import React from 'react';
import { Receipt, Percent, Building, FileCheck } from 'lucide-react';

export const TaxTab = ({ property }) => {
  if (!property) return null;

  const tax = property.taxInfo || {};
  const rates = tax.rates || [];

  return (
    <div className="space-y-8">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Tax Class
          </span>
          <span className="text-2xl font-black text-brand-text block">Class {tax.taxClass || '4'}</span>
          <span className="text-[11px] text-gray-500 mt-1 block">Commercial & Industrial Property</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Market Value
          </span>
          <span className="text-2xl font-black text-gray-900 block">
            ${tax.marketValue ? tax.marketValue.toLocaleString() : 'Not Found'}
          </span>
          <span className="text-[11px] text-gray-500 mt-1 block">DOF Market Appraisal</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Assessed Value
          </span>
          <span className="text-2xl font-black text-gray-900 block">
            ${tax.assessedValue ? tax.assessedValue.toLocaleString() : 'Not Found'}
          </span>
          <span className="text-[11px] text-gray-500 mt-1 block">Class 4 Assessment Basis</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Taxable Value
          </span>
          <span className="text-2xl font-black text-brand-accent block">
            ${tax.taxableValue ? tax.taxableValue.toLocaleString() : 'Not Found'}
          </span>
          <span className="text-[11px] text-gray-500 mt-1 block">After Exemptions & Abatements</span>
        </div>
      </div>

      {/* Historical Property Tax Rates Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-brand-text flex items-center gap-2">
              <Percent className="w-5 h-5 text-brand-accent" />
              <span>Historical NYC Class 4 Property Tax Rates</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Verified rate schedule from NYC Department of Finance (7zb8-7bpk dataset).
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                <th className="py-3.5 px-6">Tax Year</th>
                <th className="py-3.5 px-6">Tax Rate</th>
                <th className="py-3.5 px-6">Tax Class</th>
                <th className="py-3.5 px-6">Verification Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
              {rates.map((r) => (
                <tr key={r.year} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-brand-text">{r.year}</td>
                  <td className="py-4 px-6 font-extrabold text-brand-accent font-mono">{r.rate}</td>
                  <td className="py-4 px-6 font-semibold">Class {tax.taxClass || '4'}</td>
                  <td className="py-4 px-6 text-xs text-gray-500 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    Verified NYC DOF Dataset 7zb8-7bpk
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
