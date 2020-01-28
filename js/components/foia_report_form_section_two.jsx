import React, { Component } from 'react';
import FoiaTooltip from './foia_tooltip';
import FoiaModal from './foia_modal';

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
              <FoiaTooltip text={'<p>Select the type of FOIA data you would like to view. The data comes from agencies’ Annual FOIA Reports.</p><p>To learn more about the data, view the terms in the <span data-term="annual foia report" title="Click to define" tabindex="0">Glossary</span>.</p>'} />
            </legend>
            <p>Adding more than one data filter will return results that fit any one of the filters
              provided. For example, a search for exemption data with the filters &ldquo;Ex. 5 is
              0&rdquo; + &ldquo;Ex. 6 is 0&rdquo; will return data that satisfy either criteria,
              rather than limiting the results to data that satisfy both criteria.</p>
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
              <FoiaModal
                triggerText="Filter Results"
                ariaLabel="Add Data Filter"
                modalContent={
                  <div className="form-group">
                    <h3 className="sans">Add Data Filter</h3>
                    <div className="form-group field">
                      <label htmlFor="data_filter_subject">
                        Data Filters
                        <FoiaTooltip text={'<p>If you would like to filter the results based on specific parameters, you can specify those parameters here.</p><p>To learn more about the data, view the terms in the <span data-term="" title="Click to view glossary" tabindex="0">Glossary</span>.</p>'} />
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
                  </div>
                }
                modalSubmitButton={<button className="usa-button usa-button-primary-alt">Submit</button>}
                modalAdditionalLink={<a href="#">Reset Filter</a>}
              /> {/* End FoiaModal */}
            </div>
            <div className="form-group field use-dark-icons">
              <a href="#"><span className="icon-plus" />Add Another Data Type</a>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default FoiaReportFormSectionTwo;
