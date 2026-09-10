import React from 'react';
import { FileText, ImageOff, Lock, AlertCircle, FileCheck, ExternalLink } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export const DocumentsTab = ({ property }) => {
  const { addToast } = useToast();

  if (!property) return null;

  const docs = property.documents || {};
  const deed = docs.deedSummary || {};
  const acrisDocs = docs.acrisDocuments || [];

  return (
    <div className="space-y-8">
      {/* Deed Summary Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <span className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-accent" />
            Primary Recorded Deed Summary
          </span>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-gray-100 font-bold text-gray-700">
            Document ID: {deed.documentId || 'Not Found'}
          </span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Document Type</span>
            <span className="font-extrabold text-gray-900 text-base mt-1 block">{deed.documentType || 'DEED'}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Document Date</span>
            <span className="font-extrabold text-gray-900 text-base mt-1 block">{deed.documentDate || 'Not Found'}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Recorded Date</span>
            <span className="font-extrabold text-gray-900 text-base mt-1 block">{deed.recordedDate || 'Not Found'}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Consideration Amount</span>
            <span className="font-extrabold text-emerald-600 text-base mt-1 block">
              ${deed.amount ? deed.amount.toLocaleString() : '1'}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-xs text-gray-400 font-semibold block uppercase">Party 1 (Grantor)</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{deed.party1 || 'Not Found'}</span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-xs text-gray-400 font-semibold block uppercase">Party 2 (Grantee)</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{deed.party2 || 'Not Found'}</span>
          </div>
        </div>
      </div>

      {/* Liens Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-gray-500" />
          <span>Active Tax Liens & Mechanic Liens</span>
        </h3>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between text-xs font-semibold text-gray-600">
          <span>Official Public Recording Status:</span>
          <span className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-gray-900 font-bold font-mono">
            {docs.liens || 'Not Found'}
          </span>
        </div>
      </div>

      {/* ACRIS Title Documents Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-brand-text flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <span>ACRIS Recorded Title Documents</span>
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            ACRIS legal documents filed for BBL: {property.bbl} (Datasets 8h5j-fqxa & bnx9-e6tj).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                <th className="py-3.5 px-6">Document ID</th>
                <th className="py-3.5 px-6">Document Type</th>
                <th className="py-3.5 px-6">Recording Date</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6 text-right">View Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
              {acrisDocs.map((doc, idx) => (
                <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-brand-text">{doc.documentId}</td>
                  <td className="py-4 px-6 font-semibold">{doc.documentType}</td>
                  <td className="py-4 px-6 text-gray-600">{doc.date}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">
                    ${typeof doc.amount === 'number' ? doc.amount.toLocaleString() : doc.amount}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {/* Disabled button showing "Document image unavailable" */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 text-xs font-semibold cursor-not-allowed border border-gray-200" title="Document image unavailable">
                      <ImageOff className="w-3.5 h-3.5" />
                      <span>Document image unavailable</span>
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
