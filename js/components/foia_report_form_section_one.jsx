import { List, Map } from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FoiaTooltip from './foia_tooltip';
import ReportAgencyComponentFilter from './report_agency_component_filter';
import AddLink from './add_link';
import { types } from '../actions';

/**
 * README!: The assumption of this file is that it is a 'good enough'
 * holding place for the section two markup at the moment.  This should all be updated
 * as we break the markup into better components.
 */
class FoiaReportFormSectionOne extends Component {
  render() {
    const {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
      selectedAgencies,
    } = this.props;

    return (
      <div>
        <div className="form-group">
          <fieldset>
            <legend className="foia-header-blue-line--h2">
              1. Select Agencies or Components
              <FoiaTooltip text="Select the type of FOIA data you would like to view. The data comes from agencies' Annual FOIA Reports. To learn more about the data, view the terms in the Glossary." />
            </legend>
            {selectedAgencies.map((selected, index) => (
              <ReportAgencyComponentFilter
                key={index}
                agencies={agencies}
                agencyComponents={agencyComponents}
                agencyFinderDataComplete={agencyFinderDataComplete}
                agencyFinderDataProgress={agencyFinderDataProgress}
                selectedAgency={selected}
              />))}
            <AddLink
              eventType={types.SELECTED_AGENCIES_APPEND_BLANK}
              text="Add Another Agency or Component"
            />
          </fieldset>
        </div>
        <div className="clear">&nbsp;</div>
        <div className="form-group usa-width-one-half visually-hidden">
          {/* Begin Modal Inner HTML */}
          <div className="form-group">
            <div className="usa-grid">
              <h3 className="sans">Select Agencies or Components</h3>
              <fieldset className="usa-fieldset-inputs">
                <ul className="usa-unstyled-list usa-grid checkbox-list">
                  <li className="usa-width-one-third">
                    <input id="Agency-1" type="checkbox" name="Agency-1" value="Agency-1" />
                    <label htmlFor="Agency-1">Agency 1</label>
                  </li>
                  <li className="usa-width-one-third">
                    <input id="Agency-2" type="checkbox" name="Agency-2" value="Agency-2" />
                    <label htmlFor="Agency-2">Agency 2</label>
                  </li>
                  <li className="usa-width-one-third">
                    <input id="Agency-3" type="checkbox" name="Agency-3" value="Agency-3" />
                    <label htmlFor="Agency-3">Agency 3</label>
                  </li>
                </ul>
                <div className="form-group_footer">
                  <ul className="inline-list">
                    <li><a href="#">Select All</a></li>
                    <li><a href="#">Select None</a></li>
                  </ul>
                  <button className="usa-button usa-button-primary-alt">Submit</button>
                  <button className="usa-button usa-button-outline">Cancel</button>
                </div>
              </fieldset>
            </div>
          </div>
          {/* End Modal Inner HTML */}
        </div>
      </div>
    );
  }
}

FoiaReportFormSectionOne.propTypes = {
  agencies: PropTypes.instanceOf(Map),
  agencyComponents: PropTypes.instanceOf(List),
  selectedAgencies: PropTypes.array,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number,
};

FoiaReportFormSectionOne.defaultProps = {
  agencies: new Map(),
  agencyComponents: new List(),
  agencyFinderDataProgress: 0,
  selectedAgencies: [{ index: 0 }],
};

export default FoiaReportFormSectionOne;
