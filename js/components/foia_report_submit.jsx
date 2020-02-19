import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reportActions, types } from '../actions/report';
import dispatcher from '../util/dispatcher';

class FoiaReportDataSubmit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
  }

  formIsValid() {
    const validationFieldCheck = [
      this.props.agencyComponentIsValid,
      this.props.dataTypesIsValid,
      this.props.fiscalYearsIsValid,
    ];

    return validationFieldCheck.every(Boolean);
  }

  handleSubmit(event) {
    event.preventDefault();
    const action = event.target.value;
    reportActions.returnFieldValidationStateOnSubmit();
    if (this.formIsValid()) {
      dispatcher.dispatch({
        type: types.REPORT_SUBMISSION_TYPE,
        submissionAction: action,
      });
      reportActions.fetchAnnualReportData(this.props.selectedDataTypes);
    }
  }

  render() {
    return (
      <div className="form-group form-group_footer">
        <button onClick={this.handleSubmit} value="view" type="submit" className="usa-button usa-button-big usa-button-primary-alt with-siblings">View Report</button>
        <button onClick={this.handleSubmit} value="download" type="button" className="usa-button usa-button-big usa-button-outline">Download CSV</button>
        <a>Clear Search</a>
      </div>
    );
  }
}

FoiaReportDataSubmit.propTypes = {
  selectedDataTypes: PropTypes.array,
  fiscalYearsIsValid: PropTypes.bool.isRequired,
  dataTypesIsValid: PropTypes.bool.isRequired,
  agencyComponentIsValid: PropTypes.bool.isRequired,
};

FoiaReportDataSubmit.defaultProps = {
  selectedDataTypes: [],
};

export default FoiaReportDataSubmit;
