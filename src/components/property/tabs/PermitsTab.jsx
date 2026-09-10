import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const PermitsTab = ({ property }) => {
  const [permitsVisible, setPermitsVisible] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  if (!property) return null;

  const permitsRows = [
    {
      id: '1',
      filingDate: '03/23/2020',
      jobNumber: 'Q00256961-I1',
      jobType: 'Alteration',
      jobStatus: 'Approved',
      actionDate: '(05/05/2020)',
      workType: '',
      initialCost: '$4,000',
      applicant: 'Mohammad Shahid (City Vendors Wholesale LLC)',
      description: 'General building alteration and interior commercial compliance update.',
    },
    {
      id: '2',
      filingDate: '07/15/2019',
      jobNumber: '421742537-01',
      jobType: 'Alteration type 2',
      jobStatus: 'Permit issued - entire job/work',
      actionDate: '(08/21/2019)',
      workType: '',
      initialCost: '$17,000',
      applicant: 'Jose Vasquez (S J Empire Corp.)',
      description: 'Mechanical system upgrades, architectural layout alterations.',
    },
    {
      id: '3',
      filingDate: '02/09/2018',
      jobNumber: '421567352-01',
      jobType: 'Alteration type 2',
      jobStatus: 'Permit issued - entire job/work',
      actionDate: '(04/26/2018)',
      workType: 'Plumbing',
      initialCost: '$67,000',
      applicant: 'Aido Escurra (Infiniti Esc Plumbing Cor)',
      description: 'Plumbing overhaul, backflow preventer setup, water supply upgrades.',
    },
    {
      id: '4',
      filingDate: '12/12/1990',
      jobNumber: '400147257-01',
      jobType: 'Alteration type 2',
      jobStatus: 'Permit issued - entire job/work',
      actionDate: '(01/17/1991)',
      workType: 'Plumbing',
      initialCost: '$6,000',
      applicant: 'Salim Rahman (T&S Home Improvement Inc.)',
      description: 'Historical plumbing installation and backflow piping compliance.',
    },
  ];

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="space-y-6 text-[#111827] font-sans">
      {/* 1. PERMITS PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Permits</h2>
          </div>
          <button
            onClick={() => setPermitsVisible(!permitsVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{permitsVisible ? 'Hide panel' : 'Show panel'}</span>
            {permitsVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {permitsVisible && (
          <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                  <th className="py-3 px-4">Filing date</th>
                  <th className="py-3 px-4">Job number</th>
                  <th className="py-3 px-4">Job type</th>
                  <th className="py-3 px-4">Job status</th>
                  <th className="py-3 px-4">Work type</th>
                  <th className="py-3 px-4">Initial cost</th>
                  <th className="py-3 px-4 text-center">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                {permitsRows.map((row) => {
                  const isExpanded = expandedRow === row.id;
                  return (
                    <React.Fragment key={row.id}>
                      <tr className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-gray-800 whitespace-nowrap">
                          {row.filingDate}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-gray-900 font-semibold">
                          {row.jobNumber}
                        </td>
                        <td className="py-3.5 px-4 text-gray-800">{row.jobType}</td>
                        <td className="py-3.5 px-4">
                          <span className="block text-gray-900 font-medium">{row.jobStatus}</span>
                          <span className="block text-gray-500 font-mono text-[11px]">
                            {row.actionDate}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-700">{row.workType || ''}</td>
                        <td className="py-3.5 px-4 font-bold text-gray-900">{row.initialCost}</td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => toggleRow(row.id)}
                            className="p-1 rounded-lg text-[#2563EB] hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Toggle Details"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#2563EB]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#2563EB]" />
                            )}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Inline Details Row */}
                      {isExpanded && (
                        <tr className="bg-blue-50/40">
                          <td colSpan={7} className="p-4 border-t border-blue-100">
                            <div className="bg-white p-4 rounded-xl border border-blue-100 text-xs space-y-2">
                              <div>
                                <span className="text-gray-500 font-bold uppercase block text-[10px]">
                                  Applicant Contact
                                </span>
                                <span className="font-semibold text-gray-900">{row.applicant}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 font-bold uppercase block text-[10px]">
                                  Description of Work
                                </span>
                                <span className="text-gray-700 leading-relaxed">{row.description}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
