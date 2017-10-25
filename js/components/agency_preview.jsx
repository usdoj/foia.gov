/*
 * AgencyPreview
 *
 * Displays information for a decentralized agency.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { Agency } from '../models';


function AgencyPreview({ agency, agencyComponentsForAgency }) {
  const description = agency.mission();
  return (
    <div className="agency-preview usa-grid-full">
      <div className="usa-width-one-whole">
        <h2>{agency.name}</h2>
      </div>
      <div className="usa-width-one-half">
        <ul className="agency-preview_components">
          {
            agencyComponentsForAgency.toArray()
              .sort((a, b) => a.title.localeCompare(b.title))
              .map(agencyComponent => (
                <li key={agencyComponent.id}>
                  <a href={agencyComponent.requestUrl()}>{agencyComponent.title}</a>
                </li>
              ))
          }
        </ul>
      </div>
      <div className="usa-width-one-half">
        { description &&
          <div>
            <h4>Agency mission</h4>
            <p>{description}</p>
          </div>
        }
      </div>
    </div>
  );
}

AgencyPreview.propTypes = {
  agency: PropTypes.instanceOf(Agency).isRequired,
  agencyComponentsForAgency: PropTypes.instanceOf(List).isRequired,
};


export default AgencyPreview;
