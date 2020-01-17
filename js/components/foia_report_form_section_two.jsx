import React, { Component } from 'react';
import FoiaTooltip from './foia_tooltip';

/**
 * README!: The assumption of this file is that it is a 'good enough'
 * holding place for the section two markup at the moment.  This should all be updated
 * as we break the markup into better components.
 */
class FoiaReportFormSectionTwo extends Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <fieldset>
            <legend className="foia-header-blue-line--h2">
              2. Select Data Type(s)
              <FoiaTooltip text="Select the type of FOIA data you would like to view. The data comes from agencies' Annual FOIA Reports. To learn more about the data, view the terms in the Glossary." />
            </legend>
            <div className="form-group field">
              <label htmlFor="data_type"><strong>Data Type</strong></label>
              <select name="data_type" id="data_type" className="usa-reset-width">
                <option value="" disabled>Select a Data Type</option>
                <option value="report_requests">Requests</option>
                <option value="request_disposition"> - Disposition</option>
                <option value="report_fee_waiver"> - Expedited Processing</option>
                <option value="report_exemptions">Exemptions</option>
                <option value="report_appeals">Appeals</option>
                <option value="appeal_disposition"> - Disposition (Dis.)</option>
                <option value="appeal_denial_ex"> - Dis. Use of Exemptions</option>
                <option value="appeal_denial_other"> - Dis. Other Than Exemptions</option>
                <option value="appeal_response_time"> - Response Time</option>
                <option value="appeal_ten_pending"> - Ten Oldest Pending</option>
                <option value="report_processing_time">Processing Time</option>
                <option value="processing_granted"> - Requests Granted</option>
                <option value="processing_simple"> - Simple Requests</option>
                <option value="processing_complex"> - Complex Requests</option>
                <option value="processing_expedited"> - Expedited Requests</option>
                <option value="processing_pending"> - Pending Requests</option>
                <option value="processing_ten_request"> - Ten Oldest Requests</option>
                <option value="feewaiver_waiver">Fee Waiver</option>
                <option value="report_personnel">Administration</option>
                <option value="personnel_cost"> - FOIA Costs</option>
                <option value="report_backlog">Backlog</option>
                <option value="report_consultations">Consultations</option>
                <option value="report_exclusions">Exclusions</option>
                <option value="report_proactive">Proactive</option>
              </select>
              <button className="usa-button usa-button-outline usa-button-small">Filter Results</button>
            </div>
            <div className="form-group field use-dark-icons usa-grid">
              <a href="#"><span className="icon-plus"></span>Add Another Data Type</a>
            </div>
          </fieldset>
        </div>
        <div className="form-group usa-width-one-half visually-hidden">
          {/* Begin Modal Inner HTML */}
          <div className="form-group">
            <h3 className="sans">Add Data Filter</h3>
            <div className="form-group field">
              <label htmlFor="data_filter_subject">
                Data Filters
                <FoiaTooltip />
              </label>
              <select name="data_filter_subject" id="data_filter_subject">
                <option value="request_ex_6">Request Ex. 6</option>
                <option value="request_ex_7">Request Ex. 7</option>
                <option value="request_ex_8">Request Ex. 8</option>
                <option value="request_ex_9">Request Ex. 9</option>
                <option value="request_ex_10">Request Ex. 10</option>
              </select>
            </div>
            <div className="form-group field">
              <label htmlFor="data_filter_operator">Select a value</label>
              <select name="data_filter_operator" id="data_filter_operator">
                <option value="greater_than">is greater than</option>
                <option value="less_than">is less than</option>
                <option value="equal_to">is equal to</option>
                <option value="is_na">is equal to N/A</option>
              </select>
            </div>
            <div className="form-group field">
              <label htmlFor="data_filter_value">Enter a Numeric Value</label>
              <input name="data_filter_value" id="data_filter_value" value="" placeholder="Enter a Numeric Value" />
            </div>
            <div className="form-group form-group_footer">
              <button className="usa-button usa-button-primary-alt">Submit</button>
              <button className="usa-button usa-button-outline">Cancel</button>
              <a href="#">Reset Filter</a>
            </div>
          </div>
          {/* End Modal Inner HTML */}
        </div>
      </div>
    );
  }
}

export default FoiaReportFormSectionTwo;
