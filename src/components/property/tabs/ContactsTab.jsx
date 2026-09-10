import React from 'react';
import { Contact, User, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';

export const ContactsTab = ({ property }) => {
  if (!property) return null;

  const contactsData = property.contacts || {};
  const registeredOwner = contactsData.registeredOwner || {
    name: 'JORICH, LLC',
    source: 'Assessment Roll',
  };

  const permitContacts = contactsData.permitContacts || [
    {
      name: 'Mohammad Shahid',
      company: 'City Vendors Wholesale LLC',
      address: '42-12 13 Street',
      phone: '(917) 497-2200',
    },
    {
      name: 'Jose Vasquez',
      company: 'J5 Empire Corp',
      address: 'Not Found',
      phone: '(718) 785-0091',
    },
    {
      name: 'Sung-Ho Shin',
      company: 'Not Found',
      address: 'Not Found',
      phone: '(917) 497-2200',
    },
    {
      name: 'Aido Escurra',
      company: 'Infiniti Ecl Plumbing Corp',
      address: 'Not Found',
      phone: '(929) 600-5504',
    },
    {
      name: 'Salim Rahman',
      company: 'T&S Home Improvement Inc.',
      address: 'Not Found',
      phone: 'Not Found',
    },
  ];

  return (
    <div className="space-y-8 font-sans text-[#111827]">
      {/* REGISTERED OWNER CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#2563EB]" />
            <span>REGISTERED OWNER</span>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-[#2563EB] text-xs font-mono font-bold rounded-md border border-blue-100">
            VERIFIED PARCEL RECORD
          </span>
        </h3>

        <div className="grid sm:grid-cols-2 gap-6 text-sm">
          <div className="p-5 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider block mb-1">
              Owner Name / Entity
            </span>
            <span className="font-black text-[#111827] text-xl block">{registeredOwner.name}</span>
          </div>

          <div className="p-5 bg-[#F7F8FC] rounded-2xl border border-gray-100">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider block mb-1">
              Data Source
            </span>
            <span className="font-bold text-[#4F46E5] text-base block">{registeredOwner.source}</span>
          </div>
        </div>
      </div>

      {/* PERMIT CONTACTS LIST */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Contact className="w-5 h-5 text-[#4F46E5]" />
          <span>PERMIT APPLICANT & CONTRACTOR CONTACTS</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {permitContacts.map((c, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#F7F8FC] rounded-2xl border border-gray-100 space-y-3 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] text-white flex items-center justify-center font-bold text-sm">
                  {c.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-black text-[#111827] text-base">{c.name}</h4>
                  <span className="text-xs font-semibold text-[#667085] block truncate">
                    {c.company !== 'Not Found' ? c.company : <span className="italic text-gray-400">Company Not Found</span>}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200/60 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#667085]">
                  <span className="font-bold">Address:</span>
                  <span className="font-mono text-[#111827]">{c.address}</span>
                </div>
                <div className="flex items-center justify-between text-[#667085]">
                  <span className="font-bold">Phone:</span>
                  <span className="font-mono font-bold text-[#2563EB]">
                    {c.phone !== 'Not Found' ? c.phone : <span className="text-gray-400 font-normal">Not Found</span>}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
