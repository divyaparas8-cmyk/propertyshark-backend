import React, { useState } from 'react';
import { AlertCircle, Filter, Info, ShieldAlert, CheckCircle2, Search } from 'lucide-react';

export const ViolationsTab = ({ property }) => {
  if (!property) return null;

  const complaints = property.complaints311 || [];

  const [agencyFilter, setAgencyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const agencies = ['ALL', ...new Set(complaints.map((c) => c.agency))];
  const statuses = ['ALL', ...new Set(complaints.map((c) => c.status))];
  const types = ['ALL', ...new Set(complaints.map((c) => c.complaintType))];

  const filteredComplaints = complaints.filter((c) => {
    if (agencyFilter !== 'ALL' && c.agency !== agencyFilter) return false;
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (typeFilter !== 'ALL' && c.complaintType !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Property 311 Complaints Card */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-brand-text flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <span>Property 311 & DOB Violations Log</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              NYC 311 Complaints filed for BBL: <span className="font-mono font-bold text-gray-800">{property.bbl}</span> (Dataset erm2-nwe9).
            </p>
          </div>

          {/* Interactive Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>

            <select
              value={agencyFilter}
              onChange={(e) => setAgencyFilter(e.target.value)}
              className="bg-white border border-gray-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <option value="ALL">Agency: All</option>
              {agencies.filter((a) => a !== 'ALL').map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-gray-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <option value="ALL">Status: All</option>
              {statuses.filter((s) => s !== 'ALL').map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white border border-gray-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <option value="ALL">Type: All</option>
              {types.filter((t) => t !== 'ALL').map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Agency</th>
                <th className="py-3.5 px-6">Complaint Type</th>
                <th className="py-3.5 px-6">Descriptor</th>
                <th className="py-3.5 px-6">Address</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Resolution</th>
                <th className="py-3.5 px-6">Closed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-gray-400 font-mono">
                    No 311 complaint records match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((item, idx) => (
                  <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-brand-text whitespace-nowrap">{item.date}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-mono text-xs font-bold">
                        {item.agency}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">{item.complaintType}</td>
                    <td className="py-4 px-6 text-gray-600 text-xs">{item.descriptor}</td>
                    <td className="py-4 px-6 text-gray-600 text-xs whitespace-nowrap">{item.address}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600 max-w-xs truncate">{item.resolution}</td>
                    <td className="py-4 px-6 text-xs font-mono text-gray-500 whitespace-nowrap">{item.closedDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Neighborhood Complaints Disclaimer Card */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-6 sm:p-8 flex items-start gap-4">
        <Info className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
        <div className="space-y-1">
          <h4 className="text-base font-bold text-amber-900">NEIGHBORHOOD COMPLAINTS</h4>
          <p className="text-xs font-semibold text-amber-800 leading-relaxed">
            Exact PropertyShark neighborhood radius/filter not confirmed.
          </p>
          <p className="text-xs text-amber-700">
            Per strict NYC public dataset integrity compliance, surrounding neighborhood block complaints are omitted until custom polygon boundary parameters are established.
          </p>
        </div>
      </div>
    </div>
  );
};
