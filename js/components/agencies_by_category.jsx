import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * A list of agencies by category.
 */
class AgenciesByCategory extends Component {

  /**
   * Render this component.
   */
  render() {
    const loading = !this.props.agencyFinderDataComplete;
    const agenciesByCategory = {};
    this.props.agencies.forEach((agency) => {
      if (agency.category && agency.category.name) {
        if (!agenciesByCategory[agency.category.name]) {
          agenciesByCategory[agency.category.name] = [];
        }
        agenciesByCategory[agency.category.name].push(agency);
      }
    });

    const idFromName = (name) => {
      return name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }

    return (
      <ul className="usa-accordion agencies-by-category">
        <li>
          <button className="usa-accordion-button" aria-controls="a1">
            {loading ? `Loading…` : 'Government agencies by topic'}
          </button>
          <div id="a1" className="usa-accordion-content">
            <ul className="usa-accordion agency-category">
              {Object.entries(agenciesByCategory).map(([name, agencies]) =>
              <li key={name}>
                <button className="usa-accordion-button" aria-controls={idFromName(name)} aria-expanded="false">
                  {name}
                </button>
                <div id={idFromName(name)} className="usa-accordion-content" aria-hidden="true">
                  <ul>
                    {agencies.sort((a, b) => a.name.localeCompare(b.name)).map(agency =>
                    <li
                      key={agency.name}
                      onClick={() => this.props.onAgencySelect(agency)}
                      onKeyPress={() => this.props.onAgencySelect(agency)}
                    >
                      <span role="button" tabIndex="0">{agency.name}</span>
                    </li>
                    )}
                  </ul>
                </div>
              </li>
              )}
            </ul>
          </div>
        </li>
      </ul>
    );
  }
}

AgenciesByCategory.propTypes = {
  agencies: PropTypes.instanceOf(Map).isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  onAgencySelect: PropTypes.func.isRequired,
};

export default AgenciesByCategory;
