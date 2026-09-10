import React from 'react';
import { ShieldAlert, AlertCircle, Info, Landmark, DollarSign } from 'lucide-react';

export const FinancialsTab = ({ property }) => {
  if (!property) return null;

  const fin = property.financials || {};

  return (
    <div className="space-y-8">
      {/* Mortgage Summary Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Landmark className="w-5 h-5 text-gray-700" />
          <span>Active Mortgage & Financial Encumbrances</span>
        </h3>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-800 font-extrabold text-lg">
            <Info className="w-5 h-5 text-brand-accent shrink-0" />
            <span>{fin.mortgageSummary || 'No active mortgages tied to this property.'}</span>
          </div>

          <div className="inline-block px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs rounded-lg">
            {fin.mortgageNote || 'Not verified from the currently available public API data.'}
          </div>

          <p className="text-xs text-gray-500 pt-2 leading-relaxed">
            Public mortgage encumbrance data requires verified institutional ACRIS recording matches.
          </p>
        </div>
      </div>

      {/* Income & Expenses (RPIE) Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          <span>Real Property Income & Expense (RPIE) Filing</span>
        </h3>

        <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-brand-accent shrink-0" />
            <span>Data Unavailable</span>
          </div>
          <p className="text-xs font-semibold text-rose-800 leading-relaxed">
            {fin.incomeExpenses ||
              'Individual RPIE income/expense data is not currently available in the connected dataset.'}
          </p>
          <p className="text-xs text-gray-500 pt-1">
            Data accuracy compliance strictly prohibits fabricating financial operating revenue or NOI numbers.
          </p>
        </div>
      </div>
    </div>
  );
};
