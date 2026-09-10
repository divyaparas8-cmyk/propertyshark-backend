import { propertyService } from './propertyService';

/**
 * Service layer for Assessment & Valuation history.
 * Prepared for NYC Assessment Roll API (8y4t-faws).
 */
export const valuationService = {
  getValuationByBBL: async (bbl) => {
    const property = await propertyService.getPropertyByBBL(bbl);
    return {
      lastSale: property?.lastSale || null,
      assessmentHistory: property?.assessmentHistory || [],
    };
  },
};
