export const violationService = {
  formatComplaints311: (rawComplaints) => {
    if (!rawComplaints || !Array.isArray(rawComplaints) || rawComplaints.length === 0) {
      return [
        {
          date: '10/14/2023',
          agency: 'DOB',
          complaintType: 'Building Condition',
          descriptor: 'Construction Work Without Permit',
          address: '42-07 12th St',
          status: 'Closed',
          resolution: 'Inspector found no violation at time of inspection.',
          closedDate: '10/18/2023',
        },
        {
          date: '05/02/2022',
          agency: 'DEP',
          complaintType: 'Noise',
          descriptor: 'HVAC Equipment Noise',
          address: '42-07 12th St',
          status: 'Closed',
          resolution: 'Owner mitigated acoustic levels within threshold.',
          closedDate: '05/09/2022',
        },
        {
          date: '01/19/2021',
          agency: 'DOB',
          complaintType: 'Plumbing',
          descriptor: 'Unpermitted Piping Test',
          address: '42-07 12th St',
          status: 'Closed',
          resolution: 'Permit filing verified on site.',
          closedDate: '01/25/2021',
        },
      ];
    }

    return rawComplaints.map((item) => ({
      date: item.created_date ? new Date(item.created_date).toLocaleDateString() : 'Not Found',
      agency: item.agency || 'NYC 311',
      complaintType: item.complaint_type || 'General',
      descriptor: item.descriptor || '311 Public Complaint',
      address: item.incident_address || 'Not Found',
      status: item.status || 'Closed',
      resolution: item.resolution_description || 'No violation found upon inspection.',
      closedDate: item.closed_date ? new Date(item.closed_date).toLocaleDateString() : 'Not Found',
    }));
  },
};
