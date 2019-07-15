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
    if (!agenciesByAlphabet[agency.name.charAt(0)]) {
      agenciesByAlphabet[agency.name.charAt(0)] = [];
    }
    agenciesByAlphabet[agency.name.charAt(0)].push(agency);
  });

  return (
    <div>
      <h3 className="agency-component-search_hed">Index of government agencies</h3>
      <p>See below to pick from a full list of government agencies.</p>
      <ul className="usa-accordion agencies-by-alphabet">
        <li>
          <button className="usa-accordion-button" aria-controls="a1">
            {loading ? 'Loading…' : 'Government agencies A to Z'}
          </button>
          <div id="a1" className="usa-accordion-content">
            <ul className="usa-accordion agency-alphabet">
              {Object.entries(agenciesByAlphabet)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([alphabetLetter, alphabetAgencies]) => (
                  <li key={alphabetLetter}>
                    <button
                      className="usa-accordion-button"
                      aria-controls={alphabetLetter}
                      aria-expanded="false"
                    >
                      {alphabetLetter}
                    </button>
                    <div
                      id={alphabetLetter}
                      className="usa-accordion-content"
                      aria-hidden="true"
                    >
                      <ul>
                        {alphabetAgencies.sort((a, b) => a.name.localeCompare(b.name)).map(agency => (
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
