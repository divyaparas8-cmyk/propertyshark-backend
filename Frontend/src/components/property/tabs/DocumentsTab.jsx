import React, { useState } from 'react';
import { ChevronUp, ChevronDown, FileText, FileSpreadsheet, ChevronDown as DropdownIcon } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export const DocumentsTab = ({ property }) => {
  const [deedVisible, setDeedVisible] = useState(true);
  const [liensVisible, setLiensVisible] = useState(true);
  const [titleDocsVisible, setTitleDocsVisible] = useState(true);
  const [page, setPage] = useState(1);

  const { addToast } = useToast();

  if (!property) return null;

  const handleDocClick = (docId) => {
    addToast(`Document image ${docId || ''} unavailable in preview mode`, 'info');
  };

  const deedSummaryRows = [
    {
      date: '10/26/2017',
      party1Name: 'New York City Industrial Development Agency',
      party1Address: '110 William Street New York NY 10038',
      party2Name: 'Jorich, LLC',
      party2Address: '42-45 12th Street Long Island City NY 11101',
      armsLength: 'No',
      transactionType: 'Institutional / lender sale',
      amount: '$1',
    },
    {
      date: '03/12/1999',
      party1Name: 'Jorich LLC',
      party1Address: '',
      party2Name: 'New York City Ondustrial Development Agency',
      party2Address: '',
      armsLength: 'No',
      transactionType: 'Institutional / lender sale',
      amount: '$0',
    },
    {
      date: '03/12/1999',
      party1Name: '42-12 13th Street LLC',
      party1Address: '',
      party2Name: 'Jorich LLC',
      party2Address: '',
      armsLength: 'No',
      transactionType: 'Institutional / lender sale',
      amount: '$0',
    },
    {
      date: '01/30/1998',
      party1Name: 'Donnelly, Dorothy Bartlett',
      party1Address: '100 Hilton Ave Garden City NY',
      extraParty1: 'Glendale Holding Corp. 75-11 Woodhaven Blvd Glendale NY',
      hasMoreParties: true,
      party2Name: '42-12 13th Street, LLC',
      party2Address: '12-12 Queens Plaza South Lic NY',
      armsLength: 'No',
      transactionType: 'Nonstandard deed transfer',
      amount: '$0',
    },
    {
      date: '01/20/1987',
      party1Name: 'BFF Donnelly Spiro Walcs',
      party1Address: '',
      party2Name: 'Donnelly, Dorothy Bartlet',
      party2Address: '',
      armsLength: 'No',
      transactionType: 'Multi-parcel sale Nonstandard deed transfer',
      amount: '$0',
    },
  ];

  const liensRows = [
    {
      status: 'Inactive',
      effectiveDate: '04/19/2001',
      expirationDate: '04/19/2002',
      documentType: 'Mechanics Lien',
      creditor: 'Progressive Handling Systems, Inc.',
      debtor: 'Balducci. Com',
      amount: '$198,399',
    },
    {
      status: 'Inactive',
      effectiveDate: '03/12/2001',
      expirationDate: '03/12/2002',
      documentType: 'Mechanics Lien',
      creditor: 'Progressive Handling Systems',
      debtor: 'Spiro Wallach Co. Inc.',
      amount: '$198,399',
    },
    {
      status: 'Inactive',
      effectiveDate: '02/23/2001',
      expirationDate: '02/23/2002',
      documentType: 'Mechanics Lien',
      creditor: 'Arista Air Conditioning',
      debtor: 'Spiro-Wallach Co. Inc.',
      amount: '$140,512',
    },
  ];

  const titleDocsRows = [
    {
      dateR: '11/15/2017 - R',
      dateD: '10/30/2017 - D',
      type: 'Termination of Lease or Memo',
      docId: '2017110801195002',
      amount: '-',
      party1Name: 'Jorich LLC',
      party1Addr: '42-45 12th Street Long Island City NY 11101',
      party2Name: 'Steinway Van and Storage Corp.',
      party2Addr: '42-45 12th Street Long Island City NY 11101',
    },
    {
      dateR: '11/14/2017 - R',
      dateD: '10/26/2017 - D',
      type: 'Deed',
      docId: '2017110801341001',
      amount: '$1',
      party1Name: 'New York City Industrial Development Agency',
      party1Addr: '110 William Street New York NY 10038',
      party2Name: 'Jorich LLC',
      party2Addr: '42-45 12th Street Long Island City NY 11101',
    },
    {
      dateR: '11/15/2017 - R',
      dateD: '10/26/2017 - D',
      type: 'Termination of Lease or Memo',
      docId: '2017110801195001',
      amount: '-',
      party1Name: 'Jorich LLC',
      party1Addr: '42-45 12th Street Long Island City NY 11101',
      party2Name: 'New York City Industrial Development Agency',
      party2Addr: '110 William Street New York NY 10038',
    },
    {
      dateR: '11/15/2017 - R',
      dateD: '09/29/2017 - D',
      type: 'Termination of Agreement',
      docId: '2017110801195005',
      amount: '-',
      party1Name: 'Empire State Development Corporation',
      party1Addr: '50 Ebaver Street Albany NY 12207',
      party2Name: 'US Small Business Administration',
      party2Addr: '50 Beaver Street 5th Floor Albany NY 12207',
    },
    {
      dateR: '11/15/2017 - R',
      dateD: '08/29/2017 - D',
      type: 'Satisfaction of Mortgage',
      docId: '2017110801195003',
      amount: '-',
      party1Name: 'Jorich LLC',
      party1Addr: '',
      party2Name: 'U S Small Business Administration',
      party2Addr: '',
    },
    {
      dateR: '11/15/2017 - R',
      dateD: '08/22/2017 - D',
      type: 'Satisfaction of Mortgage',
      docId: '2017110801195004',
      amount: '-',
      party1Name: 'Jorich LLC',
      party1Addr: '',
      party2Name: 'Manufacturers and Traders Trust Company',
      party2Addr: '',
    },
    {
      dateR: '06/01/1999 - R',
      dateD: '',
      type: 'Assignment, Mortgage',
      docId: '4180006634318',
      amount: '-',
      party1Name: 'Jorich LLC',
      party1Addr: '',
      party2Name: 'New York Business Development Corp.',
      party2Addr: '',
    },
    {
      dateR: '06/01/1999 - R',
      dateD: '',
      type: 'Lease',
      docId: '4900006634290',
      amount: '-',
      party1Name: 'Jorich LLC',
      party1Addr: '',
      party2Name: 'Steinway Van and Storage Corp.',
      party2Addr: '',
    },
    {
      dateR: '06/01/1999 - R',
      dateD: '',
      type: 'Lease',
      docId: '4790006634279',
      amount: '-',
      party1Name: 'New York City Industrial Development Agency',
      party1Addr: '',
      party2Name: 'Jorich LLC',
      party2Addr: '',
    },
    {
      dateR: '06/01/1999 - R',
      dateD: '',
      type: 'Assignment, Mortgage',
      docId: '4690006634269',
      amount: '-',
      party1Name: 'New York Business Development Corp.',
      party1Addr: '',
      party2Name: 'Manufacturers and Traders Trust Company (Trustee)',
      party2Addr: '',
    },
  ];

  return (
    <div className="space-y-6 text-[#111827] font-sans">
      {/* 1. DEED SUMMARY PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Deed Summary</h2>
          </div>
          <button
            onClick={() => setDeedVisible(!deedVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{deedVisible ? 'Hide panel' : 'Show panel'}</span>
            {deedVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {deedVisible && (
          <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Party 1</th>
                  <th className="py-3 px-4">Party 2</th>
                  <th className="py-3 px-4">Arm's length</th>
                  <th className="py-3 px-4">Transaction type</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 text-center">Doc image</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                {deedSummaryRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-gray-800 whitespace-nowrap">{row.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#2563EB] hover:underline cursor-pointer block">
                        {row.party1Name}
                      </span>
                      {row.party1Address && (
                        <span className="text-[11px] text-gray-500 block">{row.party1Address}</span>
                      )}
                      {row.extraParty1 && (
                        <div className="mt-1">
                          <span className="font-semibold text-[#2563EB] hover:underline cursor-pointer block">
                            Glendale Holding Corp.
                          </span>
                          <span className="text-[11px] text-gray-500 block">75-11 Woodhaven Blvd Glendale NY</span>
                          <span className="text-[#2563EB] hover:underline cursor-pointer text-[11px] block mt-0.5">
                            + See the other 1 party
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#2563EB] hover:underline cursor-pointer block">
                        {row.party2Name}
                      </span>
                      {row.party2Address && (
                        <span className="text-[11px] text-gray-500 block">{row.party2Address}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{row.armsLength}</td>
                    <td className="py-3.5 px-4 text-gray-700">{row.transactionType}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">{row.amount}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleDocClick(row.date)}
                        className="text-[#2563EB] hover:text-blue-700 p-1 inline-block cursor-pointer"
                        title="View Doc Image"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 2. LIENS PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Liens</h2>
          </div>
          <button
            onClick={() => setLiensVisible(!liensVisible)}
            className="text-xs font-semibold text-gray-500 hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{liensVisible ? 'Hide panel' : 'Show panel'}</span>
            {liensVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {liensVisible && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="px-3.5 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-[#2563EB] hover:bg-blue-50 transition-colors flex items-center gap-1.5 cursor-pointer">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export to Excel (3 items)</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Effective date</th>
                    <th className="py-3 px-4">Expiration date</th>
                    <th className="py-3 px-4">Document type</th>
                    <th className="py-3 px-4">Creditor</th>
                    <th className="py-3 px-4">Debtor</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4 text-center">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                  {liensRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3.5 px-4 text-gray-700">{row.status}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-800">{row.effectiveDate}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-800">{row.expirationDate}</td>
                      <td className="py-3.5 px-4 text-gray-800">{row.documentType}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#2563EB] hover:underline cursor-pointer">
                          {row.creditor}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#2563EB] hover:underline cursor-pointer">
                          {row.debtor}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">{row.amount}</td>
                      <td className="py-3.5 px-4 text-center">
                        <ChevronDown className="w-4 h-4 text-gray-400 mx-auto cursor-pointer hover:text-gray-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed pt-2 italic">
              <strong>Liens Disclaimer:</strong> Lien information displayed in this report reflects recorded filings, but may not represent their most recent status. Liens may be released, satisfied, withdrawn, or cancelled by the issuing authority, and such changes may not be immediately reflected here. While we strive to provide accurate information, we cannot guarantee that the status shown reflects the most recent action taken. Users are encouraged to verify the lien details directly with the appropriate County Clerk, Recorder's Office, or local courthouse for official confirmation.
            </p>
          </div>
        )}
      </div>

      {/* 3. TITLE DOCUMENTS PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2563EB] rounded-full" />
            <h2 className="text-xl font-bold text-[#111827]">Title Documents</h2>
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
            {/* Sub-controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button className="px-3.5 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer">
                <FileText className="w-3.5 h-3.5 text-gray-500" />
                <span>All Document Types</span>
                <DropdownIcon className="w-3.5 h-3.5 text-gray-400" />
              </button>

              <button className="px-3.5 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-[#2563EB] hover:bg-blue-50 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export to Excel (30 items)</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F8F9FA] text-gray-600 font-bold border-b border-gray-200 text-xs">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Party 1</th>
                    <th className="py-3 px-4">Party 2</th>
                    <th className="py-3 px-4 text-center">Doc image</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/60 text-xs text-[#111827] font-medium">
                  {titleDocsRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-gray-800 whitespace-nowrap">
                        <span className="block">{row.dateR}</span>
                        {row.dateD && <span className="block text-gray-500 text-[11px]">{row.dateD}</span>}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-gray-900 block">{row.type}</span>
                        <span className="text-[11px] text-gray-500 font-mono block">({row.docId})</span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">{row.amount}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#2563EB] hover:underline cursor-pointer block">
                          {row.party1Name}
                        </span>
                        {row.party1Addr && (
                          <span className="text-[11px] text-gray-500 block">{row.party1Addr}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#2563EB] hover:underline cursor-pointer block">
                          {row.party2Name}
                        </span>
                        {row.party2Addr && (
                          <span className="text-[11px] text-gray-500 block">{row.party2Addr}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDocClick(row.docId)}
                          className="text-[#2563EB] hover:text-blue-700 p-1 inline-block cursor-pointer"
                          title="View Doc Image"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center justify-center gap-1 mx-auto sm:mx-0 text-xs font-semibold">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed font-medium"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(1)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    page === 1 ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  1
                </button>
                <button
                  onClick={() => setPage(2)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    page === 2 ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  2
                </button>
                <button
                  onClick={() => setPage(3)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    page === 3 ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  3
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-[#2563EB] hover:bg-blue-50 font-medium cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
