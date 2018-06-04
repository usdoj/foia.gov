import { Map } from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * A list of agencies by category.
 */
function AgenciesByCategory({ agencies, agencyFinderDataComplete, onAgencySelect }) {
  const loading = !agencyFinderDataComplete;
  const agenciesByCategory = {};
  agencies.forEach((agency) => {
    if (agency.category && agency.category.name) {
      if (!agenciesByCategory[agency.category.name]) {
        agenciesByCategory[agency.category.name] = [];
      }
      agenciesByCategory[agency.category.name].push(agency);
    }
  });

  const idFromName = name => name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  return (
    <ul className="usa-accordion agencies-by-category">
      <li>
        <button className="usa-accordion-button" aria-controls="a1">
          {loading ? 'Loading…' : 'Find government agencies by category'}
        </button>
        <div id="a1" className="usa-accordion-content">
          <ul className="usa-accordion agency-category">
            {Object.entries(agenciesByCategory).map(([categoryName, categoryAgencies]) => (
              <li key={categoryName}>
                <button
                  className="usa-accordion-button"
                  aria-controls={idFromName(categoryName)}
                  aria-expanded="false"
                >
                  {categoryName}
                </button>
                <div
                  id={idFromName(categoryName)}
                  className="usa-accordion-content"
                  aria-hidden="true"
                >
                  <ul>
                    {categoryAgencies.sort((a, b) => a.name.localeCompare(b.name)).map(agency => (
                      <li
                        key={agency.name}
                      >
                        <span
                          role="button"
                          tabIndex="0"
                          onClick={() => onAgencySelect(agency)}
                          onKeyPress={() => onAgencySelect(agency)}
                        >
                          {agency.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </ul>
  );
}

AgenciesByCategory.propTypes = {
  agencies: PropTypes.instanceOf(Map).isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  onAgencySelect: PropTypes.func.isRequired,
};

AgenciesByCategory.defaultProps = {
  agencies: new Map(),
  agencyFinderDataComplete: false,
};

export default AgenciesByCategory;
