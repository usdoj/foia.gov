import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reportActions } from '../actions/report';

class FoiaReportDataSubmit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    reportActions.fetchAnnualReportData(this.props.selectedDataTypes);
  }

  render() {
    return (
      <div className="form-group form-group_footer">
        <button onClick={this.handleSubmit} className="usa-button usa-button-big usa-button-primary-alt">View Report</button>
        <button onClick="" className="usa-button usa-button-big usa-button-outline">Download CSV</button>
        <a>Clear Search</a>
      </div>
    );
  }
}

FoiaReportDataSubmit.propTypes = {
  selectedDataTypes: PropTypes.array,
};

FoiaReportDataSubmit.defaultProps = {
  selectedDataTypes: [],
};

export default FoiaReportDataSubmit;
