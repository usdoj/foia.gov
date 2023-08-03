import React from 'react';
import PropTypes from 'prop-types';

import AgencyComponentProcessingTime from './agency_component_processing_time';
import ContactInformation from './contact_information';
import NonInteroperableInfo from './non_interoperable_info';
import { AgencyComponent } from '../models';
import domify from '../util/request_form/domify';

function AgencyComponentPreview({
  onAgencySelect, agencyComponent, isCentralized, setShowTips, setDestinationHref,
}) {
  const description = AgencyComponent.agencyMission(agencyComponent);
  const requestUrl = `/request/agency-component/${agencyComponent.id}/`;
  const recordsHeld = (agencyComponent.field_commonly_requested_records || '')
    .split(/\r?\n/)
    .map((el) => el.trim())
    .filter((el) => el !== '');
  const onSelect = () => onAgencySelect(agencyComponent.agency);

  return (
    <div className="agency-preview usa-grid-full use-dark-icons">
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
        { !agencyComponent.request_form
          && <NonInteroperableInfo agencyComponent={agencyComponent} />}
      </div>
      <div className="usa-width-one-half">
        { description
          && (
          <div>
            <h4>Agency mission</h4>
            <p>{domify(description)}</p>
          </div>
          )}

        <h4>Contact</h4>
        <ContactInformation agencyComponent={agencyComponent} />
      </div>
      <div className="usa-width-one-half start-request-container">
        {recordsHeld.length > 0 && (
          <div>
            <h4>Records that we hold</h4>
            <ul>
              {recordsHeld.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        { agencyComponent.request_data_year
          && <AgencyComponentProcessingTime agencyComponent={agencyComponent} />}
        <div className="agency-info_reading-rooms">
          <h4>
            The records or information you&rsquo;re looking for may already be public.
          </h4>
          { agencyComponent.website
            && (
            <p>
              Visit the agency&rsquo;s
              {' '}
              <a href={agencyComponent.website.uri}>website</a>
              {' '}
              to learn more.
            </p>
            )}
          { agencyComponent.reading_rooms && agencyComponent.reading_rooms.length > 0
            && (
            <p>
              To see what&rsquo;s been made available, you can visit an agency&rsquo;s
              {' '}
              <a href={agencyComponent.reading_rooms[0].uri}>FOIA library</a>
              .
            </p>
            )}
        </div>
        { agencyComponent.request_form
          && (
            <button
              className="usa-button usa-button-big usa-button-primary-alt start-request"
              onClick={() => {
                setShowTips(true);
                setDestinationHref(requestUrl);
              }}
            >
              Continue the FOIA request process
            </button>
          )}
      </div>
    </div>
  );
}

AgencyComponentPreview.propTypes = {
  onAgencySelect: PropTypes.func.isRequired,
  agencyComponent: PropTypes.object.isRequired,
  isCentralized: PropTypes.bool.isRequired,
  setShowTips: PropTypes.func.isRequired,
  setDestinationHref: PropTypes.func.isRequired,
};

export default AgencyComponentPreview;
