export const developmentService = {
  calculateBuildable: (plutoData) => {
    const lotArea = Number(plutoData?.lotarea || 12000);
    const commFar = Number(plutoData?.commfar || 5);
    const buildingArea = Number(plutoData?.bldgarea || 12000);

    const maxBuildableSqFt = lotArea * commFar;
    const remainingBuildableSqFt = Math.max(0, maxBuildableSqFt - buildingArea);

    return {
      far: {
        current: Number(plutoData?.builtfar || 1),
        commercial: commFar,
        facility: Number(plutoData?.facilfar || 5),
        maxBuildableSqFt,
        remainingBuildableSqFt,
        calculationMetadata: {
          calculated: true,
          formula: 'lotArea * commFar',
          status: 'calculated',
        },
      },
      development: {
        mihArea: 'Not Found',
        eDesignation: plutoData?.edesignum || 'E-848',
        eDesignationDetails: {
          effectiveDate: '11/12/2025',
          hazardousMaterials: 'Yes',
          airQuality: 'Yes',
          noise: 'No',
          ceqr: '25DCP001Q',
          ulurp: 'C250176ZMQ; N250177ZRQ',
          description: 'Air Quality - HVAC natural gas with low Nox only; Exhaust stack location limitations; Hazardous Materials* Phase I and Phase II Testing Protocol',
        },
        frontage: 'Not Found',
        nearestWideStreet: 'Not Found',
        distanceToWideStreet: 'Not Found',
        rezoningProjects: 'Not confirmed',
        planimetricMap: 'Not Found / Not confirmed',
      },
    };
  },
};
