import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, OrderedMap } from 'immutable';

import FoiaTooltip from './foia_tooltip';
import AddLink from './add_link';
import FoiaReportDataTypeFilter from './foia_report_data_type_filter';
import { types } from '../actions/report';

/* eslint-disable-next-line react/prefer-stateless-function */
class FoiaReportFormSectionTwo extends Component {
  render() {
    const {
      dataTypes,
      dataTypeOptions,
      selectedDataTypes,
      dataTypeDisplayError,
    } = this.props;

    return (
      <div>
        <div className="form-group">
          <fieldset>
            <legend className="foia-header-blue-line--h2">
              2. Select Data Type(s)
              <FoiaTooltip text={'<p>Select the type of FOIA data you would like to view. The data comes from agencies’ Annual FOIA Reports.</p><p>To learn more about the data, view the terms in the <span data-term="annual foia report" title="Click to define" tabindex="0">Glossary</span>.</p>'} />
            </legend>
            <p>Adding more than one data filter will return results that fit any one of the filters
              provided. For example, a search for exemption data with the filters &ldquo;Ex. 5 is
              0&rdquo; + &ldquo;Ex. 6 is 0&rdquo; will return data that satisfy either criteria,
              rather than limiting the results to data that satisfy both criteria.</p>

            {selectedDataTypes.map((selected, index) => (
              <FoiaReportDataTypeFilter
                key={index} // eslint-disable-line react/no-array-index-key
                dataTypes={dataTypes}
                dataTypeOptions={dataTypeOptions}
                selectedDataType={selected}
                dataTypeDisplayError={dataTypeDisplayError}
              />))}

            <AddLink
              eventType={types.ANNUAL_REPORT_DATA_TYPE_FILTER_ADD_GROUP}
              text="Add Another Data Type"
            />
          </fieldset>
        </div>
      </div>
    );
  }
}

FoiaReportFormSectionTwo.propTypes = {
  dataTypes: PropTypes.instanceOf(OrderedMap),
  dataTypeOptions: PropTypes.instanceOf(List),
  selectedDataTypes: PropTypes.array,
  dataTypeDisplayError: PropTypes.bool.isRequired,
};

FoiaReportFormSectionTwo.defaultProps = {
  dataTypes: new OrderedMap(),
  dataTypeOptions: new List(),
  selectedDataTypes: [{ index: 0, id: '' }],
};

export default FoiaReportFormSectionTwo;
