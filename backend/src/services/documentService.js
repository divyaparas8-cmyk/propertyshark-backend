export const documentService = {
  formatDocuments: (acrisLegals) => {
    if (!acrisLegals || !Array.isArray(acrisLegals) || acrisLegals.length === 0) {
      return [];
    }

    return acrisLegals.map((doc) => ({
      docId: doc.document_id || doc.doc_id || '',
      docType: doc.doc_type || doc.property_type || 'ACRIS Filing',
      date: doc.good_through_date
        ? new Date(doc.good_through_date).toLocaleDateString()
        : doc.doc_date
        ? new Date(doc.doc_date).toLocaleDateString()
        : '',
      price: doc.doc_amount ? Number(doc.doc_amount) : null,
      streetNumber: doc.street_number || '',
      streetName: doc.street_name || '',
      party1: doc.party1 || null,
      party2: doc.party2 || null,
    }));
  },
};

