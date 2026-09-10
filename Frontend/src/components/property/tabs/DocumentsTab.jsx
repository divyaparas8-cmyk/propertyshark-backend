import React, { useState } from 'react';
import { ChevronUp, ChevronDown, FileText } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export const DocumentsTab = ({ property }) => {
  const [titleDocsVisible, setTitleDocsVisible] = useState(true);

  const { addToast } = useToast();

  if (!property) return null;

  const documents = Array.isArray(property.documents) ? property.documents : [];

  const handleDocClick = (docId) => {
    addToast(`ACRIS Document ID ${docId || ''} - Link out to NYC ACRIS database`, 'info');
  };

  return (
    <div className="space-y-6 text-[#111827] font-sans">
      {/* 1. TITLE & DEED DOCUMENTS PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Public Property Documents & Deeds ({documents.length})</h2>
          </div>
          <button
            onClick={() => setTitleDocsVisible(!titleDocsVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{titleDocsVisible ? 'Hide panel' : 'Show panel'}</span>
            {titleDocsVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {titleDocsVisible && (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
              {documents.length > 0 ? (
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                      <th className="py-3 px-4">Date Recorded</th>
                      <th className="py-3 px-4">Document Type</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Party 1</th>
                      <th className="py-3 px-4">Party 2</th>
                      <th className="py-3 px-4 text-center">Doc ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                    {documents.map((row, idx) => (
                      <tr key={row.docId || idx} className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-gray-800 whitespace-nowrap">
                          {row.date || row.recordedDate || 'Not available'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-gray-900 block">{row.docType || row.type || 'Deed/Filing'}</span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-gray-900">
                          {row.price || row.amount ? `$${Number(row.price || row.amount).toLocaleString()}` : '—'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-[#2563EB] block">
                            {row.party1 || row.seller || 'Not recorded'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-[#2563EB] block">
                            {row.party2 || row.buyer || 'Not recorded'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {row.docId ? (
                            <button
                              onClick={() => handleDocClick(row.docId)}
                              className="text-[#2563EB] font-mono hover:underline p-1 inline-flex items-center gap-1 cursor-pointer"
                              title="View Document Details"
                            >
                              <FileText className="w-4 h-4" />
                              <span>{row.docId}</span>
                            </button>
                          ) : (
                            <span className="text-gray-400 font-mono">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-6 text-center text-[#667085] text-sm">
                  No public ACRIS document records found for this parcel (BBL {property.bbl || 'N/A'}).
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

