import { propertyService } from './propertyService';

/**
 * Service layer for DOB Permits & DOB Filings.
 * Prepared for DOB Permits API (ic3t-wcy2) & DOB Filing (w9ak-ipjd).
 */
export const permitService = {
  getPermitsByBBL: async (bbl) => {
    const property = await propertyService.getPropertyByBBL(bbl);
    return property?.permits || [];
  },
};
