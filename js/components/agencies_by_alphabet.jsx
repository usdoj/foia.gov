import { Map } from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * A list of agencies by alphabet.
 */
function AgenciesByAlphabet({ agencies, agencyFinderDataComplete, onAgencySelect }) {
  const loading = !agencyFinderDataComplete;
  const agenciesByAlphabet = {};
  agencies.forEach((agency) => {
    if (agency && agency.name) {
      if (!agenciesByAlphabet[agency.name.charAt(0)]) {
        agenciesByAlphabet[agency.name.charAt(0)] = [];
      }
      agenciesByAlphabet[agency.name.charAt(0)].push(agency);
    }
  });

  return (
    <div>
      <h2 className="agency-component-search_hed">Index of government agencies</h2>
      <ul className="usa-accordion agencies-by-alphabet">
        <li>
          <button className="usa-accordion-button" aria-controls="a1">
            {loading ? 'Loading…' : 'Government agencies A to Z'}
          </button>
          <div id="a1" className="usa-accordion-content">
            <ul className="usa-accordion agency-alphabet">
              {Object.entries(agenciesByAlphabet)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([azLetter, azAgencies]) => (
                  <li key={azLetter}>
                    <button
                      className="usa-accordion-button"
                      aria-controls={azLetter}
                      aria-expanded="false"
                    >
                      {azLetter}
                    </button>
                    <div
                      id={azLetter}
                      className="usa-accordion-content"
                      aria-hidden="true"
                    >
                      <ul>
                        {azAgencies.sort((a, b) => a.name.localeCompare(b.name)).map(agency => (
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
    </div>
  );
}

AgenciesByAlphabet.propTypes = {
  agencies: PropTypes.instanceOf(Map).isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  onAgencySelect: PropTypes.func.isRequired,
};

AgenciesByAlphabet.defaultProps = {
  agencies: new Map(),
  agencyFinderDataComplete: false,
};

export default AgenciesByAlphabet;
