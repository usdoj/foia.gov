import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import AgencyCategoryAccordion from 'components/agency_category_accordion';

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

    function idFromName(name) {
      return name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }

    return (
      <ul className="usa-accordion">
        <li>
          <button className="usa-accordion-button" aria-controls="a1">
            {loading ? `Loading…` : 'Government agencies by topic'}
          </button>
          <div id="a1" className="usa-accordion-content">
            <ul className="usa-accordion">
              {Object.entries(agenciesByCategory).map(([name, agencies]) =>
              <li key={name}>
                <button className="usa-accordion-button" aria-controls={idFromName(name)} aria-expanded="false">
                  {name}
                </button>
                <div id={idFromName(name)} className="usa-accordion-content">
                  <ul>
                    {agencies.map(agency =>
                    <li key={agency.name}>
                      {agency.name}
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
  /* eslint-disable react/no-unused-prop-types */
  agencies: PropTypes.instanceOf(Map),
  agencyFinderDataComplete: PropTypes.bool.isRequired,
};

AgenciesByCategory.defaultProps = {
  agencies: new Map(),
};

export default AgenciesByCategory;
