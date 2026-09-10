import { propertyService } from './propertyService';

/**
 * Service layer for Registered Owners and DOB Permit contacts.
 */
export const contactService = {
  getContactsByBBL: async (bbl) => {
    const property = await propertyService.getPropertyByBBL(bbl);
    return property?.contacts || { registeredOwner: null, permitContacts: [] };
  },
};
