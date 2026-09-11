import { nycOpenDataService } from './nycOpenDataService.js';
import { assessmentService } from './assessmentService.js';
import { taxService } from './taxService.js';
import { permitService } from './permitService.js';
import { violationService } from './violationService.js';
import { contactService } from './contactService.js';
import { documentService } from './documentService.js';
import { zoningService } from './zoningService.js';
import { developmentService } from './developmentService.js';
import { NotFoundError } from '../utils/errors.js';
import { env } from '../config/env.js';

export const propertyService = {
  autocomplete: async (query) => {
    if (!query || query.trim().length < 2) {
      return [];
    }
    const cleanQuery = query.trim();
    const geoUrl = `${env.NYC_GEOSEARCH_BASE_URL}/autocomplete?text=${encodeURIComponent(cleanQuery)}`;

    try {
      const response = await fetch(geoUrl, {
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.features && Array.isArray(data.features)) {
          return data.features.slice(0, 10).map((f) => {
            const props = f.properties || {};
            const coords = f.geometry?.coordinates || [];
            const bbl = props.pad_bbl || props.bbl || props.addendum?.pad?.bbl || '';
            const bin = props.pad_bin || props.bin || props.addendum?.pad?.bin || '';
            return {
              label: props.label || props.name || cleanQuery,
              address: props.name || props.label || cleanQuery,
              city: props.locality || props.borough || 'New York',
              borough: props.borough || '',
              state: 'NY',
              zip: props.postalcode || '',
              bbl: bbl ? String(bbl) : '',
              bin: bin ? String(bin) : '',
              latitude: coords[1] ? String(coords[1]) : '',
              longitude: coords[0] ? String(coords[0]) : '',
            };
          });
        }
      }
    } catch (err) {
      console.warn('NYC GeoSearch autocomplete error:', err.message);
    }

    // Try PLUTO search fallback
    const plutoResults = await nycOpenDataService.searchPluto(cleanQuery);
    if (plutoResults && plutoResults.length > 0) {
      return plutoResults.slice(0, 8).map((p) => ({
        label: `${p.address}, ${p.city || 'New York'}, NY ${p.zipcode || ''}`,
        address: p.address,
        city: p.city || 'New York',
        borough: p.borough || '',
        state: 'NY',
        zip: p.zipcode || '',
        bbl: String(p.bbl || ''),
        bin: String(p.bin || ''),
        latitude: String(p.latitude || ''),
        longitude: String(p.longitude || ''),
      }));
    }

    return [];
  },

  resolveBin: async (address, borough, bbl) => {
    const searchTerms = [];
    if (address) {
      const boroName = borough || 'New York';
      searchTerms.push(`${address}, ${boroName}, NY`);
      searchTerms.push(address);
    }
    if (bbl) {
      searchTerms.push(String(bbl));
    }

    for (const term of searchTerms) {
      try {
        const geoUrl = `${env.NYC_GEOSEARCH_BASE_URL}/search?text=${encodeURIComponent(term)}`;
        const response = await fetch(geoUrl, { headers: { Accept: 'application/json' } });
        if (response.ok) {
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            for (const f of data.features) {
              const props = f.properties || {};
              const bin = props.addendum?.pad?.bin || props.pad_bin || props.bin;
              if (bin && String(bin).trim() && String(bin).trim() !== '0') {
                return String(bin).trim();
              }
            }
          }
        }
      } catch (err) {
        // continue
      }
    }
    return '';
  },

  resolveProperty: async (input) => {
    let queryText = typeof input === 'string' ? input : input.bbl || input.address || input.text || '';
    let bbl = typeof input === 'object' ? input.bbl : queryText.match(/^\d{10}$/) ? queryText : '';
    let bin = typeof input === 'object' ? input.bin : queryText.match(/^\d{7}$/) ? queryText : '';
    let address = typeof input === 'object' ? input.address : queryText;

    // 1. If BBL is provided, attempt to verify with PLUTO
    if (bbl) {
      const pluto = await nycOpenDataService.getPlutoByBBL(bbl);
      if (pluto) {
        let resolvedBin = String(pluto.bin || bin || '');
        if (!resolvedBin || resolvedBin === '0') {
          resolvedBin = await propertyService.resolveBin(pluto.address, pluto.borough, bbl);
        }
        return {
          address: pluto.address || address || '',
          city: pluto.city || 'New York',
          state: 'NY',
          zip: pluto.zipcode || '',
          borough: pluto.borough || '',
          bbl: String(pluto.bbl || bbl),
          bin: resolvedBin,
          latitude: String(pluto.latitude || ''),
          longitude: String(pluto.longitude || ''),
        };
      }
    }

    // 2. Query GeoSearch search endpoint
    if (queryText) {
      try {
        const geoUrl = `${env.NYC_GEOSEARCH_BASE_URL}/search?text=${encodeURIComponent(queryText)}`;
        const response = await fetch(geoUrl, { headers: { Accept: 'application/json' } });
        if (response.ok) {
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            const f = data.features[0];
            const props = f.properties || {};
            const coords = f.geometry?.coordinates || [];
            const resolvedBbl = props.pad_bbl || props.bbl || props.addendum?.pad?.bbl || bbl;
            const resolvedBin = props.addendum?.pad?.bin || props.pad_bin || props.bin || bin;

            if (resolvedBbl) {
              return {
                address: props.name || props.label || address,
                city: props.locality || props.borough || 'New York',
                state: 'NY',
                zip: props.postalcode || '',
                borough: props.borough || '',
                bbl: String(resolvedBbl),
                bin: String(resolvedBin || ''),
                latitude: coords[1] ? String(coords[1]) : '',
                longitude: coords[0] ? String(coords[0]) : '',
              };
            }
          }
        }
      } catch (err) {
        console.warn('NYC GeoSearch resolution error:', err.message);
      }
    }

    // 3. Query PLUTO search endpoint
    if (queryText) {
      const plutoResults = await nycOpenDataService.searchPluto(queryText);
      if (plutoResults && plutoResults.length > 0) {
        const p = plutoResults[0];
        let resolvedBin = String(p.bin || '');
        if (!resolvedBin || resolvedBin === '0') {
          resolvedBin = await propertyService.resolveBin(p.address, p.borough, p.bbl);
        }
        return {
          address: p.address || address,
          city: p.city || 'New York',
          state: 'NY',
          zip: p.zipcode || '',
          borough: p.borough || '',
          bbl: String(p.bbl),
          bin: resolvedBin,
          latitude: String(p.latitude || ''),
          longitude: String(p.longitude || ''),
        };
      }
    }

    return null;
  },

  searchProperties: async (query) => {
    if (!query || !query.trim()) return [];
    const plutoResults = await nycOpenDataService.searchPluto(query.trim());
    if (plutoResults && plutoResults.length > 0) {
      return plutoResults.map((p) => propertyService.transformPlutoToSummary(p));
    }
    return [];
  },

  getPropertyByBBL: async (inputBbl) => {
    if (!inputBbl) return null;
    const cleanBbl = String(inputBbl).trim().split('.')[0]; // 10-digit BBL (e.g. 4004580098)

    // 1. Fetch PLUTO dataset first
    const pluto = await nycOpenDataService.getPlutoByBBL(cleanBbl);

    let baseInfo = null;
    if (pluto) {
      baseInfo = propertyService.transformPlutoToBaseInfo(pluto);
      if (!baseInfo.bin || baseInfo.bin === '0') {
        const resolvedBin = await propertyService.resolveBin(baseInfo.address, baseInfo.borough, cleanBbl);
        if (resolvedBin) {
          baseInfo.bin = resolvedBin;
        }
      }
    } else {
      // Try resolving via GeoSearch / PAD for address & BIN if PLUTO is empty
      const resolved = await propertyService.resolveProperty({ bbl: cleanBbl });
      if (resolved && resolved.bbl) {
        baseInfo = {
          bbl: resolved.bbl,
          bin: resolved.bin || '',
          address: resolved.address,
          publicRecordAddress: resolved.address,
          city: resolved.city,
          state: 'NY',
          zip: resolved.zip,
          borough: resolved.borough,
          owner: null,
          propertyType: null,
          yearBuilt: null,
          stories: null,
          units: null,
          lotAreaSqFt: 0,
          buildingAreaSqFt: 0,
          commercialAreaSqFt: 0,
          factoryAreaSqFt: 0,
        };
      } else {
        return null;
      }
    }

    // 2. Race for secondary datasets (6s timeout — permits are loaded lazily via /permits endpoint)
    const timeoutFallback = (ms) => new Promise((resolve) => setTimeout(() => resolve({ data: [] }), ms));

    const [assessmentRes, complaintsRes, acrisRes] = await Promise.all([
      nycOpenDataService.getAssessmentRecords(cleanBbl).catch((err) => {
        console.warn('[Assessment] Fetch error:', err.message);
        return { data: [] };
      }),
      Promise.race([nycOpenDataService.getComplaints311(cleanBbl, baseInfo.address), timeoutFallback(6000)]).catch(() => ({ data: [] })),
      Promise.race([nycOpenDataService.getFullAcrisDocuments(cleanBbl), timeoutFallback(6000)]).catch(() => ({ legals: [], master: [], parties: [] })),
    ]);

    const assessmentHistory = assessmentService.formatAssessmentHistory(assessmentRes?.data || []);
    const taxInfo = taxService.formatTaxInfo(pluto, assessmentHistory);
    const permits = []; // Loaded lazily via GET /properties/:bbl/permits
    const complaints311 = violationService.formatComplaints311(complaintsRes?.data || []);
    const contacts = contactService.formatContacts(baseInfo.owner, permits, baseInfo.address, assessmentHistory);
    const documents = documentService.formatDocuments(acrisRes, cleanBbl, baseInfo.address);
    const zoningInfo = zoningService.getZoningDetails(pluto);
    const buildableCalculated = developmentService.calculateBuildable(pluto);

    return {
      identity: {
        address: baseInfo.address,
        bbl: baseInfo.bbl,
        bin: baseInfo.bin,
        city: baseInfo.city,
        state: baseInfo.state,
        zip: baseInfo.zip,
        borough: baseInfo.borough,
      },
      bbl: baseInfo.bbl,
      bin: baseInfo.bin,
      address: baseInfo.address,
      publicRecordAddress: baseInfo.publicRecordAddress || baseInfo.address,
      city: baseInfo.city,
      state: baseInfo.state,
      zip: baseInfo.zip,
      borough: baseInfo.borough,
      owner: baseInfo.owner,
      propertyType: baseInfo.propertyType,
      yearBuilt: baseInfo.yearBuilt ? Number(baseInfo.yearBuilt) : null,
      stories: baseInfo.stories ? Number(baseInfo.stories) : null,
      numBuildings: baseInfo.numBuildings ? Number(baseInfo.numBuildings) : 1,
      units: baseInfo.units ? Number(baseInfo.units) : null,
      commercialUnits: baseInfo.commercialUnits ? Number(baseInfo.commercialUnits) : null,
      lotAreaSqFt: Number(baseInfo.lotAreaSqFt || 0),
      buildingAreaSqFt: Number(baseInfo.buildingAreaSqFt || 0),
      commercialAreaSqFt: Number(baseInfo.commercialAreaSqFt || 0),
      factoryAreaSqFt: Number(baseInfo.factoryAreaSqFt || 0),
      buildingDimensions: baseInfo.buildingDimensions,
      lotDimensions: baseInfo.lotDimensions,
      zoning: zoningInfo.zoning,
      specialDistrict: zoningInfo.specialDistrict,
      zoningMap: zoningInfo.zoningMap,
      far: buildableCalculated.far,
      development: buildableCalculated.development,
      lastSale: documents && documents.length > 0 ? documents[0] : null,
      assessmentHistory,
      taxInfo,
      permits,
      complaints311,
      contacts,
      financials: {
        mortgageSummary: 'No active mortgages verified in public dataset.',
        incomeExpenses: 'RPIE income & expense data not available in public dataset.',
        status: 'not_available',
      },
      documents,
    };
  },

  transformPlutoToSummary: (p) => {
    return {
      bbl: String(p.bbl || ''),
      bin: String(p.bin || ''),
      address: p.address || '',
      city: p.city || 'New York',
      state: 'NY',
      zip: p.zipcode || '',
      borough: p.borough || '',
      owner: p.ownername || null,
      propertyType: p.bldgclass || null,
      lotAreaSqFt: Number(p.lotarea || 0),
      buildingAreaSqFt: Number(p.bldgarea || 0),
      yearBuilt: p.yearbuilt ? Number(p.yearbuilt) : null,
      zoning: p.zonedist1 || null,
      far: {
        commercial: Number(p.commfar || 0),
      },
    };
  },

  transformPlutoToBaseInfo: (p) => {
    const bldgFront = Number(p.bldgfront || 0);
    const bldgDepth = Number(p.bldgdepth || 0);
    const lotFront = Number(p.lotfront || 0);
    const lotDepth = Number(p.lotdepth || 0);

    return {
      bbl: String(p.bbl || ''),
      bin: String(p.bin || ''),
      address: p.address || '',
      publicRecordAddress: p.address || '',
      city: p.city || 'New York',
      state: 'NY',
      zip: p.zipcode || '',
      borough: p.borough || '',
      owner: p.ownername || null,
      propertyType: p.bldgclass || null,
      yearBuilt: p.yearbuilt || null,
      stories: p.numfloors || null,
      numBuildings: p.numbldgs || 1,
      units: p.unitstotal || null,
      commercialUnits: p.unitscomm || null,
      lotAreaSqFt: p.lotarea || 0,
      buildingAreaSqFt: p.bldgarea || 0,
      commercialAreaSqFt: p.comarea || 0,
      factoryAreaSqFt: p.factryarea || 0,
      buildingDimensions: bldgFront > 0 && bldgDepth > 0 ? `${bldgFront} ft x ${bldgDepth} ft` : 'Not available',
      lotDimensions: lotFront > 0 && lotDepth > 0 ? `${lotFront} ft x ${lotDepth} ft` : 'Not available',
    };
  },
};
