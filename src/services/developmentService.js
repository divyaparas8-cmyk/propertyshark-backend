import { propertyService } from './propertyService';

/**
 * Service layer for Zoning and E-Designation details.
 * Prepared for Zoning API (fdkv-4t4z) & E-Designation (hxm3-23vy).
 */
export const developmentService = {
  getDevelopmentByBBL: async (bbl) => {
    const property = await propertyService.getPropertyByBBL(bbl);
    if (!property) return null;

    // Calculate maximum buildable sq ft and remaining buildable sq ft
    const lotArea = property.lotAreaSqFt || 0;
    const commercialFar = property.far?.commercial || 0;
    const buildingArea = property.buildingAreaSqFt || 0;

    const maxBuildableSqFt = lotArea * commercialFar;
    const remainingBuildableSqFt = Math.max(0, maxBuildableSqFt - buildingArea);

    return {
      zoning: property.zoning || 'Not Found',
      specialDistrict: property.specialDistrict || 'Not Found',
      zoningMap: property.zoningMap || 'Not Found',
      far: {
        ...property.far,
        maxBuildableSqFt,
        remainingBuildableSqFt,
      },
      development: property.development || {},
      lotAreaSqFt: lotArea,
      buildingAreaSqFt: buildingArea,
    };
  },
};
