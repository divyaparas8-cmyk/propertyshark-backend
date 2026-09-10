import React from 'react';
import { UserCheck, Phone, MapPin, Building, ShieldCheck, Contact } from 'lucide-react';

export const ContactsTab = ({ property }) => {
  if (!property) return null;

  const contactsData = property.contacts || {};
  const registeredOwner = contactsData.registeredOwner || { name: 'JORICH, LLC', source: 'Assessment Roll' };
  const permitContacts = contactsData.permitContacts || [];

  return (
    <div className="space-y-8">
      {/* Registered Owner Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <h3 className="text-lg font-bold text-brand-text mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Registered Property Owner</span>
        </h3>

        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md">
              {registeredOwner.name ? registeredOwner.name.slice(0, 2) : 'JO'}
            </div>
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase block">Primary Owner Entity</span>
              <h4 className="text-xl font-black text-gray-900">{registeredOwner.name}</h4>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircleIcon className="w-3.5 h-3.5" /> Source: {registeredOwner.source}
              </span>
            </div>
          </div>

          <div className="text-xs text-gray-500 font-mono bg-white px-3 py-2 rounded-xl border border-gray-200">
            Assessed BBL: {property.bbl}
          </div>
        </div>
      </div>

      {/* Permit Contacts Section */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-brand-text flex items-center gap-2">
            <Contact className="w-5 h-5 text-brand-accent" />
            <span>DOB Permit Contacts & Associated Vendors</span>
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Registered applicants, contractors, and licensed professionals on file with the NYC Department of Buildings.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                <th className="py-3.5 px-6">Full Name</th>
                <th className="py-3.5 px-6">Company / Vendor</th>
                <th className="py-3.5 px-6">Mailing Address</th>
                <th className="py-3.5 px-6">Phone Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
              {permitContacts.map((contact, idx) => (
                <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-brand-text flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-brand-accent flex items-center justify-center text-xs font-extrabold shrink-0">
                      {contact.name.charAt(0)}
                    </div>
                    <span>{contact.name}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {contact.company === 'Not Found' ? (
                      <span className="text-gray-400 font-mono text-xs">Not Found</span>
                    ) : (
                      contact.company
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-xs">
                    {contact.address === 'Not Found' ? (
                      <span className="text-gray-400 font-mono text-xs">Not Found</span>
                    ) : (
                      contact.address
                    )}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs font-bold text-brand-accent">
                    {contact.phone === 'Not Found' ? (
                      <span className="text-gray-400 font-normal">Not Found</span>
                    ) : (
                      contact.phone
                    )}
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

const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
