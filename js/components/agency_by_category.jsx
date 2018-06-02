import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AgencyCategoryAccordion from 'components/agency_category_accordion';

/**
 * A list of agencies by category.
 */
class AgencyByCategory extends Component {

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

    Object.entries(agenciesByCategory).map(foo => console.log(foo));

    return (
      <ul className="usa-accordion">
        <li>
          <button className="usa-accordion-button" aria-controls="a1">
            {loading ? `Loading…` : 'Government agencies by topic'}
          </button>
          <div id="a1" className="usa-accordion-content">
            <ul className="usa-accordion">
              {Object.entries(agenciesByCategory).map(([name, agencies]) =>
                <li>
                  <AgencyCategoryAccordion
                    name={name}
                    agencies={agencies}
                  />
                </li>
              )}
            </ul>
          </div>
        </li>
      </ul>
    );
  }
}

AgencyByCategory.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  agencies: PropTypes.instanceOf(Map),
  agencyFinderDataComplete: PropTypes.bool.isRequired,
};

AgencyByCategory.defaultProps = {
  agencies: new Map(),
};

export default AgencyByCategory;
