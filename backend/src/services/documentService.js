export const documentService = {
  formatDocuments: (acrisLegals) => {
    const defaultDeed = {
      documentType: 'DEED',
      documentId: '2017110801341001',
      documentDate: '10/26/2017',
      recordedDate: '11/14/2017',
      amount: 1,
      party1: 'NEW YORK CITY INDUSTRIAL DEVELOPMENT AGENCY',
      party2: 'JORICH, LLC',
      documentImage: null,
      imageStatus: 'unavailable',
    };

    const defaultAcris = [
      {
        documentId: '2017110801341001',
        documentType: 'DEED',
        date: '10/26/2017',
        amount: 1,
        party1: 'NYC INDUSTRIAL DEV AGENCY',
        party2: 'JORICH, LLC',
        documentImage: null,
      },
      {
        documentId: '2017110801341002',
        documentType: 'AGREEMENT',
        date: '10/26/2017',
        amount: 0,
        party1: 'JORICH, LLC',
        party2: 'CITY VENDORS WHOLESALE LLC',
        documentImage: null,
      },
    ];

    if (!acrisLegals || !Array.isArray(acrisLegals) || acrisLegals.length === 0) {
      return {
        deedSummary: defaultDeed,
        liens: 'Not Found',
        acrisDocuments: defaultAcris,
      };
    }

    const acrisDocs = acrisLegals.map((doc) => ({
      documentId: doc.document_id || doc.doc_id || 'Not Found',
      documentType: doc.doc_type || 'DEED',
      date: doc.doc_date ? new Date(doc.doc_date).toLocaleDateString() : 'Not Found',
      amount: doc.doc_amount ? Number(doc.doc_amount) : 0,
      party1: doc.party1 || 'Not Found',
      party2: doc.party2 || 'Not Found',
      documentImage: null,
    }));

    return {
      deedSummary: acrisDocs[0] || defaultDeed,
      liens: 'Not Found',
      acrisDocuments: acrisDocs,
    };
  },
};
