import React from 'react';
import { DollarSign, FileText, TrendingUp, Calendar, UserCheck, Tag } from 'lucide-react';

export const ValuationTab = ({ property }) => {
  if (!property) return null;

  const sale = property.lastSale || {};
  const assessmentHistory = property.assessmentHistory || [];

  // Data for visual trend chart
  const chartData = [...assessmentHistory].reverse();
  const maxVal = Math.max(...chartData.map((d) => d.marketValue), 2000000);

  return (
    <div className="space-y-8">
      {/* Last Sale Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <span className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Last Sale Transaction
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-gray-100 text-gray-600">
            ACRIS Doc: {sale.documentId || 'Not Found'}
          </span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Purchase Date</span>
            <span className="font-extrabold text-gray-900 text-base mt-1 block">
              {sale.purchaseDate || 'Not Found'}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Purchase Price</span>
            <span className="font-extrabold text-emerald-600 text-xl mt-1 block">
              ${sale.purchasePrice ? sale.purchasePrice.toLocaleString() : 'Not Found'}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Document Type</span>
            <span className="font-extrabold text-brand-text text-base mt-1 block">
              {sale.documentType || 'Not Found'}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Recorded Date</span>
            <span className="font-extrabold text-gray-900 text-base mt-1 block">
              {sale.recordedDate || 'Not Found'}
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Party 1 (Grantor)</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{sale.party1 || 'Not Found'}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Party 2 (Grantee)</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{sale.party2 || 'Not Found'}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Arm's Length Transfer</span>
            <span className="font-bold text-rose-600 mt-0.5 block">{sale.armsLength || 'Not Found'}</span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">Transaction Type</span>
            <span className="font-bold text-gray-500 mt-0.5 block">{sale.transactionType || 'Not Found'}</span>
          </div>
        </div>
      </div>

      {/* Valuation Trend Chart Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-brand-accent" />
          <span>Market Value Growth Trend (10-Year Assessment Roll)</span>
        </h3>

        {/* SVG Chart */}
        <div className="h-64 w-full pt-4 pb-2">
          <div className="h-48 flex items-end justify-between gap-2 border-b border-gray-200 px-2">
            {chartData.map((item, idx) => {
              const heightPct = Math.round((item.marketValue / maxVal) * 100);
              return (
                <div key={item.year} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-brand-dark text-white text-[11px] font-bold py-1 px-2 rounded shadow pointer-events-none whitespace-nowrap z-20">
                    ${item.marketValue.toLocaleString()}
                  </div>

                  <div className="w-full bg-rose-50 rounded-t-lg group-hover:bg-rose-100 transition-colors flex items-end justify-center h-full">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-gradient-to-t from-brand-accent to-rose-400 rounded-t-lg transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-gray-500 pt-3 px-2">
            {chartData.map((item) => (
              <span key={item.year} className="flex-1 text-center">
                {item.year}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment History Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-brand-text">10-Year Assessment History Roll</h3>
          <p className="text-xs text-gray-500 mt-1">Official NYC Department of Finance tax assessment values.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                <th className="py-3.5 px-6">Year</th>
                <th className="py-3.5 px-6">Market Value</th>
                <th className="py-3.5 px-6">Assessed Value</th>
                <th className="py-3.5 px-6">Taxable Value</th>
                <th className="py-3.5 px-6">Tax Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
              {assessmentHistory.map((row) => (
                <tr key={row.year} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-brand-text">{row.year}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">${row.marketValue.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-700">${row.assessedValue.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {row.taxableValue > 0 ? `$${row.taxableValue.toLocaleString()}` : '$0'}
                  </td>
                  <td className="py-4 px-6 font-semibold">Class {row.taxClass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
