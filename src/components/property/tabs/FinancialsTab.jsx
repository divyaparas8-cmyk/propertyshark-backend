import React from 'react';
import { Landmark, ShieldAlert, FileText, Info } from 'lucide-react';

export const FinancialsTab = ({ property }) => {
  if (!property) return null;

  return (
    <div className="space-y-8 font-sans text-[#111827]">
      {/* MORTGAGE SUMMARY CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[#2563EB]" />
            <span>MORTGAGE SUMMARY</span>
          </div>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-mono font-bold rounded-md border border-amber-200">
            Not Verified
          </span>
        </h3>

        <div className="p-6 bg-[#F7F8FC] rounded-2xl border border-gray-100">
          <p className="font-bold text-[#111827] text-base mb-1">
            No active mortgages tied to this property.
          </p>
          <p className="text-xs text-[#667085]">
            Mortgage history is unconfirmed in the current public ACRIS dataset for BBL {property.bbl}.
          </p>
        </div>
      </div>

      {/* INCOME & EXPENSES (RPIE) CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#4F46E5]" />
            <span>INCOME & EXPENSES (RPIE)</span>
          </div>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-mono font-bold rounded-md">
            NOT AVAILABLE
          </span>
        </h3>

        <div className="p-6 bg-[#F7F8FC] rounded-2xl border border-gray-100 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-[#667085] leading-relaxed">
            Individual RPIE income/expense data is not currently available in the connected dataset.
          </p>
        </div>
      </div>
    </div>
  );
};
