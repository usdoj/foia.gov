import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { uniqueId } from 'lodash';

import USWDSSelectWidget from './uswds_select_widget';
import FoiaModal from './foia_modal';
import FoiaTooltip from './foia_tooltip';
import dispatcher from '../util/dispatcher';
import { types } from '../actions/report';

class FoiaReportDataTypeFilter extends Component {
  constructor(props) {
    super(props);

    this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
    this.handleFilterFieldUpdate = this.handleFilterFieldUpdate.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleFilterReset = this.handleFilterReset.bind(this);
    this.modalCanSubmit = this.modalCanSubmit.bind(this);
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

  modalCanSubmit() {
    const filter = this.props.selectedDataType.tempFilter || this.props.selectedDataType.filter;
    return filter.compareValue !== '' && parseInt(filter.compareValue, 10) >= 0;
  }

  buildModalContent() {
    const { selectedDataType } = this.props;
    const filter = this.props.selectedDataType.tempFilter || selectedDataType.filter;

    return (
      <div className="form-group">
        <h3 className="sans">Add Data Filter</h3>
        <div className="form-group field">
          <label htmlFor="filterField">
            Data Filters
            <FoiaTooltip text={"Select the type of FOIA data you would like to view. The data comes from agencies' Annual FOIA Reports. To learn more about the data, view the terms in the Glossary."} />
          </label>
          <USWDSSelectWidget
            id="filterField"
            name="filterField"
            title=""
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
          >
            <option value="greater_than">is greater than</option>
            <option value="less_than">is less than</option>
            <option value="equal_to">is equal to</option>
            <option value="is_na">is equal to N/A</option>
          </select>
        </div>
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
          />
          {!this.modalCanSubmit() &&
          <p className="usa-input-error-message">Please enter a numeric value to compare.</p>
          }
        </div>
      </div>
    );
  }

  render() {
    const dataTypeSelected = (this.props.selectedDataType.id !== '' && this.props.selectedDataType.id !== 'group_iv_exemption_3_statutes') || false;
    const resetButton = (<a
      onClick={this.handleFilterReset}
      style={{ cursor: 'pointer' }}
      href={null}
    >Reset Attribute</a>);
    return (
      <div>
        <USWDSSelectWidget
          name="data_type"
          title="Data Type"
          id={`data-type-${this.state.id}`}
          value={this.props.selectedDataType.id}
          options={[...this.props.dataTypeOptions]}
          handleChange={this.handleDataTypeChange}
        />
        {dataTypeSelected &&
          <FoiaModal
            triggerText="Filter Results"
            ariaLabel="Add Data Filter"
            modalContent={this.buildModalContent()}
            onSubmit={this.handleModalSubmit}
            onClose={this.handleFilterReset}
            canSubmit={this.modalCanSubmit}
            modalAdditionalLink={resetButton}
          />
        }
      </div>
    );
  }
}

FoiaReportDataTypeFilter.propTypes = {
  dataTypeOptions: PropTypes.instanceOf(List),
  selectedDataType: PropTypes.object,
};

FoiaReportDataTypeFilter.defaultProps = {
  dataTypeOptions: new List(),
  selectedDataType: { index: 0, id: '' },
};

export default FoiaReportDataTypeFilter;
