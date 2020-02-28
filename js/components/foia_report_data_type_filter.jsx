import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { uniqueId } from 'lodash';

import USWDSSelectWidget from './uswds_select_widget';
import FoiaModal from './foia_modal';
import FoiaTooltip from './foia_tooltip';
import dispatcher from '../util/dispatcher';
import RemoveLink from './remove_link';
import { types } from '../actions/report';

class FoiaReportDataTypeFilter extends Component {
  constructor(props) {
    super(props);

    this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
    this.handleFilterFieldUpdate = this.handleFilterFieldUpdate.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleFilterReset = this.handleFilterReset.bind(this);
    this.modalCanSubmit = this.modalCanSubmit.bind(this);
    this.handleFilterRemove = this.handleFilterRemove.bind(this);
  }

  componentWillMount() {
    this.setState({
      id: uniqueId(),
    });
  }

  handleDataTypeChange(e) {
    const selection = {
      id: e.target.value,
      index: this.props.selectedDataType.index,
    };

    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_TYPE_UPDATE,
      selectedDataType: selection,
      previousDataType: this.props.selectedDataType,
    });
  }

  handleFilterFieldUpdate(e) {
    const selection = this.props.selectedDataType;
    const filterUpdate = {
      name: e.target.name,
      value: e.target.value,
    };

    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_TYPE_FILTER_UPDATE,
      currentSelection: selection,
      filter: filterUpdate,
    });
  }

  handleModalSubmit() {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_TYPE_FILTER_SUBMIT,
      index: this.props.selectedDataType.index,
    });
  }

  handleFilterReset() {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_TYPE_FILTER_RESET,
      index: this.props.selectedDataType.index,
    });
  }
  handleFilterRemove(e) {
    this.filterModal.closeModal(e);
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_TYPE_FILTER_REMOVE,
      selection: this.props.selectedDataType,
    });
  }

  modalCanSubmit() {
    const filter = this.props.selectedDataType.tempFilter || this.props.selectedDataType.filter;
    return (filter.compareValue !== '' && parseInt(filter.compareValue, 10) >= 0) || filter.op === 'is_na';
  }

  buildModalContent() {
    const { selectedDataType } = this.props;
    const filter = this.props.selectedDataType.tempFilter || selectedDataType.filter;
    const noValue = filter.compareValue === '';
    const parsedValue = parseInt(filter.compareValue, 10);
    const invalidValue = isNaN(parsedValue) || parsedValue < 0;

    return (
      <div className="form-group">
        <h3 className="sans usa-reset-width">Add Data Filter</h3>
        <div className="form-group field">
          <USWDSSelectWidget
            id="filterField"
            fieldsetClasses="usa-fieldset-inputs label-weight-normal"
            name="filterField"
            title={
              <span>Data Filters
                <FoiaTooltip
                  text={'Select the type of FOIA data you would like to view. The data comes from agencies\' Annual FOIA Reports. To learn more about the data, view the terms in the Glossary.'}
                />
              </span>
            }
            options={selectedDataType.filterOptions}
            placeholder=""
            handleChange={this.handleFilterFieldUpdate}
            value={filter.filterField}
          />
        </div>
        <div className="form-group field">
          <label htmlFor="op">Select a value</label>
          <select
            name="op"
            id="op"
            onChange={this.handleFilterFieldUpdate}
            value={filter.op}
            className="usa-reset-width"
          >
            <option value="greater_than">is greater than</option>
            <option value="less_than">is less than</option>
            <option value="equal_to">is equal to</option>
            <option value="is_na">is equal to N/A</option>
          </select>
        </div>
        {filter.op !== 'is_na' &&
        <div className="form-group field">
          <label htmlFor="compareValue">Enter a Numeric Value</label>
          <input
            name="compareValue"
            id="compareValue"
            placeholder="Enter a Numeric Value"
            type="number"
            min="0"
            onChange={this.handleFilterFieldUpdate}
            value={filter.compareValue}
            className="usa-reset-width"
          />
          {noValue &&
          <p className="usa-input-error-message">Please enter a numeric value to compare.</p>
          }
          {!noValue && invalidValue &&
          <p className="usa-input-error-message">Please enter a valid numeric value greater than or equal to zero.</p>
          }
        </div>
        }
      </div>
    );
  }

  render() {
    const { dataTypeDisplayError, fieldsDisplayed } = this.props;
    const dataTypeSelected = (this.props.selectedDataType.id !== '' && this.props.selectedDataType.id !== 'group_iv_exemption_3_statutes') || false;
    const filterSubmitted = Object.hasOwnProperty.call(this.props.selectedDataType, 'filter') && this.props.selectedDataType.filter.applied;
    const removeButton = filterSubmitted ? (<a
      onClick={this.handleFilterRemove}
      style={{ cursor: 'pointer' }}
      href={null}
    >Remove Filter</a>) : null;
    const modalText = filterSubmitted ? 'Edit Results Filter' : 'Filter Results';
    const fieldsetClasses = dataTypeDisplayError ? 'usa-fieldset-inputs usa-input-error' : 'usa-fieldset-inputs';

    const removeDataFieldButton = fieldsDisplayed > 1 ? (
      <RemoveLink
        eventType={types.ANNUAL_REPORT_DATA_TYPE_FIELD_REMOVE}
        selection={this.props.selectedDataType}
        text="Remove"
      />
    ) : null;
    return (
      <div>
        <USWDSSelectWidget
          name="data_type"
          title="Data Type"
          id={`data-type-${this.state.id}`}
          value={this.props.selectedDataType.id}
          options={[...this.props.dataTypeOptions]}
          handleChange={this.handleDataTypeChange}
          fieldsetClasses={fieldsetClasses}
        />
        {dataTypeDisplayError &&
        <p className="usa-input-error-message">A Data Type is required.</p>
        }
        <div className="report-field-actions">
          {dataTypeSelected &&
            <FoiaModal
              ref={(modal) => { this.filterModal = modal; }}
              triggerText={modalText}
              ariaLabel={modalText}
              modalContent={this.buildModalContent()}
              onSubmit={this.handleModalSubmit}
              onClose={this.handleFilterReset}
              canSubmit={this.modalCanSubmit}
              modalAdditionalLink={removeButton}
            />
          }
          {removeDataFieldButton}
        </div>
      </div>
    );
  }
}

FoiaReportDataTypeFilter.propTypes = {
  dataTypeOptions: PropTypes.instanceOf(List),
  selectedDataType: PropTypes.object,
  dataTypeDisplayError: PropTypes.bool.isRequired,
  fieldsDisplayed: PropTypes.number.isRequired,
};

FoiaReportDataTypeFilter.defaultProps = {
  dataTypeOptions: new List(),
  selectedDataType: { index: 0, id: '' },
};

export default FoiaReportDataTypeFilter;
