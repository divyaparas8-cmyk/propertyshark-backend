import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const TaxTab = ({ property }) => {
  const [taxBillVisible, setTaxBillVisible] = useState(true);

  if (!property) return null;

  const taxInfo = property.taxInfo || {
    taxClass: '4',
    marketValue: 1822000,
    assessedValue: 819900,
    taxableValue: 712530,
  };

  const marketVal = taxInfo.marketValue ? taxInfo.marketValue.toLocaleString() : '1,822,000';
  const assessedVal = taxInfo.assessedValue ? taxInfo.assessedValue.toLocaleString() : '819,900';
  const transitionalVal = taxInfo.taxableValue ? taxInfo.taxableValue.toLocaleString() : '712,530';

  return (
    <div className="space-y-6 text-[#111827] font-sans">
      {/* 1. TAX BILL PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Tax Bill</h2>
          </div>
          <button
            onClick={() => setTaxBillVisible(!taxBillVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{taxBillVisible ? 'Hide panel' : 'Show panel'}</span>
            {taxBillVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {taxBillVisible && (
          <div className="space-y-5">
            {/* Top Summary Gray Banner */}
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-200/80 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-gray-600 font-medium">
                Property tax bill for 7/1/2026 to 6/30/2027
              </span>
              <span className="font-extrabold text-gray-900 text-sm sm:text-base">$77,295</span>
            </div>

            {/* Key Values in Calculating the Bill Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 space-y-1">
              <h3 className="font-bold text-[#111827] text-base mb-3">
                Key Values in Calculating the Bill
              </h3>

              <div className="space-y-1 text-xs sm:text-sm">
                <TaxRow label="Tax class" value={taxInfo.taxClass || '4'} />
                <TaxRow label="Market value" value={`$${marketVal}`} />
                <TaxRow label="Assessed value" value={`$${assessedVal}`} />
                <TaxRow label="Exemptions granted by city" value="$0" />
                <TaxRow label="Transitional value" value={`$${transitionalVal}`} />
                <TaxRow label="Transitional exemption value" value="$0" />
                <TaxRow label="Tax abatements" value="$0" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* Helper Component for Tax Key Value Rows */
const TaxRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-gray-200/60">
    <span className="text-[#6B7280] font-medium">{label}</span>
    <span className="font-semibold text-[#111827]">{value}</span>
  </div>
);
