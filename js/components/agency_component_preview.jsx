import React from 'react';
import PropTypes from 'prop-types';

import PrettyUrl from './pretty_url';


function AgencyComponentPreview({ agencyComponent }) {
  return (
    <div>
      <h2>{agencyComponent.agency.name}</h2>
      <h3>{agencyComponent.title}</h3>
      <p>{agencyComponent.description}</p>
      <PrettyUrl href={agencyComponent.website.uri} />
    </div>
  );
}

AgencyComponentPreview.propTypes = {
  agencyComponent: PropTypes.object.isRequired,
};


export default AgencyComponentPreview;
