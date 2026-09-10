import React from 'react';
import { Percent, DollarSign, Calendar, ShieldCheck } from 'lucide-react';

export const TaxTab = ({ property }) => {
  if (!property) return null;

  const taxInfo = property.taxInfo || {
    taxClass: '4',
    marketValue: 1822000,
    assessedValue: 819900,
    taxableValue: 712530,
    rates: [
      { year: '2024/25', rate: '10.762%' },
      { year: '2023/24', rate: '10.592%' },
      { year: '2022/23', rate: '10.646%' },
      { year: '2021/22', rate: '10.755%' },
      { year: '2020/21', rate: '10.694%' },
      { year: '2019/20', rate: '10.537%' },
      { year: '2018/19', rate: '10.514%' },
      { year: '2017/18', rate: '10.514%' },
      { year: '2016/17', rate: '10.574%' },
    ],
  };

  return (
    <div className="space-y-8 font-sans text-[#111827]">
      {/* TAX METRICS HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-[#667085] uppercase tracking-wider block mb-1">
            Tax Class
          </span>
          <span className="text-2xl font-black text-[#4F46E5] block">
            Class {taxInfo.taxClass}
          </span>
          <span className="text-[11px] text-gray-400 font-semibold mt-1 block">Commercial & Industrial</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-[#667085] uppercase tracking-wider block mb-1">
            Market Value
          </span>
          <span className="text-2xl font-black text-[#111827] block">
            ${taxInfo.marketValue.toLocaleString()}
          </span>
          <span className="text-[11px] text-gray-400 font-semibold mt-1 block">NYC DOF Final Assessment Roll</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-[#667085] uppercase tracking-wider block mb-1">
            Assessed Value
          </span>
          <span className="text-2xl font-black text-[#2563EB] block">
            ${taxInfo.assessedValue.toLocaleString()}
          </span>
          <span className="text-[11px] text-gray-400 font-semibold mt-1 block">45% Assessment Factor</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-[#667085] uppercase tracking-wider block mb-1">
            Taxable Value
          </span>
          <span className="text-2xl font-black text-[#6D28D9] block">
            ${taxInfo.taxableValue.toLocaleString()}
          </span>
          <span className="text-[11px] text-gray-400 font-semibold mt-1 block">After Exemptions / Abatements</span>
        </div>
      </div>

      {/* HISTORICAL TAX RATES TABLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-[#2563EB]" />
            <span>HISTORICAL TAX RATES (TAX CLASS 4)</span>
          </div>
          <span className="text-xs font-mono font-bold text-gray-400 uppercase">NYC Department of Finance</span>
        </h3>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F7F8FC] text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                <th className="py-3.5 px-6 rounded-l-xl">Fiscal Year</th>
                <th className="py-3.5 px-6">Tax Rate</th>
                <th className="py-3.5 px-6 rounded-r-xl">Property Tax Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[#111827]">
              {taxInfo.rates.map((item) => (
                <tr key={item.year} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#2563EB]">{item.year}</td>
                  <td className="py-4 px-6 font-black text-[#111827]">{item.rate}</td>
                  <td className="py-4 px-6 font-mono text-xs text-[#667085]">
                    Class {taxInfo.taxClass} Commercial
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
