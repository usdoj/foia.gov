import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { AgencyComponent, SubmissionResult } from '../models';
import rf from '../util/request_form';


function Confirmation({ agencyComponent, formData, submissionResult }) {
  const { submission_id } = submissionResult;
  const flattenedFormData = rf.mergeSectionFormData(formData.toJS());

  return (
    <div className="confirmation">
      <h1 className="confirmation_title">Success!</h1>
      <section className="confirmation_contact">
        <p>
          Your FOIA request has been created and is being sent to
          the {agencyComponent.title} now.  You’ll hear back from the agency
          confirming receipt in coming weeks using the contact information you
          provided. If you have questions about your request, feel free to
          reach out to the agency FOIA personnel using the information provided
          below.
        </p>
        <div className="confirmation_agency-contact">
          <h2>Contact the agency</h2>
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
        <p>Below is a summary of your request.</p>
        <table>
          <tbody>
            { Object.keys(flattenedFormData)
                .map((fieldName) => {
                  const value = flattenedFormData[fieldName];
                  return (
                    <tr>
                      <td><strong>{fieldName}</strong></td>
                      <td>{value}</td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
      </section>
      <section className="confirmation_record-id">
        <p>
          The record ID for your request is <strong>{submission_id}</strong>.
          The record ID is only for identifying your request on FOIA.gov.
          This number can help you resolve issues submitting your request to
          an agency. In case there is an issue submitting your request to the
          agency you selected, you can use this number to help.
        </p>
      </section>
    </div>
  );
}

Confirmation.propTypes = {
  agencyComponent: PropTypes.instanceOf(AgencyComponent).isRequired,
  formData: PropTypes.instanceOf(Map),
  submissionResult: PropTypes.instanceOf(SubmissionResult).isRequired,
};

Confirmation.defaultProps = {
  formData: new Map(),
};


export default Confirmation;
