import React, { useState } from 'react';
import { Building, ChevronUp, ChevronDown } from 'lucide-react';

export const ContactsTab = ({ property }) => {
  const [registeredOwnerVisible, setRegisteredOwnerVisible] = useState(true);
  const [permitsVisible, setPermitsVisible] = useState(true);

  if (!property) return null;

  const contacts = Array.isArray(property.contacts) ? property.contacts : [];

  return (
    <div className="space-y-6 text-[#111827] font-sans">
      {/* 1. REGISTERED OWNER PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h3 className="text-xl font-bold text-[#111827]">Registered Owner</h3>
          </div>
          <button
            onClick={() => setRegisteredOwnerVisible(!registeredOwnerVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{registeredOwnerVisible ? 'Hide panel' : 'Show panel'}</span>
            {registeredOwnerVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          Ownership data is aggregated from NYC public record sources (PLUTO / ACRIS).
        </p>

        {registeredOwnerVisible && (
          <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0 border border-blue-100">
              <Building className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="text-base font-bold text-[#2563EB]">
                {property.owner || 'Not available'}
              </h4>
              <p className="text-gray-600 font-medium">
                {property.ownerAddress || property.address || 'Not available'}
              </p>
              <p className="text-gray-500 pt-1">
                <span className="font-semibold">Source:</span> NYC Public Record (PLUTO)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. CONTACTS FROM PUBLIC FILINGS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h3 className="text-xl font-bold text-[#111827]">Contacts from Public Filings ({contacts.length})</h3>
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
          <div className="space-y-4">
            {contacts.length > 0 ? (
              <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8F9FA] text-xs font-bold text-[#6B7280] border-b border-gray-200">
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4">Phone number</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                    {contacts.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-3 px-4 text-gray-700">{row.role || 'Contact'}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-[#111827] block">
                            {row.name || 'Not available'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {row.source || 'Public Record'}
                        </td>
                        <td className="py-3 px-4 font-mono text-gray-700">
                          {row.phone || 'Not available'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-center text-[#667085] text-sm">
                No public contact records available for this property.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

