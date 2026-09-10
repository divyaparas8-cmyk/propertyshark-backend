import React, { useState } from 'react';
import { HardHat, Eye, X, FileCheck, DollarSign, Calendar } from 'lucide-react';

export const PermitsTab = ({ property }) => {
  const [selectedPermit, setSelectedPermit] = useState(null);

  if (!property) return null;

  const permitsList = property.permits && property.permits.length > 0 ? property.permits : [
    {
      date: '03/23/2020',
      permitNumber: 'Q00256961-I1',
      type: 'Alteration',
      status: 'Approved',
      latestActionDate: '05/05/2020',
      workType: 'Not Found',
      initialCost: 4000,
      description: 'General building alteration and interior commercial compliance update.',
      applicant: 'Mohammad Shahid',
    },
    {
      date: '07/15/2019',
      permitNumber: '421742537-01',
      type: 'Alteration Type 2',
      status: 'Permit Issued - Entire Job/Work',
      latestActionDate: '08/21/2019',
      workType: 'Not Found',
      initialCost: 17000,
      description: 'Mechanical system upgrades, architectural layout alterations.',
      applicant: 'Jose Vasquez',
    },
    {
      date: '02/09/2018',
      permitNumber: '421567352-01',
      type: 'Alteration Type 2',
      status: 'Permit Issued - Entire Job/Work',
      latestActionDate: '08/21/2019',
      workType: 'Plumbing',
      initialCost: 67000,
      description: 'Plumbing overhaul, backflow preventer setup, water supply upgrades.',
      applicant: 'Aido Escurra',
    },
    {
      date: '1990 permit',
      permitNumber: 'Not Found',
      type: 'Not Found',
      status: 'Not Found',
      latestActionDate: 'Not Found',
      workType: 'Not Found',
      initialCost: 'Not Found',
      description: '1990 historical permit filing data not recorded in digital DOB database.',
      applicant: 'Not Found',
    },
  ];

  return (
    <div className="space-y-8 font-sans text-[#111827]">
      {/* PERMITS TABLE CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm overflow-hidden">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <HardHat className="w-5 h-5 text-[#2563EB]" />
            <span>DOB PERMIT FILINGS & WORK HISTORY</span>
          </div>
          <span className="text-xs font-mono font-bold text-gray-400 uppercase">NYC Dept of Buildings</span>
        </h3>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F7F8FC] text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                <th className="py-3.5 px-4 rounded-l-xl">Filing Date</th>
                <th className="py-3.5 px-4">Permit # / Job #</th>
                <th className="py-3.5 px-4">Job Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Latest Action</th>
                <th className="py-3.5 px-4">Work Type</th>
                <th className="py-3.5 px-4">Initial Cost</th>
                <th className="py-3.5 px-4 rounded-r-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[#111827]">
              {permitsList.map((permit, idx) => (
                <tr key={permit.permitNumber + idx} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-4 font-mono text-xs font-bold text-[#2563EB]">{permit.date}</td>
                  <td className="py-4 px-4 font-mono font-bold text-xs">{permit.permitNumber}</td>
                  <td className="py-4 px-4 font-semibold">{permit.type}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase ${
                        permit.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : permit.status.includes('Permit Issued')
                          ? 'bg-blue-50 text-[#2563EB] border border-blue-200'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {permit.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[#667085]">{permit.latestActionDate}</td>
                  <td className="py-4 px-4 text-xs font-semibold">
                    {permit.workType === 'Not Found' ? (
                      <span className="text-gray-400">Not Found</span>
                    ) : (
                      <span className="text-[#4F46E5] font-bold">{permit.workType}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-black">
                    {typeof permit.initialCost === 'number'
                      ? `$${permit.initialCost.toLocaleString()}`
                      : permit.initialCost}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedPermit(permit)}
                      className="px-3 py-1.5 bg-[#0A1020] hover:bg-[#10182D] text-white text-xs font-bold rounded-lg inline-flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PERMIT DETAILS MODAL */}
      {selectedPermit && (
        <div className="fixed inset-0 z-50 bg-[#0A1020]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-gray-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPermit(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider">
                DOB PERMIT DETAIL
              </span>
            </div>

            <h3 className="text-2xl font-black text-[#111827] mb-2">{selectedPermit.permitNumber}</h3>
            <p className="text-xs font-semibold text-[#667085] mb-6">
              Filing Date: <span className="font-mono text-[#111827]">{selectedPermit.date}</span>
            </p>

            <div className="space-y-4 text-sm border-t border-b border-gray-100 py-4 mb-6">
              <div className="flex justify-between py-1">
                <span className="text-xs text-[#667085] font-bold uppercase">Job Type</span>
                <span className="font-bold text-[#111827]">{selectedPermit.type}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-[#667085] font-bold uppercase">Status</span>
                <span className="font-bold text-[#2563EB]">{selectedPermit.status}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-[#667085] font-bold uppercase">Work Type</span>
                <span className="font-bold text-[#4F46E5]">{selectedPermit.workType}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-[#667085] font-bold uppercase">Initial Cost</span>
                <span className="font-black text-[#111827]">
                  {typeof selectedPermit.initialCost === 'number'
                    ? `$${selectedPermit.initialCost.toLocaleString()}`
                    : selectedPermit.initialCost}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-[#667085] font-bold uppercase">Applicant Contact</span>
                <span className="font-bold text-[#111827]">{selectedPermit.applicant || 'Not Found'}</span>
              </div>
              <div className="pt-2">
                <span className="text-xs text-[#667085] font-bold uppercase block mb-1">Filing Description</span>
                <p className="text-xs text-gray-700 bg-[#F7F8FC] p-3 rounded-xl border border-gray-100 leading-relaxed">
                  {selectedPermit.description || 'No detailed description available.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedPermit(null)}
                className="px-6 py-2.5 bg-[#0A1020] text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#10182D]"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
