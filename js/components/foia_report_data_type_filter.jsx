import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, OrderedMap } from 'immutable';
import { uniqueId } from 'lodash';

import USWDSSelectWidget from './uswds_select_widget';
import FoiaModal from './foia_modal';
import FoiaTooltip from './foia_tooltip';
import dispatcher from '../util/dispatcher';
import { types } from '../actions/report';

class FoiaReportDataTypeFilter extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      id: uniqueId(),
    });
  }

  handleChange(e) {
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

  buildModalContent() {
    const { dataTypes, selectedDataType } = this.props;
    const options = dataTypes.get(selectedDataType.id)
      .filter_opts
      .map(opt => (
        <option value={opt.id} key={opt.id}>{opt.label}</option>
      ));
    const inputId = uniqueId('data-filter_');

    return (
      <div className="form-group">
        <h3 className="sans">Add Data Filter</h3>
        <div className="form-group field">
          <label htmlFor={`${inputId}_subject-${selectedDataType.id}-${selectedDataType.index}`}>
            Data Filters
            <FoiaTooltip text={"Select the type of FOIA data you would like to view. The data comes from agencies' Annual FOIA Reports. To learn more about the data, view the terms in the Glossary."}
            />
          </label>
          <select name={`${inputId}_subject-${selectedDataType.id}-${selectedDataType.index}`} id={`${inputId}_subject-${selectedDataType.id}-${selectedDataType.index}`}>
            {options}
          </select>
        </div>
        <div className="form-group field">
          <label htmlFor={`${inputId}_operator-${selectedDataType.id}-${selectedDataType.index}`}>Select a value</label>
          <select name={`${inputId}_operator-${selectedDataType.id}-${selectedDataType.index}`} id={`${inputId}_operator-${selectedDataType.id}-${selectedDataType.index}`}>
            <option value="greater_than">is greater than</option>
            <option value="less_than">is less than</option>
            <option value="equal_to">is equal to</option>
            <option value="is_na">is equal to N/A</option>
          </select>
        </div>
        <div className="form-group field">
          <label htmlFor={`${inputId}_value-${selectedDataType.id}-${selectedDataType.index}`}>Enter a Numeric Value</label>
          <input
            name={`${inputId}_value-${selectedDataType.id}-${selectedDataType.index}`}
            id={`${inputId}_value-${selectedDataType.id}-${selectedDataType.index}`}
            value=""
            placeholder="Enter a Numeric Value"
          />
        </div>
        <div className="form-group form-group_footer">
          <button className="usa-button usa-button-primary-alt">Submit
          </button>
          <button className="usa-button usa-button-outline">Cancel
          </button>
          <a href="#">Reset Filter</a>
        </div>
      </div>
    );
  }

  render() {
    const dataTypeSelected = (this.props.selectedDataType.id !== '') || false;
    return (
      <div>
        <USWDSSelectWidget
          name="data_type"
          title="Data Type"
          id={`data-type-${this.state.id}`}
          value={this.props.selectedDataType.id}
          options={this.props.dataTypeOptions}
          handleChange={this.handleChange}
        />
        {dataTypeSelected &&
          <FoiaModal
            triggerText="Filter Results"
            ariaLabel="Add Data Filter"
            modalContent={this.buildModalContent()}
          />
        }
      </div>
    );
  }
}

FoiaReportDataTypeFilter.propTypes = {
  dataTypes: PropTypes.instanceOf(OrderedMap),
  dataTypeOptions: PropTypes.instanceOf(List),
  selectedDataType: PropTypes.object,
};

FoiaReportDataTypeFilter.defaultProps = {
  dataTypes: new OrderedMap(),
  dataTypeOptions: new List(),
  selectedDataType: { index: 0, id: '' },
};

export default FoiaReportDataTypeFilter;
