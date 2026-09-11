import axios from 'axios';
import { env } from '../config/env.js';

const client = axios.create({
  baseURL: env.NYC_OPEN_DATA.BASE_URL,
  timeout: 15000, // 15 seconds timeout
});

const PLUTO_FIELDS = 'bbl,address,zipcode,borough,ownername,bldgclass,yearbuilt,numfloors,numbldgs,unitstotal,unitsres,lotarea,bldgarea,comarea,factryarea,lotfront,lotdepth,bldgfront,bldgdepth,zonedist1,zonemap,commfar,facilfar,builtfar,residfar,assessland,assesstot';

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
    if (!bbl) return null;
    const cleanBbl = String(bbl).trim();
    const formattedBbl = cleanBbl.includes('.') ? cleanBbl : `${cleanBbl}.00000000`;
    const res = await nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.PLUTO, {
      $select: PLUTO_FIELDS,
      $where: `bbl = '${cleanBbl}' OR bbl = '${formattedBbl}'`,
      $limit: 1,
    });
    return res.status === 'success' && res.data && res.data.length > 0 ? res.data[0] : null;
  },

  searchPluto: async (query) => {
    if (!query || !query.trim()) {
      const res = await nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.PLUTO, {
        $select: PLUTO_FIELDS,
        $limit: 15,
      });
      return res.status === 'success' ? res.data || [] : [];
    }

    const q = query.trim().replace(/'/g, "''").toUpperCase();
    const isNum = /^\d+(\.\d+)?$/.test(q);

    let whereClause = `address LIKE '%${q}%'`;
    if (isNum) {
      const formattedBbl = q.length === 10 ? `${q}.00000000` : q;
      whereClause = `address LIKE '%${q}%' OR bbl = '${q}' OR bbl = '${formattedBbl}' OR zipcode = '${q}'`;
    }

    const res = await nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.PLUTO, {
      $select: PLUTO_FIELDS,
      $where: whereClause,
      $limit: 20,
    });

    return res.status === 'success' ? res.data || [] : [];
  },

  /**
   * Fetch Assessment roll records
   */
  getAssessmentRecords: async (bbl) => {
    if (!bbl) return { status: 'unavailable', data: [] };
    const cleanBbl = String(bbl).trim().split('.')[0].replace(/\D/g, '');
    if (cleanBbl.length < 10) return { status: 'unavailable', data: [] };
    const boro = cleanBbl[0];
    const block = parseInt(cleanBbl.slice(1, 6), 10);
    const lot = parseInt(cleanBbl.slice(6, 10), 10);

    // Fetch both Current Assessment Roll (8y4t-faws) and Historical Assessment Roll (yjxr-fw8i) in parallel
    const [currentRes, histRes] = await Promise.allSettled([
      nycOpenDataService.fetchDataset('8y4t-faws', { parid: cleanBbl }),
      nycOpenDataService.fetchDataset('yjxr-fw8i', {
        boro: String(boro),
        block: String(block),
        lot: String(lot),
      }),
    ]);

    const currentRecords = currentRes.status === 'fulfilled' && currentRes.value?.status === 'success' ? (currentRes.value?.data || []) : [];
    const histRecords = histRes.status === 'fulfilled' && histRes.value?.status === 'success' ? (histRes.value?.data || []) : [];

    return {
      status: 'success',
      data: {
        current: currentRecords,
        historical: histRecords,
      },
    };
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
   * Uses native fetch (not axios) for this dataset — axios has socket-level timeout
   * issues with ic3t-wcy2 on this environment even though the endpoint works fine.
   */
  getDobPermits: async (bbl, bin) => {
    const PERMIT_FIELDS = '$select=pre__filing_date,latest_action_date,job__,doc__,job_type,job_status_descrp,approved,other_description,building_type,initial_cost,job_description,applicant_s_first_name,applicant_s_last_name,block,lot,bin__,bbl&$limit=50';

    if (!bbl && !bin) return { status: 'unavailable', data: [] };

    const cleanBbl = bbl ? String(bbl).trim().split('.')[0] : '';
    const baseUrl = `${env.NYC_OPEN_DATA.BASE_URL}/resource/${env.NYC_OPEN_DATA.PERMITS}.json`;

    let queryParam = '';
    if (cleanBbl && cleanBbl.length === 10) {
      const block = cleanBbl.slice(1, 6).padStart(5, '0');
      const lot = cleanBbl.slice(6).padStart(5, '0');
      queryParam = `block=${encodeURIComponent(block)}&lot=${encodeURIComponent(lot)}`;
    } else if (cleanBbl) {
      queryParam = `bbl=${encodeURIComponent(cleanBbl)}`;
    } else if (bin) {
      queryParam = `bin__=${encodeURIComponent(String(bin).trim())}`;
    }

    const url = `${baseUrl}?${queryParam}&${PERMIT_FIELDS}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000); // 90s timeout
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return { status: 'success', data: Array.isArray(data) ? data : [] };
    } catch (err) {
      console.warn(`[NYC Open Data] getDobPermits failed:`, err.message);
      return { status: 'unavailable', data: [] };
    }
  },

  /**
   * Fetch 311 Complaints & Violations
   */
  getComplaints311: async (bbl, address) => {
    const COMPLAINT_FIELDS = 'created_date,agency,complaint_type,descriptor,resolution_description,closed_date,bbl';
    let whereClause = '';

    if (bbl) {
      const cleanBbl = String(bbl).trim().split('.')[0]; // 10-digit BBL (e.g. 4004580098)
      whereClause = `bbl = '${cleanBbl}'`;
    } else if (address) {
      const cleanAddress = address.trim().replace(/'/g, "''").toUpperCase();
      whereClause = `incident_address LIKE '%${cleanAddress}%'`;
    } else {
      return { status: 'unavailable', data: [] };
    }

    return nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.COMPLAINTS_311, {
      $select: COMPLAINT_FIELDS,
      $where: whereClause,
      $order: 'created_date DESC',
      $limit: 25,
    });
  },

  /**
   * Fetch E-Designation details
   */
  getEDesignations: async (bbl) => {
    if (!bbl || bbl.length !== 10) return { status: 'unavailable', data: [] };
    const boro = bbl[0];
    const block = parseInt(bbl.slice(1, 6), 10);
    const lot = parseInt(bbl.slice(6), 10);
    return nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.E_DESIGNATION, {
      $where: `bbl = '${bbl}' OR (borough = '${boro}' AND block = '${block}' AND lot = '${lot}')`,
      $limit: 5,
    });
  },

  /**
   * Fetch ACRIS Title Deeds & Legal Documents
   */
  getAcrisLegals: async (bbl) => {
    if (!bbl || bbl.length !== 10) return { status: 'unavailable', data: [] };
    const boro = bbl[0];
    const block = parseInt(bbl.slice(1, 6), 10);
    const lot = parseInt(bbl.slice(6), 10);
    return nycOpenDataService.fetchDataset(env.NYC_OPEN_DATA.ACRIS_LEGALS, {
      $where: `borough = '${boro}' AND block = '${block}' AND lot = '${lot}'`,
      $limit: 15,
    });
  },
};
