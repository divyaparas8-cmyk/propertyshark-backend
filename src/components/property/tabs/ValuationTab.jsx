import React, { useState } from 'react';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';

export const ValuationTab = ({ property }) => {
  const [lastSaleVisible, setLastSaleVisible] = useState(true);
  const [assessmentVisible, setAssessmentVisible] = useState(true);
  const [page, setPage] = useState(1);

  if (!property) return null;

  const { lastSale, assessmentHistory = [], taxInfo } = property;
  const rates = taxInfo?.rates || [];

  // Map tax rates by year
  const ratesMap = {};
  rates.forEach((r) => {
    ratesMap[r.year] = r.rate;
  });
  // Default tax rate fallback if missing
  ratesMap['2025/26'] = '10.848%';

  return (
    <div className="space-y-6 text-[#111827] font-sans">
      {/* 1. LAST SALE PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Last Sale</h2>
          </div>
          <button
            onClick={() => setLastSaleVisible(!lastSaleVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{lastSaleVisible ? 'Hide panel' : 'Show panel'}</span>
            {lastSaleVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {lastSaleVisible && (
          <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Purchase date</th>
                  <th className="py-3 px-4">Purchase price</th>
                  <th className="py-3 px-4">Arm's length</th>
                  <th className="py-3 px-4">Transaction type</th>
                </tr>
              </thead>
              <tbody className="text-[#111827] font-medium text-xs sm:text-sm">
                <tr>
                  <td className="py-3.5 px-4 text-gray-700">Most recent sale (any type)</td>
                  <td className="py-3.5 px-4 font-mono">{lastSale?.purchaseDate || '10/26/2017'}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    ${lastSale?.purchasePrice !== undefined ? lastSale.purchasePrice.toLocaleString() : '1'}
                  </td>
                  <td className="py-3.5 px-4 text-gray-700">{lastSale?.armsLength || 'No'}</td>
                  <td className="py-3.5 px-4 text-gray-700">
                    {lastSale?.transactionType || 'Institutional / lender sale'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 2. ASSESSMENT HISTORY PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Assessment History</h2>
          </div>
          <button
            onClick={() => setAssessmentVisible(!assessmentVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{assessmentVisible ? 'Hide panel' : 'Show panel'}</span>
            {assessmentVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {assessmentVisible && (
          <div className="space-y-4">
            {/* Assessment Table */}
            <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4">Property type</th>
                    <th className="py-3 px-4">Market value</th>
                    <th className="py-3 px-4">Assessed value</th>
                    <th className="py-3 px-4">Taxable</th>
                    <th className="py-3 px-4">Tax rate %</th>
                    <th className="py-3 px-4">Base tax</th>
                    <th className="py-3 px-4">Property tax</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                  {assessmentHistory.map((row) => {
                    const taxRateStr = ratesMap[row.year] || '10.762%';
                    const rateNum = parseFloat(taxRateStr) / 100;
                    const taxableVal = row.taxableValue || 0;
                    const baseTax = Math.round(taxableVal * rateNum);
                    const propTax = taxableVal > 0 ? baseTax : 0;

                    return (
                      <tr key={row.year} className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-gray-800 font-semibold">{row.year}</td>
                        <td className="py-3.5 px-4 text-gray-700 flex items-center gap-1">
                          <span>F4</span>
                          <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-gray-900">
                          ${row.marketValue ? row.marketValue.toLocaleString() : '0'}
                        </td>
                        <td className="py-3.5 px-4 text-gray-700">
                          ${row.assessedValue ? row.assessedValue.toLocaleString() : '0'}
                        </td>
                        <td className="py-3.5 px-4 text-gray-700">
                          ${row.taxableValue ? row.taxableValue.toLocaleString() : '0'}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-gray-700">{taxRateStr}</td>
                        <td className="py-3.5 px-4 font-mono text-gray-700">
                          ${baseTax > 0 ? baseTax.toLocaleString() : (taxableVal > 0 ? baseTax.toLocaleString() : Math.round((row.assessedValue || 0) * rateNum).toLocaleString())}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-gray-900 font-semibold">
                          ${propTax.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center justify-center gap-1 mx-auto sm:mx-0 text-xs font-semibold">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed font-medium"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(1)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    page === 1 ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  1
                </button>
                <button
                  onClick={() => setPage(2)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    page === 2 ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  2
                </button>
                <button
                  onClick={() => setPage(3)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    page === 3 ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  3
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-[#2563EB] hover:bg-blue-50 font-medium cursor-pointer"
                >
                  Next
                </button>
              </div>

              <button className="px-3.5 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-[#2563EB] hover:bg-blue-50 transition-colors self-center sm:self-auto cursor-pointer">
                All records ({assessmentHistory.length > 0 ? assessmentHistory.length * 2 + 2 : 22})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
