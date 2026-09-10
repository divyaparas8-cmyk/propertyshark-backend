import mockProperties from '../data/mockProperties.json';

/**
 * Service to handle property searches and fetching single property details.
 * Architecture prepared for Socrata NYC Open Data PLUTO API (dataset 64uk-42ks).
 */
export const propertyService = {
  searchProperties: async (query) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 250));

    if (!query || !query.trim()) {
      return mockProperties;
    }

    const q = query.trim().toLowerCase();

    return mockProperties.filter((p) => {
      return (
        p.bbl.toLowerCase().includes(q) ||
        p.bin.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.publicRecordAddress.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.zip.toLowerCase().includes(q) ||
        p.borough.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q)
      );
    });
  },

  getPropertyByBBL: async (bbl) => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const property = mockProperties.find((p) => p.bbl === bbl);
    if (!property) {
      // Default fallback to 4004580098 if BBL matched or unknown
      return mockProperties.find((p) => p.bbl === '4004580098') || mockProperties[0];
    }
    return property;
  },
};
