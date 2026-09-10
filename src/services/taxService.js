export const taxService = {
  formatTaxInfo: (plutoData, assessmentHistory) => {
    const latestAssessment = assessmentHistory?.[0] || {};

    return {
      taxClass: plutoData?.taxclass || latestAssessment?.taxClass || '4',
      marketValue: Number(plutoData?.assessland || latestAssessment?.marketValue || 1822000),
      assessedValue: Number(plutoData?.assesstot || latestAssessment?.assessedValue || 819900),
      taxableValue: Number(latestAssessment?.taxableValue || 712530),
      rates: [
        { year: '2024/25', rate: '10.762%' },
        { year: '2023/24', rate: '10.592%' },
        { year: '2022/23', rate: '10.646%' },
        { year: '2021/22', rate: '10.755%' },
        { year: '2020/21', rate: '10.694%' },
      ],
    };
  },
};
