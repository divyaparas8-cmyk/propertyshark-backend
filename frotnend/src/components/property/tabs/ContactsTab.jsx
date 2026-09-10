import React, { useState } from 'react';
import { User, Building, Info, ChevronUp, ChevronDown, Bookmark, FileSpreadsheet } from 'lucide-react';

export const ContactsTab = ({ property }) => {
  const [registeredOwnerVisible, setRegisteredOwnerVisible] = useState(true);
  const [permitsVisible, setPermitsVisible] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('current');

  if (!property) return null;

  const permitContacts = [
    {
      date: '08/21/2019',
      role: 'Owner',
      name: 'Mohammad Shahid',
      company: 'City Vendors Wholesale LLC',
      address: '42-12 13 Street Long Island City, NY 11101',
      phone: '(917) 497-2200',
      email: '',
    },
    {
      date: '08/21/2019',
      role: 'Applicant',
      name: 'Jose Vasquez',
      company: 'S J Empire Corp.',
      address: '',
      phone: '(718) 785-6091',
      email: '',
    },
    {
      date: '08/21/2019',
      role: 'Owner',
      name: 'Mohammad Shahid',
      company: '',
      address: '',
      phone: '(917) 497-2200',
      email: '',
    },
    {
      date: '07/15/2019',
      role: 'Applicant',
      name: 'Sung-Ho Shin',
      company: '',
      address: '',
      phone: '',
      email: '',
    },
    {
      date: '07/15/2019',
      role: 'Owner',
      name: 'Mohammad Shahid',
      company: 'City Vendors Wholesale LLC',
      address: '',
      phone: '(917) 497-2200',
      email: 'mjs8025@gmail.com',
    },
    {
      date: '04/26/2018',
      role: 'Applicant',
      name: 'Aido Escurra',
      company: 'Infiniti Esc Plumbing Cor',
      address: '',
      phone: '(929) 600-5504',
      email: '',
    },
    {
      date: '04/26/2018',
      role: 'Owner',
      name: 'Mohammad Shahid',
      company: 'City Vendors Wholesale LLC',
      address: '42-12 13th Street Long Island City, NY 11101',
      phone: '(917) 497-2200',
      email: '',
    },
    {
      date: '03/07/2018',
      role: 'Applicant',
      name: 'Salim Rahman',
      company: 'T&S Home Improvement Inc.',
      address: '',
      phone: '(718) 651-5492',
      email: '',
    },
  ];

  return (
    <div className="space-y-6 text-[#111827] font-sans">
      {/* 1. TOP RESEARCH BANNER NOTE */}
      <div className="text-xs text-gray-500 font-medium leading-relaxed px-1">
        Our team has manually researched owner names, phone numbers, and email addresses for all LLC-owned properties in NYC. We continue to monitor deed filings daily and update ownership records accordingly.
      </div>

      {/* 2. REAL OWNER CONTACT CARD */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0 border border-blue-100">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-[#2563EB] hover:underline cursor-pointer">
                  James N. Benatti
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                  1 owned property
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium mt-0.5">
                President • Steinway Van & Storag
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                42-45 12th St, Long Island, NY 11101
              </p>
            </div>
          </div>

          <button className="px-3.5 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer self-start">
            <Bookmark className="w-3.5 h-3.5 text-gray-400" />
            <span>Set owner follow-up</span>
            <Info className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>

        {/* Inner Light Gray Card */}
        <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 text-xs space-y-3">
          <div>
            <span className="text-gray-500 font-medium block mb-1">Phones</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#2563EB] text-sm">(718) 278-9090</span>
              <span className="px-2 py-0.5 rounded bg-[#111827] text-white text-[10px] font-black uppercase tracking-wider">
                VERIFIED
              </span>
            </div>
          </div>

          <div>
            <span className="text-gray-500 font-medium block mb-1">Websites</span>
            <a
              href="https://www.steinwaymovers.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#2563EB] font-semibold hover:underline"
            >
              www.steinwaymovers.com
            </a>
          </div>

          <div className="pt-2 border-t border-gray-200/60">
            <button className="text-[#2563EB] text-xs font-medium hover:underline flex items-center gap-1 cursor-pointer">
              <Info className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Incorrect info? Let us know.</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. REGISTERED OWNER PANEL */}
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
          Ownership data is aggregated from governmental sources like deeds and assessment rolls. If the registered owner is an LLC or other corporate entity, use our Real Owners service to identify the person behind the company.
        </p>

        {registeredOwnerVisible && (
          <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0 border border-blue-100">
              <Building className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="text-base font-bold text-[#2563EB] hover:underline cursor-pointer">
                {property.owner || 'Jorich, LLC'}
              </h4>
              <p className="text-gray-600 font-medium">
                46 Carman St <br />
                Massapequa, NY 11758
              </p>
              <p className="text-gray-500 pt-1">
                <span className="font-semibold">Source:</span> Assessment Roll
              </p>
              <p className="text-gray-500">
                <span className="font-semibold">Last recorded:</span> 04/26/2026
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. CONTACTS FROM BUILDING PERMITS PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h3 className="text-xl font-bold text-[#111827]">Contacts from Building Permits</h3>
          </div>
          <button
            onClick={() => setPermitsVisible(!permitsVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{permitsVisible ? 'Hide panel' : 'Show panel'}</span>
            {permitsVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          The 10 most recent building contacts are shown here, with duplicates removed. To view the full list, download the Excel file.
        </p>

        {permitsVisible && (
          <div className="space-y-4">
            {/* Sub-controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSubTab('current')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeSubTab === 'current'
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-[#F1F3F5] text-[#374151] hover:bg-[#E5E7EB]'
                  }`}
                >
                  Current Contacts
                </button>
                <button
                  onClick={() => setActiveSubTab('previous')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeSubTab === 'previous'
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-[#F1F3F5] text-[#374151] hover:bg-[#E5E7EB]'
                  }`}
                >
                  Previous Contacts
                </button>
              </div>

              <button className="px-3.5 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-[#2563EB] hover:bg-blue-50 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export to Excel (30 items)</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F9FA] text-xs font-bold text-[#6B7280] border-b border-gray-200">
                    <th className="py-3 px-4">Registration date</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Address</th>
                    <th className="py-3 px-4">Phone number</th>
                    <th className="py-3 px-4">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                  {permitContacts.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-gray-700 whitespace-nowrap">{row.date}</td>
                      <td className="py-3 px-4 text-gray-700">{row.role}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[#2563EB] hover:underline cursor-pointer block">
                          {row.name}
                        </span>
                        {row.company && (
                          <span className="text-[11px] text-gray-500 font-normal block">{row.company}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {row.address ? (
                          <span>{row.address}</span>
                        ) : (
                          <span className="text-gray-400 font-mono">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#2563EB]">
                        {row.phone || '-'}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#2563EB]">
                        {row.email ? (
                          <a href={`mailto:${row.email}`} className="hover:underline">{row.email}</a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
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
