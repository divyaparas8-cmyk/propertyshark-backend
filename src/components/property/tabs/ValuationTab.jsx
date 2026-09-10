import React from 'react';
import { DollarSign, FileText, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export const ValuationTab = ({ property }) => {
  if (!property) return null;

  const { lastSale, assessmentHistory = [] } = property;

  // Compute maximum market value for trend bar visualization
  const maxMarketValue = Math.max(...assessmentHistory.map((item) => item.marketValue), 2000000);

  return (
    <div className="space-y-8 font-sans text-[#111827]">
      {/* LAST SALE CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <DollarSign className="w-5 h-5 text-[#2563EB]" />
          <span>LAST SALE RECORD</span>
        </h3>

        {lastSale ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Purchase Date</span>
              <span className="font-bold text-[#111827] mt-1 block">{lastSale.purchaseDate}</span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Purchase Price</span>
              <span className="font-black text-[#2563EB] text-lg mt-1 block">
                {lastSale.purchasePrice === 1 ? '$1 (Industrial Dev Agency Transfer)' : `$${lastSale.purchasePrice.toLocaleString()}`}
              </span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Document Type</span>
              <span className="font-bold text-[#111827] mt-1 block">{lastSale.documentType}</span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Document ID</span>
              <span className="font-mono font-bold text-[#111827] text-xs mt-1 block truncate">
                {lastSale.documentId}
              </span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Recorded Date</span>
              <span className="font-bold text-[#111827] mt-1 block">{lastSale.recordedDate}</span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Party 1 (Grantor)</span>
              <span className="font-bold text-[#111827] mt-1 block truncate" title={lastSale.party1}>
                {lastSale.party1}
              </span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Party 2 (Grantee)</span>
              <span className="font-bold text-[#111827] mt-1 block truncate" title={lastSale.party2}>
                {lastSale.party2}
              </span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
              <span className="text-xs text-[#667085] font-bold uppercase block">Arm's Length / Type</span>
              <span className="font-semibold text-gray-500 mt-1 block">
                {lastSale.armsLength || 'Not Found'} • {lastSale.transactionType || 'Not Found'}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#667085]">No verified last sale transaction recorded.</p>
        )}
      </div>

      {/* VALUATION TREND VISUAL CHART */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#4F46E5]" />
            <span>10-YEAR ASSESSMENT & MARKET VALUE TREND</span>
          </div>
          <span className="text-xs text-[#667085] font-bold uppercase">NYC Tax Class 4</span>
        </h3>

        <div className="space-y-4 pt-2">
          {assessmentHistory.map((item) => {
            const percentage = Math.round((item.marketValue / maxMarketValue) * 100);
            return (
              <div key={item.year} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="font-mono text-[#111827] w-20">{item.year}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[#667085]">Assessed: ${item.assessedValue.toLocaleString()}</span>
                    <span className="text-[#2563EB] font-black">Market: ${item.marketValue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-[#F7F8FC] h-3.5 rounded-full overflow-hidden border border-gray-100 flex">
                  <div
                    className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ASSESSMENT HISTORY TABLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm overflow-hidden">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Calendar className="w-5 h-5 text-[#6D28D9]" />
          <span>HISTORICAL ASSESSMENT ROLL (10 YEARS)</span>
        </h3>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F7F8FC] text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                <th className="py-3.5 px-4 rounded-l-xl">Year</th>
                <th className="py-3.5 px-4">Market Value</th>
                <th className="py-3.5 px-4">Assessed Value</th>
                <th className="py-3.5 px-4">Taxable Value</th>
                <th className="py-3.5 px-4 rounded-r-xl">Tax Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[#111827]">
              {assessmentHistory.map((row) => (
                <tr key={row.year} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">{row.year}</td>
                  <td className="py-3.5 px-4 font-black">${row.marketValue.toLocaleString()}</td>
                  <td className="py-3.5 px-4">${row.assessedValue.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    {row.taxableValue > 0 ? `$${row.taxableValue.toLocaleString()}` : '$0'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-[#4F46E5]">
                    Tax Class {row.taxClass}
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
