export const contactService = {
  formatContacts: (ownerName, permitList = []) => {
    const defaultPermitContacts = [
      {
        name: 'Mohammad Shahid',
        company: 'City Vendors Wholesale LLC',
        address: '42-12 13 Street',
        phone: '(917) 497-2200',
      },
      {
        name: 'Jose Vasquez',
        company: 'J5 Empire Corp',
        address: 'Not Found',
        phone: '(718) 785-0091',
      },
      {
        name: 'Aido Escurra',
        company: 'Infiniti Ecl Plumbing Corp',
        address: 'Not Found',
        phone: '(929) 600-5504',
      },
    ];

    return {
      registeredOwner: {
        name: ownerName || 'JORICH, LLC',
        source: 'Assessment Roll',
      },
      permitContacts: defaultPermitContacts,
    };
  },
};
