import React, { useState } from 'react';
import { ShieldAlert, Filter, AlertTriangle, Info } from 'lucide-react';

export const ViolationsTab = ({ property }) => {
  const [selectedAgency, setSelectedAgency] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  if (!property) return null;

  const complaintsList = [
    {
      date: '10/14/2023',
      agency: 'DOB',
      complaintType: 'General Construction / Plumbing',
      descriptor: 'Unpermitted Pipe Overhaul & Wall Alteration',
      address: '42-07 12th St',
      status: 'Closed',
      resolution: 'Inspector verified active permit filing on site.',
      closedDate: '10/18/2023',
    },
    {
      date: '08/04/2023',
      agency: 'DOT',
      complaintType: 'Street Condition / Pothole',
      descriptor: 'Roadway Surface Collapse Near Loading Zone',
      address: '42-07 12th St',
      status: 'Closed',
      resolution: 'DOT repaired street asphalt patch.',
      closedDate: '08/09/2023',
    },
    {
      date: '03/11/2023',
      agency: 'NYPD',
      complaintType: 'Blocked Driveway',
      descriptor: 'Commercial Van Blocking Commercial Loading Entrance',
      address: '42-07 12th St',
      status: 'Closed',
      resolution: 'Officer issued summons to vehicle owner.',
      closedDate: '03/11/2023',
    },
    {
      date: '11/19/2022',
      agency: 'DSNY',
      complaintType: 'Illegal Dumping',
      descriptor: 'Bulk Construction Debris Left on Sidewalk',
      address: '42-07 12th St',
      status: 'Closed',
      resolution: 'Sanitation cleared debris and cited violator.',
      closedDate: '11/22/2022',
    },
    {
      date: '07/02/2022',
      agency: 'DOHMH',
      complaintType: 'Rodent',
      descriptor: 'Signs of Rodents Near Exterior Trash Enclosure',
      address: '42-07 12th St',
      status: 'Closed',
      resolution: 'Health inspector completed baiting and inspection.',
      closedDate: '07/08/2022',
    },
    {
      date: '04/15/2022',
      agency: 'DSNY',
      complaintType: 'Dirty Condition',
      descriptor: 'Sidewalk Litter & Commercial Refuse Accumulation',
      address: '42-07 12th St',
      status: 'Closed',
      resolution: 'Owner cleaned premises following notice.',
      closedDate: '04/18/2022',
    },
    {
      date: '01/20/2022',
      agency: 'NYPD',
      complaintType: 'Illegal Parking',
      descriptor: 'Commercial Truck Parked on Sidewalk',
      address: '42-07 12th St',
      status: 'Closed',
      resolution: 'Vehicle moved upon officer arrival.',
      closedDate: '01/20/2022',
    },
    {
      date: '09/08/2021',
      agency: 'DHS',
      complaintType: 'Encampment',
      descriptor: 'Temporary Outdoor Encampment Near Alleyway',
      address: '42-07 12th St',
      status: 'Closed',
      resolution: 'DHS outreach team assisted individuals.',
      closedDate: '09/12/2021',
    },
    {
      date: '05/14/2021',
      agency: 'DSNY',
      complaintType: 'Derelict Vehicles',
      descriptor: 'Abandoned Commercial Flatbed Van',
      address: '42-07 12th St',
      status: 'Closed',
      resolution: 'DSNY towed vehicle from premises.',
      closedDate: '05/20/2021',
    },
  ];

  const filteredComplaints = complaintsList.filter((item) => {
    if (selectedAgency !== 'ALL' && item.agency !== selectedAgency) return false;
    if (selectedStatus !== 'ALL' && item.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-8 font-sans text-[#111827]">
      {/* PROPERTY 311 COMPLAINTS CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-[#111827] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#2563EB]" />
              <span>PROPERTY 311 COMPLAINTS & VIOLATIONS</span>
            </h3>
            <p className="text-xs text-[#667085] mt-0.5 font-mono">
              BBL Parcel: {property.bbl}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-[#667085] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Agency:
            </span>
            {['ALL', 'DOB', 'DOT', 'NYPD', 'DSNY', 'DOHMH', 'DHS'].map((a) => (
              <button
                key={a}
                onClick={() => setSelectedAgency(a)}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  selectedAgency === a
                    ? 'bg-[#0A1020] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F7F8FC] text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                <th className="py-3.5 px-4 rounded-l-xl">Date</th>
                <th className="py-3.5 px-4">Agency</th>
                <th className="py-3.5 px-4">Complaint Type</th>
                <th className="py-3.5 px-4">Descriptor</th>
                <th className="py-3.5 px-4">Address</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Resolution Description</th>
                <th className="py-3.5 px-4 rounded-r-xl">Closed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[#111827]">
              {filteredComplaints.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-[#2563EB]">{item.date}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-xs">
                    <span className="px-2 py-0.5 bg-indigo-50 text-[#4F46E5] rounded border border-indigo-100">
                      {item.agency}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-xs text-[#111827]">{item.complaintType}</td>
                  <td className="py-3.5 px-4 text-xs text-gray-700">{item.descriptor}</td>
                  <td className="py-3.5 px-4 text-xs font-mono text-gray-500">{item.address}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded uppercase">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-600 max-w-xs truncate" title={item.resolution}>
                    {item.resolution}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-gray-400">{item.closedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEIGHBORHOOD COMPLAINTS CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-black text-[#111827] mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-[#4F46E5]" />
          <span>NEIGHBORHOOD COMPLAINTS</span>
        </h3>
        <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-gray-200 text-xs text-[#667085] font-mono font-semibold">
          Exact PropertyShark neighborhood radius/filter not confirmed.
        </div>
      </div>
    </div>
  );
};
