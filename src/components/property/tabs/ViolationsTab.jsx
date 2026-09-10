import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Bell, ExternalLink, MapPin } from 'lucide-react';

export const ViolationsTab = ({ property }) => {
  const [showAep, setShowAep] = useState(true);
  const [showHpdViolations, setShowHpdViolations] = useState(true);
  const [show311, setShow311] = useState(true);
  const [showNeighborhood, setShowNeighborhood] = useState(true);
  const [activePage, setActivePage] = useState(1);

  if (!property) return null;

  const complaints311 = [
    {
      created: '05/31/2025',
      agency: 'DHS',
      type: 'Encampment',
      descriptor: 'Temporary Shelter',
      disposition: 'The Police Department visited the location and has referred the complaint to the Department of Homeless Services (DHS) for further action. DHS will inspect the condition and update your Service Request with more information.',
      closed: '05/31/2025',
    },
    {
      created: '03/11/2025',
      agency: 'NYPD',
      type: 'Encampment',
      descriptor: 'Public Space',
      disposition: 'The Police Department visited the location and has referred the complaint to the Department of Homeless Services (DHS) for further action. DHS will inspect the condition and update your Service Request with more information.',
      closed: '03/11/2025',
    },
    {
      created: '10/07/2024',
      agency: 'NYPD',
      type: 'Encampment',
      descriptor: 'Sidewalk Obstruction',
      disposition: 'The Police Department visited the location and has referred the complaint to the Department of Homeless Services (DHS) for further action. DHS will inspect the condition and update your Service Request with more information.',
      closed: '10/07/2024',
    },
    {
      created: '05/03/2023',
      agency: 'NYPD',
      type: 'Encampment',
      descriptor: 'Building Entrance',
      disposition: 'The Police Department visited the location and has referred the complaint to the Department of Homeless Services (DHS) for further action. DHS will inspect the condition and update your Service Request with more information.',
      closed: '05/03/2023',
    },
    {
      created: '10/29/2022',
      agency: 'DOHMH',
      type: 'Mobile food vendor',
      descriptor: 'Garbage',
      disposition: 'The Department of Health inspected the mobile food vendor location and issued a warning notice regarding waste disposal.',
      closed: '11/02/2022',
    },
    {
      created: '10/22/2022',
      agency: 'NYPD',
      type: 'Encampment',
      descriptor: 'Alleyway',
      disposition: 'The Police Department visited the location and no Encampment was found.',
      closed: '10/22/2022',
    },
    {
      created: '10/22/2022',
      agency: 'NYPD',
      type: 'Encampment',
      descriptor: 'Loading Zone',
      disposition: 'The Police Department visited the location and no Encampment was found.',
      closed: '10/22/2022',
    },
    {
      created: '10/07/2022',
      agency: 'DOHMH',
      type: 'Mobile food vendor',
      descriptor: 'Insects / pests',
      disposition: 'Health department conducted a field visit and found conditions rectified.',
      closed: '10/12/2022',
    },
  ];

  const neighborhoodComplaints = [
    {
      created: '10/11/2025',
      agency: 'DOT',
      type: 'Street condition',
      descriptor: 'Pothole',
      disposition: 'The Department of Transportation inspected this complaint and resolved the problem.',
      closed: '10/12/2025',
    },
    {
      created: '06/24/2024',
      agency: 'NYPD',
      type: 'Blocked driveway',
      descriptor: 'No access',
      disposition: 'The Police Department responded to the complaint and with the information available observed no evidence of the violation at that time.',
      closed: '06/24/2024',
    },
    {
      created: '06/24/2024',
      agency: 'DOHMH',
      type: 'Rodent',
      descriptor: 'Condition attracting rodents',
      disposition: 'Health department inspected the site and provided vector control guidance to property management.',
      closed: '07/01/2024',
    },
    {
      created: '01/11/2023',
      agency: 'NYPD',
      type: 'Illegal parking',
      descriptor: 'Violation',
      disposition: 'Information available observed no evidence of the violation at that time.',
      closed: '01/11/2023',
    },
    {
      created: '01/11/2023',
      agency: 'NYPD',
      type: 'Illegal parking',
      descriptor: 'Posted parking sign violation',
      disposition: 'The Police Department reviewed your complaint and provided additional information below.',
      closed: '01/11/2023',
    },
    {
      created: '10/30/2022',
      agency: 'NYPD',
      type: 'Illegal parking',
      descriptor: 'Commercial overnight parking',
      disposition: 'The Police Department responded to the complaint and took action to fix the condition.',
      closed: '10/30/2022',
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#111827]">
      {/* 1. HPD Alternative Enforcement Program */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              HPD Alternative Enforcement Program
            </h3>
          </div>
          <button
            onClick={() => setShowAep(!showAep)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showAep ? (
              <>
                Hide panel <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show panel <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {showAep && (
          <div className="space-y-6">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              The HPD Alternative Enforcement Program (AEP) map is based on the current monthly HPD violations on a building divided by the number of units. It includes open hazardous and immediately hazardous violations (Class B and C) recorded within the past five years.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#F9FAFB] p-5 rounded-2xl border border-gray-200/80">
              {/* Left side: Map Preview Graphic */}
              <div className="md:col-span-7 relative h-56 rounded-xl overflow-hidden border border-gray-200 bg-slate-100 group">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-85"
                  style={{
                    backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-73.94,40.74,12,0/600x350?access_token=pk.placeholder')`,
                    backgroundColor: '#e5e7eb'
                  }}
                >
                  {/* Mock map features fallback SVG */}
                  <svg className="w-full h-full text-slate-300" viewBox="0 0 400 200" fill="none">
                    <path d="M0,80 Q100,120 200,60 T400,100" stroke="#cbd5e1" strokeWidth="12" fill="none" />
                    <path d="M50,0 Q80,100 120,200" stroke="#94a3b8" strokeWidth="8" fill="none" />
                    <path d="M250,0 L200,200" stroke="#cbd5e1" strokeWidth="6" fill="none" />
                  </svg>
                </div>
                
                {/* Pins */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <MapPin className="w-8 h-8 text-[#2563EB] drop-shadow-md fill-blue-600/30" />
                  </div>
                </div>
                <div className="absolute top-1/3 left-1/3">
                  <span className="w-3 h-3 bg-red-600 rounded-full inline-block ring-2 ring-white"></span>
                </div>
                <div className="absolute bottom-1/4 right-1/3">
                  <span className="w-3 h-3 bg-amber-500 rounded-full inline-block ring-2 ring-white"></span>
                </div>

                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold text-gray-700 shadow-xs border border-gray-200">
                  New York, NY
                </div>
              </div>

              {/* Right side: Legend */}
              <div className="md:col-span-5 space-y-4">
                <div className="space-y-2 text-xs font-semibold text-gray-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 bg-[#7F1D1D] rounded-xs border border-red-950/20 inline-block"></span>
                    <span>In AEP program</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-[#C2410C] rounded-xs border border-orange-950/20 inline-block"></span>
                    <span>Well above AEP threshold</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 bg-[#F97316] rounded-xs border border-orange-950/20 inline-block"></span>
                    <span>Above AEP threshold</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 bg-[#FACC15] rounded-xs border border-yellow-950/20 inline-block"></span>
                    <span>At AEP threshold</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 bg-[#FEF08A] rounded-xs border border-yellow-950/20 inline-block"></span>
                    <span>Near AEP threshold</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200/80 text-xs text-gray-700">
                  <p className="font-bold text-gray-900 mb-1">HPD-AEP threshold by property size:</p>
                  <p className="text-gray-600">3–14 units: 5 violations/unit</p>
                  <p className="text-gray-600">15+ units: 3 violations/unit</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. HPD Violations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              HPD Violations
            </h3>
          </div>
          <button
            onClick={() => setShowHpdViolations(!showHpdViolations)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showHpdViolations ? (
              <>
                Hide panel <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show panel <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {showHpdViolations && (
          <div className="space-y-5">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Excessive violations can adversely affect the support provided by the NYC Department of Housing Preservation and Development (HPD) and can lead to building-wide inspections, emergency fees and mandatory repairs to address underlying conditions. In some cases, unresolved violations may result in a lien against the property. Buildings with extensive violations may also face significant difficulty obtaining mortgage financing.
            </p>

            <p className="text-xs text-gray-500 font-medium">
              No violation records available for this property. Verify status through{' '}
              <a
                href="https://hpdonline.nyc.gov"
                target="_blank"
                rel="noreferrer"
                className="text-[#2563EB] underline hover:text-blue-700 inline-flex items-center gap-0.5"
              >
                HPD <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
              .
            </p>

            {/* Alert Notification Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <button className="text-xs font-bold text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 shadow-2xs transition-colors cursor-pointer mr-2">
                    Get property alerts
                  </button>
                  <span className="text-xs text-gray-600">
                    Get e-mail alerts for new property record filings, including deeds, permits, foreclosures or violations.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. 311 Complaints */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              311 Complaints
            </h3>
          </div>
          <button
            onClick={() => setShow311(!show311)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {show311 ? (
              <>
                Hide panel <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show panel <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {show311 && (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#F8F9FA] text-[11px] font-bold text-gray-700">
                    <th className="py-3 px-4 w-28">Created</th>
                    <th className="py-3 px-4 w-20">Agency</th>
                    <th className="py-3 px-4 w-36">Type</th>
                    <th className="py-3 px-4 w-36">Descriptor</th>
                    <th className="py-3 px-4">Disposition</th>
                    <th className="py-3 px-4 w-28">Closed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800 font-medium">
                  {complaints311.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-gray-600 whitespace-nowrap">{row.created}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">{row.agency}</td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">{row.type}</td>
                      <td className="py-3.5 px-4 text-gray-600">{row.descriptor || '—'}</td>
                      <td className="py-3.5 px-4 text-gray-600 leading-relaxed max-w-md">
                        {row.disposition}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-600 whitespace-nowrap">{row.closed || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 font-medium pt-1">
              Verify complaint status on{' '}
              <a
                href="https://opendata.cityofnewyork.us"
                target="_blank"
                rel="noreferrer"
                className="text-[#2563EB] underline hover:text-blue-700"
              >
                NYC Open Data
              </a>
              .
            </p>
          </div>
        )}
      </div>

      {/* 4. Neighborhood Complaints */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block"></span>
            <h3 className="text-lg font-black text-[#111827] uppercase tracking-wide">
              Neighborhood Complaints
            </h3>
          </div>
          <button
            onClick={() => setShowNeighborhood(!showNeighborhood)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showNeighborhood ? (
              <>
                Hide panel <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show panel <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {showNeighborhood && (
          <div className="space-y-5">
            <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#F8F9FA] text-[11px] font-bold text-gray-700">
                    <th className="py-3 px-4 w-28">Created</th>
                    <th className="py-3 px-4 w-20">Agency</th>
                    <th className="py-3 px-4 w-36">Type</th>
                    <th className="py-3 px-4 w-36">Descriptor</th>
                    <th className="py-3 px-4">Disposition</th>
                    <th className="py-3 px-4 w-28">Closed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800 font-medium">
                  {neighborhoodComplaints.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-gray-600 whitespace-nowrap">{row.created}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">{row.agency}</td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">{row.type}</td>
                      <td className="py-3.5 px-4 text-gray-600">{row.descriptor || '—'}</td>
                      <td className="py-3.5 px-4 text-gray-600 leading-relaxed max-w-md">
                        {row.disposition}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-600 whitespace-nowrap">{row.closed || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <button
                disabled={activePage === 1}
                onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Previous
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`w-8 h-8 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                    activePage === page
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={activePage === 3}
                onClick={() => setActivePage((prev) => Math.min(prev + 1, 3))}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
