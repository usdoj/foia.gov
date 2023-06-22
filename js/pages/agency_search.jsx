import React from 'react';
import AgencySearch from '../components/agency_search';

const agencies = [
  {
    title: 'Placeholder Title',
    agency: {
      name: 'Placeholder Agency Name',
    },
  },
  {
    title: 'Placeholder Title',
    agency: {
      name: 'Placeholder Agency Name',
    },
  },
  {
    title: 'Placeholder Title',
    agency: {
      name: 'Placeholder Agency Name',
    },
  },
  {
    title: 'Placeholder Title',
    agency: {
      name: 'Placeholder Agency Name',
    },
  },
  {
    title: 'Placeholder Title',
    agency: {
      name: 'Placeholder Agency Name',
    },
  },
  {
    title: 'Placeholder Title',
    agency: {
      name: 'Placeholder Agency Name',
    },
  },
  {
    title: 'Placeholder Title',
    agency: {
      name: 'Placeholder Agency Name',
    },
  },
  {
    title: 'Placeholder Title',
    agency: {
      name: 'Placeholder Agency Name',
    },
  },
];

function AgencySearchPage() {
  return (
    <AgencySearch agencies={agencies} />
  );
}

export default AgencySearchPage;
