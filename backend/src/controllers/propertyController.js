import { propertyService } from '../services/propertyService.js';
import { sendSuccess } from '../utils/response.js';

export const propertyController = {
  search: async (req, res, next) => {
    try {
      const query = req.query.q || '';
      const results = await propertyService.searchProperties(query);
      return sendSuccess(res, results, `Found ${results.length} matching parcel records`, 200);
    } catch (error) {
      next(error);
    }
  },

  getByBBL: async (req, res, next) => {
    try {
      const { bbl } = req.params;
      const property = await propertyService.getPropertyByBBL(bbl);
      return sendSuccess(res, property, 'Property parcel record retrieved', 200);
    } catch (error) {
      next(error);
    }
  },
};
