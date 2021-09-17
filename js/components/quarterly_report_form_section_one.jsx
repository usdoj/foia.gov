import { List, Map } from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FoiaTooltip from './foia_tooltip';
import ReportAgencyComponentFilter from './report_agency_component_filter';
import AddLink from './add_link';
import { types } from '../actions/quarterly_report';

/* eslint-disable-next-line react/prefer-stateless-function */
class QuarterlyReportFormSectionOne extends Component {
  render() {
    const {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
      selectedAgencies,
      agencyComponentDisplayError,
      allAgenciesSelected,
    } = this.props;

    const fieldsDisplayed = this.props.selectedAgencies.length;

    return (
      <div>
        <div className="form-group">
          <fieldset>
            <legend className="foia-header-blue-line--h2">
              1. Select Agencies or Components
              <FoiaTooltip text={'<p>Select an agency or agencies to view their data. You may also select specific components of an agency (such as the FBI, a component of the Department of Justice), or you may view data for all government agencies.</p>'} />
            </legend>
            {selectedAgencies.map((selected, index) => (
              <ReportAgencyComponentFilter
                key={index} // eslint-disable-line react/no-array-index-key
                agencies={agencies}
                agencyComponents={agencyComponents}
                agencyFinderDataComplete={agencyFinderDataComplete}
                agencyFinderDataProgress={agencyFinderDataProgress}
                selectedAgency={selected}
                agencyComponentDisplayError={agencyComponentDisplayError}
                fieldsDisplayed={fieldsDisplayed}
                isDisabled={this.props.allAgenciesSelected}
              />))}
            <div className="form-group_footer-links">
              <div className="form-group_footer-links_left">
                {!allAgenciesSelected && <AddLink
                  eventType={types.SELECTED_AGENCIES_APPEND_BLANK}
                  text="Add Another Agency or Component"
                  classes={['touch-safe__wrapper']}
                />}
              </div>
              <div className="form-group_footer-links_right">
                <AddLink
                  eventType={types.SELECTED_AGENCIES_TOGGLE_SELECT_ALL}
                  text={!this.props.allAgenciesSelected ? 'Select All Agencies' : 'Unselect All Agencies'}
                  icon={false}
                  classes={['touch-safe__wrapper']}
                />
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

QuarterlyReportFormSectionOne.propTypes = {
  agencies: PropTypes.instanceOf(Map),
  agencyComponents: PropTypes.instanceOf(List),
  selectedAgencies: PropTypes.array,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number,
  agencyComponentDisplayError: PropTypes.bool.isRequired,
  allAgenciesSelected: PropTypes.bool,
};

QuarterlyReportFormSectionOne.defaultProps = {
  agencies: new Map(),
  agencyComponents: new List(),
  agencyFinderDataProgress: 0,
  allAgenciesSelected: false,
  selectedAgencies: [{ index: 0 }],
};

export default QuarterlyReportFormSectionOne;
