/*
 * AgencyPreview
 *
 * Displays information for a decentralized agency.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { Agency } from '../models';
import domify from '../util/request_form/domify';

function AgencyPreview({ agency, agencyComponentsForAgency, onAgencySelect }) {
  const description = agency.mission();
  return (
    <div className="agency-preview usa-grid-full use-dark-icons">
      <div className="usa-width-one-whole">
        <h3>{agency.name}</h3>
      </div>
      <div className="usa-width-one-half">
        <p className="agency-preview_list-hed">
          Make your FOIA request directly to the most relevant component:
        </p>
        <ul className="agency-preview_components">
          {
            agencyComponentsForAgency.toArray()
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((agencyComponent) => {
                const onSelect = () => onAgencySelect(agencyComponent);
                return (
                  <li key={agencyComponent.id}>
                    {
                      // Not sure why this is still triggering the error
                      // https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/245
                    }
                    <span // eslint-disable-line jsx-a11y/no-static-element-interactions
                      onClick={onSelect}
                      onKeyPress={onSelect}
                      role="button"
                      tabIndex="0"
                      className="agency-preview_component"
                    >
                      {agencyComponent.title}
                    </span>
                  </li>
                );
              })
          }
        </ul>
      </div>
      <div className="usa-width-one-half">
        { description
          && (
          <div>
            <h4>Agency mission</h4>
            <p>{domify(description)}</p>
          </div>
          )}
      </div>
    </div>
  );
}

AgencyPreview.propTypes = {
  agency: PropTypes.instanceOf(Agency).isRequired,
  agencyComponentsForAgency: PropTypes.instanceOf(List).isRequired,
  onAgencySelect: PropTypes.func.isRequired,
};

export default AgencyPreview;
