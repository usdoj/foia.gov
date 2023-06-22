import React, { useEffect } from 'react';
import AgencySearch from '../components/agency_search';
import useAgencyStore from '../stores/agency_store';

function AgencySearchPage() {
  const { init } = useAgencyStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <AgencySearch />
  );
}

export default AgencySearchPage;
