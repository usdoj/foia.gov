import React from 'react';
import PropTypes from 'prop-types';


function NonInteroperableInfo({ agencyComponent }) {
  const submissionUrl = agencyComponent.submission_web && agencyComponent.submission_web.uri;
  const submissionInstructions = /^https?:/.test(submissionUrl) ?
    (
      <span>
        You can submit a request to this agency using the information found
        at the agency’s <a href={submissionUrl}>online submission form</a>.
      </span>
    ) : (
      <span>
        Use the information to the left in order to submit a FOIA request to this agency.
      </span>
    );

  return (
    <div className="info-box_reverse">
      <p><strong>Currently, this agency’s FOIA process is not linked to
      FOIA.gov.</strong>
      <br/>{submissionInstructions}</p>
    </div>
  );
}

NonInteroperableInfo.propTypes = {
  agencyComponent: PropTypes.object.isRequired,
};

export default NonInteroperableInfo;
