import { propertyService } from './propertyService';

/**
 * Service layer for 311 Complaints and violations.
 * Prepared for NYC 311 Service Requests API (erm2-nwe9).
 */
export const violationService = {
  get311ComplaintsByBBL: async (bbl) => {
    const property = await propertyService.getPropertyByBBL(bbl);
    return property?.complaints311 || [];
  },
};
