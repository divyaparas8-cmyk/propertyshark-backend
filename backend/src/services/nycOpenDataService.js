import axios from 'axios';
import { env } from '../config/env.js';

const client = axios.create({
  baseURL: env.NYC_OPEN_DATA.BASE_URL,
  timeout: 8000, // 8 seconds timeout
});

export const nycOpenDataService = {
  /**
   * Generic fetcher for Socrata datasets
   */
  fetchDataset: async (datasetId, params = {}) => {
    try {
      const response = await client.get(`/resource/${datasetId}.json`, { params });
      return {
        status: 'success',
        data: response.data || [],
      };
    } catch (error) {
      console.warn(`[NYC Open Data] Failed to fetch dataset ${datasetId}:`, error.message);
      return {
        status: 'unavailable',
        data: null,
        message: `NYC dataset ${datasetId} is currently unavailable`,
      };
    }
  },

  /**
   * Fetch PLUTO property record by BBL or search query
   */
  getPlutoByBBL: async (bbl) => {
    const res = await nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.PLUTO, {
      $where: `bbl = '${bbl}'`,
      $limit: 1,
    });
    return res.status === 'success' && res.data && res.data.length > 0 ? res.data[0] : null;
  },

  searchPluto: async (query) => {
    if (!query || !query.trim()) {
      const res = await nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.PLUTO, {
        $limit: 15,
      });
      return res.status === 'success' ? res.data || [] : [];
    }

    const q = query.trim().replace(/'/g, "''");
    // Search by address, bbl, zip, or borough
    const whereClause = `address LIKE '%${q.toUpperCase()}%' OR bbl LIKE '%${q}%' OR zipcode LIKE '%${q}%' OR borough LIKE '%${q.toUpperCase()}%'`;

    const res = await nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.PLUTO, {
      $where: whereClause,
      $limit: 20,
    });

    return res.status === 'success' ? res.data || [] : [];
  },

  /**
   * Fetch Assessment roll records
   */
  getAssessmentRecords: async (bbl) => {
    return nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.ASSESSMENT, {
      $where: `bbl = '${bbl}'`,
      $order: 'taxyr DESC',
      $limit: 10,
    });
  },

  /**
   * Fetch Property Tax Rates
   */
  getTaxRates: async () => {
    return nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.TAX_RATES, {
      $order: 'tax_year DESC',
      $limit: 10,
    });
  },

  /**
   * Fetch DOB Permits & Filings
   */
  getDobPermits: async (bin) => {
    if (!bin) return { status: 'unavailable', data: [] };
    return nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.PERMITS, {
      $where: `bin__ = '${bin}' OR bin = '${bin}'`,
      $order: 'filing_date DESC',
      $limit: 10,
    });
  },

  /**
   * Fetch 311 Complaints & Violations
   */
  getComplaints311: async (address) => {
    if (!address) return { status: 'unavailable', data: [] };
    const cleanAddress = address.trim().replace(/'/g, "''").toUpperCase();
    return nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.COMPLAINTS_311, {
      $where: `incident_address LIKE '%${cleanAddress}%'`,
      $order: 'created_date DESC',
      $limit: 10,
    });
  },

  /**
   * Fetch E-Designation details
   */
  getEDesignations: async (bbl) => {
    return nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.E_DESIGNATION, {
      $where: `bbl = '${bbl}'`,
      $limit: 5,
    });
  },

  /**
   * Fetch ACRIS Title Deeds & Legal Documents
   */
  getAcrisLegals: async (bbl) => {
    return nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.ACRIS_LEGALS, {
      $where: `bbl = '${bbl}'`,
      $limit: 10,
    });
  },
};
