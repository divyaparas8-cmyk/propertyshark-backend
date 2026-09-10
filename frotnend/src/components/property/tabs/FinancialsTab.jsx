import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const FinancialsTab = ({ property }) => {
  const [mortgageVisible, setMortgageVisible] = useState(true);
  const [incomeVisible, setIncomeVisible] = useState(true);

  if (!property) return null;

  const rpieRows = [
    {
      year: '2026',
      resUnits: 0,
      commUnits: property.units || 2,
      resSqFt: 0,
      commSqFt: (property.buildingAreaSqFt || 12000).toLocaleString(),
      capRate: '14.293%',
      estGrossIncome: '$307,560',
      estExpenses: '$70,739',
      noi: '$236,821',
    },
    {
      year: '2025',
      resUnits: 0,
      commUnits: property.units || 2,
      resSqFt: 0,
      commSqFt: (property.buildingAreaSqFt || 12000).toLocaleString(),
      capRate: '14.216%',
      estGrossIncome: '$321,330',
      estExpenses: '$96,399',
      noi: '$224,931',
    },
    {
      year: '2024',
      resUnits: 0,
      commUnits: property.units || 2,
      resSqFt: 0,
      commSqFt: (property.buildingAreaSqFt || 12000).toLocaleString(),
      capRate: '14.251%',
      estGrossIncome: '$260,062',
      estExpenses: '$52,415',
      noi: '$207,647',
    },
    {
      year: '2023',
      resUnits: 0,
      commUnits: property.units || 2,
      resSqFt: 0,
      commSqFt: (property.buildingAreaSqFt || 12000).toLocaleString(),
      capRate: '14.180%',
      estGrossIncome: '$248,500',
      estExpenses: '$48,200',
      noi: '$200,300',
    },
    {
      year: '2022',
      resUnits: 0,
      commUnits: property.units || 2,
      resSqFt: 0,
      commSqFt: (property.buildingAreaSqFt || 12000).toLocaleString(),
      capRate: '14.200%',
      estGrossIncome: '$252,100',
      estExpenses: '$50,100',
      noi: '$202,000',
    },
    {
      year: '2021',
      resUnits: 0,
      commUnits: property.units || 2,
      resSqFt: 0,
      commSqFt: (property.buildingAreaSqFt || 12000).toLocaleString(),
      capRate: '14.195%',
      estGrossIncome: '$255,000',
      estExpenses: '$53,200',
      noi: '$201,800',
    },
    {
      year: '2020',
      resUnits: 0,
      commUnits: property.units || 2,
      resSqFt: 0,
      commSqFt: (property.buildingAreaSqFt || 12000).toLocaleString(),
      capRate: '14.202%',
      estGrossIncome: '$257,317',
      estExpenses: '$56,610',
      noi: '$200,707',
    },
    {
      year: '2019',
      resUnits: 0,
      commUnits: property.units || 2,
      resSqFt: 0,
      commSqFt: (property.buildingAreaSqFt || 12000).toLocaleString(),
      capRate: '14.221%',
      estGrossIncome: '$227,040',
      estExpenses: '$34,056',
      noi: '$192,984',
    },
    {
      year: '2018',
      resUnits: 0,
      commUnits: property.units || 2,
      resSqFt: 0,
      commSqFt: (property.buildingAreaSqFt || 12000).toLocaleString(),
      capRate: '14.731%',
      estGrossIncome: '$212,880',
      estExpenses: '$20,160',
      noi: '$192,720',
    },
  ];

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
            No active mortgages tied to this property.
          </div>
        )}
      </div>

      {/* 2. INCOME AND EXPENSES PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Income and Expenses</h2>
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
            <div className="text-xs text-gray-500 leading-relaxed space-y-1">
              <p>
                Income-producing properties with an actual assessed value over $40,000 must file annual Real Property Income and Expense (RPIE) statements with the Department of Finance (DOF). DOF uses these filings or comparable data to estimate market value for tax purposes.
              </p>
              <p>
                Unit and square footage totals are displayed only when both residential and commercial data are available.
              </p>
            </div>

            {/* RPIE Income Table */}
            <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4 text-center">Res. units</th>
                    <th className="py-3 px-4 text-center">Comm. units</th>
                    <th className="py-3 px-4 text-right">Res. sq. ft.</th>
                    <th className="py-3 px-4 text-right">Comm. sq. ft.</th>
                    <th className="py-3 px-4 text-right">Cap. rate</th>
                    <th className="py-3 px-4 text-right">Est. gross income</th>
                    <th className="py-3 px-4 text-right">Est. expenses</th>
                    <th className="py-3 px-4 text-right">NOI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                  {rpieRows.map((row) => (
                    <tr key={row.year} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-gray-800 font-semibold">{row.year}</td>
                      <td className="py-3.5 px-4 text-center text-gray-700">{row.resUnits}</td>
                      <td className="py-3.5 px-4 text-center text-gray-700">{row.commUnits}</td>
                      <td className="py-3.5 px-4 text-right text-gray-700">{row.resSqFt}</td>
                      <td className="py-3.5 px-4 text-right text-gray-700">{row.commSqFt}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-gray-700">{row.capRate}</td>
                      <td className="py-3.5 px-4 text-right font-semibold text-gray-900">{row.estGrossIncome}</td>
                      <td className="py-3.5 px-4 text-right text-gray-700">{row.estExpenses}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-gray-900">{row.noi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
