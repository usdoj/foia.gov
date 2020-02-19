import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import ReportAgencyComponentTypeahead from './report_agency_component_typeahead';
import FoiaModal from './foia_modal';
import RemoveLink from './remove_link';
import { types } from '../actions/report';
import dispatcher from '../util/dispatcher';

class ReportAgencyComponentFilter extends Component {
  constructor(props) {
    super(props);

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.modalCanSubmit = this.modalCanSubmit.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  handleSelectAll(e, selectValue) {
    e.preventDefault();
    dispatcher.dispatch({
      type: types.SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE_ALL,
      selectValue,
      agency: this.props.selectedAgency,
    });
  }

  handleCheckboxChange(e, component) {
    dispatcher.dispatch({
      type: types.SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE,
      agencyComponent: component,
      agency: this.props.selectedAgency,
    });
  }

  handleModalSubmit() {
    dispatcher.dispatch({
      type: types.SELECTED_AGENCY_COMPONENTS_MERGE_TEMPORARY,
      index: this.props.selectedAgency.index,
    });
  }

  handleModalClose() {
    dispatcher.dispatch({
      type: types.SELECTED_AGENCY_COMPONENTS_DISCARD_TEMPORARY,
      index: this.props.selectedAgency.index,
    });
  }

  modalCanSubmit() {
    const components = this.props.selectedAgency.tempSelectedComponents
      || this.props.selectedAgency.components;

    return components.filter(item => item.selected).size > 0;
  }

  buildModalContent() {
    const components = this.props.selectedAgency.tempSelectedComponents
      || this.props.selectedAgency.components;
    const checkboxes = components
      .map((component) => {
        const inputId = uniqueId(`${component.abbreviation}_`);
        return (
          <li className="usa-width-one-third" key={component.id}>
            <input
              id={inputId}
              type="checkbox"
              name={`${this.props.selectedAgency.id}-component`}
              value={component.id}
              checked={component.selected}
              onChange={e => this.handleCheckboxChange(e, component)}
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
            {!this.modalCanSubmit() &&
              <p className="usa-input-error-message">One or more components are required.</p>
            }
            <div className="form-group">
              <ul className="inline-list--centered">
                <li><a href="" onClick={e => this.handleSelectAll(e, true)}>Select All</a></li>
                <li><a href="" onClick={e => this.handleSelectAll(e, false)}>Select None</a></li>
              </ul>
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
      agencyComponentDisplayError,
      fieldsDisplayed,
      isDisabled,
    } = this.props;

    const agencyIsSelected = (this.props.selectedAgency.id !== 0 && this.props.selectedAgency.type === 'agency') || false;
    const isCentralizedAgency = this.props.selectedAgency.component_count <= 1 || false;

    const removeAgencyComponentButton = fieldsDisplayed > 1 ? (
      <RemoveLink
        eventType={types.ANNUAL_REPORT_AGENCY_COMPONENT_REMOVE}
        selection={this.props.selectedAgency}
        text="Remove"
      />
    ) : null;

    return (
      <div className={'usa-search usa-search-big'.concat(isDisabled ? ' usa-disabled' : '')}>
        <ReportAgencyComponentTypeahead
          agencies={agencies}
          agencyComponents={agencyComponents}
          agencyFinderDataProgress={agencyFinderDataProgress}
          agencyFinderDataComplete={agencyFinderDataComplete}
          isDisabled={isDisabled}
          selectedAgency={selectedAgency}
          agencyComponentDisplayError={agencyComponentDisplayError}
        />
        <div className="report-field-actions">
          {agencyIsSelected && !isCentralizedAgency &&
          <FoiaModal
            modalContent={this.buildModalContent()}
            ariaLabel="Filter agency components"
            triggerText="Select Agency Components"
            onSubmit={this.handleModalSubmit}
            canSubmit={this.modalCanSubmit}
            onClose={this.handleModalClose}
          />
          }
          {removeAgencyComponentButton}
        </div>
      </div>
    );
  }
}

ReportAgencyComponentFilter.propTypes = {
  agencies: PropTypes.instanceOf(Map),
  agencyComponents: PropTypes.instanceOf(List),
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number,
  isDisabled: PropTypes.bool,
  selectedAgency: PropTypes.object,
  agencyComponentDisplayError: PropTypes.bool.isRequired,
  fieldsDisplayed: PropTypes.number.isRequired,
};

ReportAgencyComponentFilter.defaultProps = {
  agencies: new Map(),
  agencyComponents: new List(),
  agencyFinderDataProgress: 0,
  isDisabled: false,
  selectedAgency: { index: 0 },
};

export default ReportAgencyComponentFilter;
