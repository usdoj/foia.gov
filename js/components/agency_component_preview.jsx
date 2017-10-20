import React from 'react';
import PropTypes from 'prop-types';

import PrettyUrl from './pretty_url';
import {AgencyComponent} from '../models';


function AgencyComponentPreview({ agencyComponent }) {
  debugger;
  const description = AgencyComponent.agencyMission(agencyComponent);
  return (
    <div>
      <h2>{agencyComponent.agency.name}</h2>
      <h3>{agencyComponent.title}</h3>
      <p>{description}</p>
      <PrettyUrl href={agencyComponent.website.uri} />
    </div>
  );
}

AgencyComponentPreview.propTypes = {
  agencyComponent: PropTypes.object.isRequired,
};


export default AgencyComponentPreview;
