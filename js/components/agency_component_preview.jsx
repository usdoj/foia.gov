import React from 'react';
import PropTypes from 'prop-types';

import AgencyComponentProcessingTime from './agency_component_processing_time';
import FoiaPersonnel from './foia_personnel';
import FoiaSubmissionAddress from './foia_submission_address';
import PrettyUrl from './pretty_url';
import { AgencyComponent } from '../models';


function AgencyComponentPreview({ agencyComponent }) {
  const description = AgencyComponent.agencyMission(agencyComponent);
  const requestUrl = `/request/agency-component/${agencyComponent.id}/`;

  debugger;
  return (
    <div className="agency-preview usa-grid-full">
      <div className="usa-width-one-whole">
        <h2>{agencyComponent.agency.name}</h2>
        <h3>{agencyComponent.title}</h3>
      </div>
      <div className="usa-width-one-half">
        { description &&
          <div>
            <h4>Agency mission</h4>
            <p>{description}</p>
          </div>
        }

        { agencyComponent.request_time_stats &&
          <div>
            <h4>Median processing time (estimates)</h4>
            <AgencyComponentProcessingTime
              requestTimeStats={agencyComponent.request_time_stats}
            />
          </div>
        }

        <h4>
          The records or information you&rsquo;re looking for may already be public.
        </h4>
        <p>You can find out by reaching out to the agency
        { agencyComponent.website.uri &&
          <span>or by visiting their <a href={agencyComponent.website.uri}>website</a></span>
        }
        { agencyComponent.reading_rooms[0].uri &&
          <span>or by visiting their FOIA <a href={agencyComponent.reading_rooms[0].uri}>reading room</a></span>
        }
        .</p>
      </div>
      <div className="usa-width-one-half">
        <h4>Contact</h4>
        <PrettyUrl href={agencyComponent.website.uri} />
        <FoiaPersonnel foiaPersonnel={agencyComponent.public_liaisons[0]} />
        <FoiaSubmissionAddress submissionAddress={agencyComponent.submission_address} />
        <a className="usa-button usa-button-primary" href={ requestUrl }>Start FOIA request</a>
      </div>
    </div>
  );
}

AgencyComponentPreview.propTypes = {
  agencyComponent: PropTypes.object.isRequired,
};


export default AgencyComponentPreview;
