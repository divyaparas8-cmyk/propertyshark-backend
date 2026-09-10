import { propertyService } from './propertyService';

/**
 * Service layer for ACRIS Deeds, Mortgages, Liens, Title documents.
 * Prepared for ACRIS Legals (8h5j-fqxa), Master (bnx9-e6tj), Parties (636b-3b5g).
 */
export const documentService = {
  getDocumentsByBBL: async (bbl) => {
    const property = await propertyService.getPropertyByBBL(bbl);
    return property?.documents || { deedSummary: null, liens: 'Not Found', acrisDocuments: [] };
  },
};
