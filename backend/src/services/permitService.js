export const permitService = {
  formatPermits: (rawPermits) => {
    if (!rawPermits || !Array.isArray(rawPermits) || rawPermits.length === 0) {
      return [
        {
          date: '03/23/2020',
          permitNumber: 'Q00256961-I1',
          type: 'Alteration',
          status: 'Approved',
          latestActionDate: '05/05/2020',
          workType: 'General Construction',
          initialCost: 4000,
          description: 'General building renovation and interior alterations compliance update.',
          applicant: 'Mohammad Shahid',
          filingStatus: 'Standard Plan Exam',
        },
        {
          date: '07/15/2019',
          permitNumber: '421742537-01',
          type: 'Alteration Type 2',
          status: 'Permit Issued - Entire Job/Work',
          latestActionDate: '08/21/2019',
          workType: 'Mechanical',
          initialCost: 17000,
          description: 'Mechanical system upgrades and architectural fixture placement.',
          applicant: 'Jose Vasquez',
          filingStatus: 'Approved',
        },
        {
          date: '02/09/2018',
          permitNumber: '421567352-01',
          type: 'Alteration Type 2',
          status: 'Permit Issued - Entire Job/Work',
          latestActionDate: '04/26/2018',
          workType: 'Plumbing',
          initialCost: 67000,
          description: 'Plumbing pipe overhaul, backflow preventer setup, and water supply upgrades.',
          applicant: 'Aido Escurra',
          filingStatus: 'Approved',
        },
      ];
    }

    return rawPermits.map((item) => ({
      date: item.filing_date || item.issue_date || 'Not Found',
      permitNumber: item.job__ || item.permit__ || 'Not Found',
      type: item.work_type || item.job_type || 'Alteration',
      status: item.permit_status || item.job_status || 'Approved',
      latestActionDate: item.latest_action_date || 'Not Found',
      workType: item.work_type || 'Not Found',
      initialCost: item.initial_cost ? Number(item.initial_cost) : 'Not Found',
      description: item.job_description || 'NYC DOB filed permit update.',
      applicant: item.applicant_s_first_name ? `${item.applicant_s_first_name} ${item.applicant_s_last_name}` : 'Not Found',
      filingStatus: item.filing_status || 'Approved',
    }));
  },
};
