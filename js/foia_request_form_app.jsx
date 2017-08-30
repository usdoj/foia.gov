import React from 'react';

import AgencyComponentSelector from './agency_component_selector';
import Header from './header';

function FOIARequestFormApp() {
  // TODO fetch list of agencies and agency components from the server
  const agencies = {
    gsa: 'General Services Administration (GSA)',
    oge: 'Office of Government Ethics (OGE)',
  };

  return (
    <div>
      <Header />
      <AgencyComponentSelector agencies={agencies} />
    </div>
  );
}

export default FOIARequestFormApp;
