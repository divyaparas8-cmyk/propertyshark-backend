import { propertyService } from './propertyService';

/**
 * Service layer for Tax rates and tax assessment values.
 * Prepared for NYC Property Tax Rates API (7zb8-7bpk).
 */
export const taxService = {
  getTaxDetailsByBBL: async (bbl) => {
    const property = await propertyService.getPropertyByBBL(bbl);
    return property?.taxInfo || null;
  },
};
