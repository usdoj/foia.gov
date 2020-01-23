import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import ReportAgencyComponentTypeahead from './report_agency_component_typeahead';
import agencyComponentStore from '../stores/agency_component';
import FoiaModal from './foia_modal';


class ReportAgencyComponentFilter extends Component {
  buildModalContent() {
    const checkboxes = agencyComponentStore
      .getAgencyComponentsForAgency(this.props.selectedAgency.id)
      .map((component) => {
        const inputId = uniqueId(`${component.abbreviation}_`);
        return (
          <li className="usa-width-one-third" key={component.id}>
            <input
              id={inputId}
              type="checkbox"
              name={`${this.props.selectedAgency.id}-component`}
              value={component.id}
              checked
            />
            <label htmlFor={inputId}>{component.abbreviation}</label>
          </li>
        );
      });
    return (
      <div className="form-group">
        <div className="usa-grid">
          <h3 className="sans usa-reset-width">Select Agencies or Components</h3>
          <fieldset className="usa-fieldset-inputs">
            <ul className="usa-unstyled-list usa-grid checkbox-list checkbox-list--in-modal">
              {checkboxes}
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
    );
  }

  render() {
    const {
      agencies,
      agencyComponents,
      agencyFinderDataProgress,
      agencyFinderDataComplete,
      selectedAgency,
    } = this.props;

    const agencyIsSelected = (this.props.selectedAgency.id !== 0 && this.props.selectedAgency.type === 'agency') || false;
    const isCentralizedAgency = this.props.selectedAgency.component_count <= 1 || false;

    return (
      <div className="usa-search usa-search-big">
        <ReportAgencyComponentTypeahead
          agencies={agencies}
          agencyComponents={agencyComponents}
          agencyFinderDataProgress={agencyFinderDataProgress}
          agencyFinderDataComplete={agencyFinderDataComplete}
          selectedAgency={selectedAgency}
        />
        {agencyIsSelected && !isCentralizedAgency &&
          <FoiaModal
            modalContent={this.buildModalContent()}
            ariaLabel="Filter agency components"
            triggerText="Select Agency Components"
          />
        }
      </div>
    );
  }
}

ReportAgencyComponentFilter.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  agencies: PropTypes.instanceOf(Map),
  agencyComponents: PropTypes.instanceOf(List),
  /* eslint-enable react/no-unused-prop-types */
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number,
  selectedAgency: PropTypes.object,
};

ReportAgencyComponentFilter.defaultProps = {
  agencies: new Map(),
  agencyComponents: new List(),
  agencyFinderDataProgress: 0,
  selectedAgency: { id: 0 },
};

export default ReportAgencyComponentFilter;
