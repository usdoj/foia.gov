import React from 'react';
import PropTypes from 'prop-types';

import AgencyComponentProcessingTime from './agency_component_processing_time';
import FoiaPersonnel from './foia_personnel';
import FoiaSubmissionAddress from './foia_submission_address';
import PrettyUrl from './pretty_url';
import { AgencyComponent } from '../models';


function AgencyComponentPreview({ onAgencySelect, agencyComponent, isCentralized }) {
  const description = AgencyComponent.agencyMission(agencyComponent);
  const requestUrl = `/request/agency-component/${agencyComponent.id}/`;
  const onSelect = () => onAgencySelect(agencyComponent.agency);

  return (
    <div className="agency-preview usa-grid-full">
      <div className="usa-width-one-whole">
        {
          !isCentralized && (
            <h2>
              <span // eslint-disable-line jsx-a11y/no-static-element-interactions
                className="agency-preview_agency-back"
                onClick={onSelect}
                onKeyPress={onSelect}
                role="button"
                tabIndex="0"
              >
                {agencyComponent.agency.name}
              </span>
            </h2>
          )
        }
        <h3>{isCentralized ? agencyComponent.agency.name : agencyComponent.title }</h3>
      </div>
      <div className="usa-width-one-half">
        { description &&
          <div>
            <h4>Agency mission</h4>
            <p>{description}</p>
          </div>
        }

        <h4>Contact</h4>
        <div className="agency-preview_contact-section">
          { agencyComponent.website && <PrettyUrl href={agencyComponent.website.uri} /> }
        </div>
        <div className="agency-preview_contact-section">
          <FoiaPersonnel foiaPersonnel={agencyComponent.public_liaisons[0]} />
        </div>
        <div className="agency-preview_contact-section">
          <FoiaSubmissionAddress submissionAddress={agencyComponent.submission_address} />
        </div>

      </div>
      <div className="usa-width-one-half">
        { agencyComponent.request_data_year &&
          <div>
            <h4>Average processing time</h4>
            <AgencyComponentProcessingTime
              agencyComponent={agencyComponent}
            />
          </div>
        }

        <h4>
          The records or information you&rsquo;re looking for may already be public.
        </h4>
        { agencyComponent.website.uri &&
          <p>
            Visit the agency’s <a href={agencyComponent.website.uri}>website</a> to learn more.
          </p>
        }
        { agencyComponent.reading_rooms && agencyComponent.reading_rooms.length &&
          <p>To see what’s been made available, you can visit an agency’s
            <a href={agencyComponent.reading_rooms[0].uri}> FOIA reading room</a>.</p>
        }
        <a
          className="usa-button usa-button-primary start-request"
          href={requestUrl}
        >
          Start FOIA request
        </a>
      </div>
    </div>
  );
}

AgencyComponentPreview.propTypes = {
  onAgencySelect: PropTypes.func.isRequired,
  agencyComponent: PropTypes.object.isRequired,
  isCentralized: PropTypes.bool.isRequired,
};


export default AgencyComponentPreview;
