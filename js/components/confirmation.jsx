import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { AgencyComponent, SubmissionResult } from '../models';
import RequestSummary from './request_summary';


function Confirmation({ agencyComponent, formData, requestForm, submissionResult }) {
  const { submission_id } = submissionResult;

  return (
    <div className="confirmation">
      <div className="print-only confirmation_print-submission-id">
        <p><strong>Submission ID:</strong> {submission_id}</p>
      </div>
      <h1 className="confirmation_title">Success!</h1>
      <section className="confirmation_contact">
        <p className="usa-lead">
          Your FOIA request has been created and is being sent to
          the {agencyComponent.title}.
        </p>
        <p>
          Please save this page for your records.
        </p>
        <p>
          You’ll hear back from the agency confirming receipt in coming weeks
          using the contact information you provided. If you have questions
          about your request, feel free to reach out to the agency FOIA
          personnel using the information provided below.
        </p>
        <div className="confirmation_agency-contact">
          <h5 tabIndex="-1">Contact the agency</h5>
          <div className="confirmation_agency-contact-title">
            {agencyComponent.title}
          </div>
          <div className="confirmation_agency-contact-website">
            {agencyComponent.website.uri}
          </div>
          <div className="confirmation_agency-contact-email">
            {agencyComponent.email}
          </div>
          <div className="confirmation_agency-contact-phone">
            {agencyComponent.telephone}
          </div>
        </div>
      </section>

      <section className="confirmation_request-summary">
        <h2>Request summary</h2>
        <p className="confirmation_submission-id">
          The submission ID for your request is <strong>{submission_id}</strong>.
        </p>
        <div className="info-box">
          <p>
            The submission ID is only for identifying your request on FOIA.gov and
            acts as a receipt to show that you submitted a request using
            FOIA.gov. This number does not replace the information you’ll receive
            from the agency to track your request. This number can help you resolve
            issues submitting your request to an agency.  In case there is an issue
            submitting your request to the agency you selected, you can use this
            number to help.
          </p>
        </div>
        <RequestSummary formData={formData.toJS()} requestForm={requestForm} />
      </section>
    </div>
  );
}

Confirmation.propTypes = {
  agencyComponent: PropTypes.instanceOf(AgencyComponent).isRequired,
  formData: PropTypes.instanceOf(Map),
  requestForm: PropTypes.object.isRequired,
  submissionResult: PropTypes.instanceOf(SubmissionResult).isRequired,
};

Confirmation.defaultProps = {
  formData: new Map(),
};


export default Confirmation;
