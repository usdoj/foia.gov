import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { AgencyComponent, SubmissionResult } from '../models';
import RequestSummary from './request_summary';


function Confirmation({ agencyComponent, formData, requestForm, submissionResult }) {
  const { submission_id } = submissionResult;
  const getDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today = new Date();
    const submission_date = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

    return submission_date;
  };

  return (
    <div className="confirmation">
      <div className="print-only confirmation_print-submission-id">
        <p><strong>Submission ID:</strong> {submission_id}</p>
      </div>
      <h1 className="confirmation_title">Success!</h1>
      <section className="confirmation_contact">
        <h3>
          Your FOIA request has been created and is being sent to
          the {agencyComponent.title}.
        </h3>
        <p>
          Please save this page for your records.
        </p>
        <button
          className="usa-button usa-button-outline print-button"
          onClick={() => window.print()}
        >
          Print page
        </button>
        <p>
          You’ll hear back from the agency confirming receipt in the coming weeks
          using the contact information you provided. If you have questions
          about your request, feel free to reach out to the agency FOIA
          personnel using the information provided below.
        </p>
        <div className="confirmation_agency-contact">
          <h5 tabIndex="-1">Contact the agency</h5>
          <p className="confirmation_agency-contact-title">
            {agencyComponent.title}
          </p>
          { agencyComponent.website &&
            <p className="confirmation_agency-contact-website">
              {agencyComponent.website.uri}
            </p>
          }
          { agencyComponent.email &&
            <p className="confirmation_agency-contact-email">
              {agencyComponent.email}
            </p>
          }
          { agencyComponent.telephone &&
            <p className="confirmation_agency-contact-phone">
              {agencyComponent.telephone}
            </p>
          }
        </div>
      </section>

      <section className="confirmation_request-summary">
        <h2>Request summary</h2>
        <p>Request submitted on <strong>{ getDate() }</strong>.</p>
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
