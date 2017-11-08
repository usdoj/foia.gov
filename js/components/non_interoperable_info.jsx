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
    <p>
      Currently, this agency’s FOIA process is not linked to
      FOIA.gov. {submissionInstructions}
    </p>
  );
}

NonInteroperableInfo.propTypes = {
  agencyComponent: PropTypes.object.isRequired,
};

export default NonInteroperableInfo;
