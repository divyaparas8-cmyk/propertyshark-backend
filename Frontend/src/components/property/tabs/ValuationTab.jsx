import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const ValuationTab = ({ property }) => {
  const [lastSaleVisible, setLastSaleVisible] = useState(true);
  const [assessmentVisible, setAssessmentVisible] = useState(true);

  if (!property) return null;

  const { lastSale, assessmentHistory = [], taxInfo, propertyType } = property;
  const rates = taxInfo?.rates || [];

  // Map tax rates by year
  const ratesMap = {};
  rates.forEach((r) => {
    ratesMap[r.year] = r.rate;
  });

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
            {lastSale ? (
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Purchase date</th>
                    <th className="py-3 px-4">Purchase price</th>
                    <th className="py-3 px-4">Document Type</th>
                  </tr>
                </thead>
                <tbody className="text-[#111827] font-medium text-xs sm:text-sm">
                  <tr>
                    <td className="py-3.5 px-4 text-gray-700">Most recent public record</td>
                    <td className="py-3.5 px-4 font-mono">{lastSale.date || lastSale.purchaseDate || 'Not available'}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {lastSale.price || lastSale.purchasePrice
                        ? `$${Number(lastSale.price || lastSale.purchasePrice).toLocaleString()}`
                        : 'Not available'}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">
                      {lastSale.docType || lastSale.transactionType || 'Not available'}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-[#667085] text-sm">
                No recent sale deed recorded in public ACRIS dataset for this parcel.
              </div>
            )}
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
              {assessmentHistory && assessmentHistory.length > 0 ? (
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">Property type</th>
                      <th className="py-3 px-4">Market value</th>
                      <th className="py-3 px-4">Assessed value</th>
                      <th className="py-3 px-4">Taxable value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                    {assessmentHistory.map((row, idx) => {
                      return (
                        <tr key={row.year || idx} className="hover:bg-blue-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-gray-800 font-semibold">{row.year || 'N/A'}</td>
                          <td className="py-3.5 px-4 text-gray-700">
                            {propertyType || 'Not available'}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900">
                            {row.marketValue ? `$${Number(row.marketValue).toLocaleString()}` : 'Not available'}
                          </td>
                          <td className="py-3.5 px-4 text-gray-700">
                            {row.assessedValue ? `$${Number(row.assessedValue).toLocaleString()}` : 'Not available'}
                          </td>
                          <td className="py-3.5 px-4 text-gray-700">
                            {row.taxableValue ? `$${Number(row.taxableValue).toLocaleString()}` : 'Not available'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="p-6 text-center text-[#667085] text-sm">
                  No public assessment history available for this property.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

