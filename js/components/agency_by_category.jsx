import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * A list of agencies by category.
 */
class AgencyByCategory extends Component {

  /**
   * Render this component.
   */
  render() {
    const loading = !this.props.agencyFinderDataComplete;

    this.props.agencies.forEach((agency) => {
      if (agency.category) {
        console.log(agency);
      }
    });

    return (
      <ul className="usa-accordion">
        <li>
          <button className="usa-accordion-button" aria-controls="a1">
            {loading ? `Loading…` : 'Government agencies by topic'}
          </button>
          <div id="a1" className="usa-accordion-content">
            <ul className="usa-accordion">
              <li>
                <button className="usa-accordion-button" aria-controls="a2">
                  Benefits
                </button>
                <div id="a2" className="usa-accordion-content">
                  <ul style={{columns:2, columnGap:"40px"}}>
                    <li><a href="foo">Agency Component ABC</a></li>
                    <li><a href="bar">Agency Component DEF</a></li>
                    <li><a href="foo">Agency Component GHI</a></li>
                    <li><a href="bar">Agency Component JKL</a></li>
                  </ul>
                </div>
              </li>
              <li>
                <button className="usa-accordion-button" aria-controls="a3">
                  Children and Education
                </button>
                <div id="a3" className="usa-accordion-content">
                  <ul>
                    <li><a href="foo">Agency Component ABC</a></li>
                    <li><a href="bar">Agency Component XYZ</a></li>
                  </ul>
                </div>
              </li>
              <li>
                <button className="usa-accordion-button" aria-controls="a4">
                  Consumer Products and Safety
                </button>
                <div id="a4" className="usa-accordion-content">
                  <ul>
                    <li><a href="foo">Agency Component ABC</a></li>
                    <li><a href="bar">Agency Component XYZ</a></li>
                  </ul>
                </div>
              </li>
              <li>
                <button className="usa-accordion-button" aria-controls="a5">
                  Fraud, Law Enforcement, and Crime
                </button>
                <div id="a5" className="usa-accordion-content">
                  <ul>
                    <li><a href="foo">Agency Component ABC</a></li>
                    <li><a href="bar">Agency Component XYZ</a></li>
                  </ul>
                </div>
              </li>
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
