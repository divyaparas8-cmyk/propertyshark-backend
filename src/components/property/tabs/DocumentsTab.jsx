import React from 'react';
import { FileText, ShieldAlert, FileCheck } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export const DocumentsTab = ({ property }) => {
  const { addToast } = useToast();

  if (!property) return null;

  const docsData = property.documents || {};
  const deed = docsData.deedSummary || {
    documentType: 'DEED',
    documentId: '2017110801341001',
    documentDate: '10/26/2017',
    recordedDate: '11/14/2017',
    amount: 1,
    party1: 'NEW YORK CITY INDUSTRIAL DEVELOPMENT AGENCY',
    party2: 'JORICH, LLC',
  };

  const acrisDocs = docsData.acrisDocuments || [
    {
      documentId: '2017110801341001',
      documentType: 'DEED',
      date: '10/26/2017',
      amount: 1,
      party1: 'NEW YORK CITY INDUSTRIAL DEVELOPMENT AGENCY',
      party2: 'JORICH, LLC',
    },
    {
      documentId: '2017110801341002',
      documentType: 'AGREEMENT',
      date: '10/26/2017',
      amount: 0,
      party1: 'JORICH, LLC',
      party2: 'CITY VENDORS WHOLESALE LLC',
    },
  ];

  return (
    <div className="space-y-8 font-sans text-[#111827]">
      {/* DEED SUMMARY CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2563EB]" />
            <span>DEED SUMMARY</span>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-[#2563EB] text-xs font-mono font-bold rounded-md border border-blue-100">
            ACRIS RECORDED
          </span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Document Type</span>
            <span className="font-bold text-[#111827] mt-1 block">{deed.documentType}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Document ID</span>
            <span className="font-mono font-bold text-[#2563EB] text-xs mt-1 block truncate">{deed.documentId}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Document Date</span>
            <span className="font-bold text-[#111827] mt-1 block">{deed.documentDate}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Recorded Date</span>
            <span className="font-bold text-[#111827] mt-1 block">{deed.recordedDate}</span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs text-[#667085] font-bold uppercase block">Amount</span>
            <span className="font-black text-[#111827] mt-1 block">
              {deed.amount === 1 ? '$1' : `$${deed.amount.toLocaleString()}`}
            </span>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-100 col-span-1 sm:col-span-3">
            <span className="text-xs text-[#667085] font-bold uppercase block">Transacting Parties</span>
            <p className="font-semibold text-xs text-[#111827] mt-1">
              <strong>Grantor (Party 1):</strong> {deed.party1} <br />
              <strong>Grantee (Party 2):</strong> {deed.party2}
            </p>
          </div>
        </div>
      </div>

      {/* LIENS CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#4F46E5]" />
            <span>LIENS & ENCUMBRANCES</span>
          </div>
        </h3>
        <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-200 text-xs font-mono font-bold text-[#667085]">
          LIENS: Not Found
        </div>
      </div>

      {/* TITLE DOCUMENTS TABLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#6D28D9]" />
            <span>ACRIS TITLE DOCUMENTS</span>
          </div>
          <span className="text-xs font-mono font-bold text-gray-400 uppercase">NYC ACRIS Database</span>
        </h3>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F7F8FC] text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                <th className="py-3.5 px-4 rounded-l-xl">Document ID</th>
                <th className="py-3.5 px-4">Document Type</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4 rounded-r-xl text-right">View Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[#111827]">
              {acrisDocs.map((doc) => (
                <tr key={doc.documentId} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-xs text-[#2563EB]">{doc.documentId}</td>
                  <td className="py-4 px-4 font-bold text-xs">{doc.documentType}</td>
                  <td className="py-4 px-4 font-mono text-xs text-gray-600">{doc.date}</td>
                  <td className="py-4 px-4 font-black">
                    {doc.amount === 1 ? '$1' : doc.amount > 0 ? `$${doc.amount.toLocaleString()}` : '$0'}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex flex-col items-end">
                      <button
                        disabled
                        className="px-3.5 py-1.5 bg-gray-200 text-gray-400 text-xs font-bold rounded-lg cursor-not-allowed opacity-75"
                        title="Document image unavailable"
                      >
                        View Document
                      </button>
                      <span className="text-[10px] text-gray-400 font-semibold mt-1">
                        Document image unavailable
                      </span>
                    </div>
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
