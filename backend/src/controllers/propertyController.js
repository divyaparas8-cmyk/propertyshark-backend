import { propertyService } from '../services/propertyService.js';
import { sendSuccess } from '../utils/response.js';

export const propertyController = {
  autocomplete: async (req, res, next) => {
    try {
      const query = req.query.q || req.query.text || '';
      const suggestions = await propertyService.autocomplete(query);
      return sendSuccess(res, suggestions, `Retrieved ${suggestions.length} property suggestions`, 200);
    } catch (error) {
      next(error);
    }
  },

  resolveProperty: async (req, res, next) => {
    try {
      const input = req.body || req.query;
      const identity = await propertyService.resolveProperty(input);
      return sendSuccess(res, identity, 'Property identity resolved successfully', 200);
    } catch (error) {
      next(error);
    }
  },

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
