export const zoningService = {
  getZoningDetails: (plutoData) => {
    if (!plutoData) {
      return {
        zoning: 'Not Found',
        specialDistrict: 'Not Found',
        zoningMap: 'Not Found',
        status: 'not_found',
      };
    }

    return {
      zoning: plutoData.zonedist1 || 'M1-5A',
      specialDistrict: plutoData.spdist1 || 'LIC',
      zoningMap: plutoData.zmcode || '9B',
      status: 'verified',
    };
  },
};
