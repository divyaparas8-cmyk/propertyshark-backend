import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const FinancialsTab = ({ property }) => {
  const [mortgageVisible, setMortgageVisible] = useState(true);
  const [incomeVisible, setIncomeVisible] = useState(true);

  if (!property) return null;

  return (
    <div className="space-y-6 text-[#111827] font-sans">
      {/* 1. MORTGAGE SUMMARY PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Mortgage Summary</h2>
          </div>
          <button
            onClick={() => setMortgageVisible(!mortgageVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{mortgageVisible ? 'Hide panel' : 'Show panel'}</span>
            {mortgageVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {mortgageVisible && (
          <div className="py-2 text-xs sm:text-sm text-gray-700 font-medium">
            {property.financials?.mortgageSummary || 'No active mortgages verified in public datasets.'}
          </div>
        )}
      </div>

      {/* 2. INCOME AND EXPENSES PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Income and Expenses (RPIE)</h2>
          </div>
          <button
            onClick={() => setIncomeVisible(!incomeVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{incomeVisible ? 'Hide panel' : 'Show panel'}</span>
            {incomeVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {incomeVisible && (
          <div className="space-y-4">
            <div className="text-xs text-gray-500 leading-relaxed">
              Income-producing properties with an actual assessed value over $40,000 file annual Real Property Income and Expense (RPIE) statements with the Department of Finance (DOF).
            </div>

            <div className="p-6 text-center text-[#667085] text-sm border border-gray-200/80 rounded-2xl">
              {property.financials?.incomeExpenses || 'RPIE income and expense data not available in public open data for this property.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

