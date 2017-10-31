import React from 'react';
import PropTypes from 'prop-types';

function RequestSummaryContactSection({ formData }) {
  const data = formData.requester_contact;
  return (
    <div className="request-summary_section">
      <h5>Name</h5>
      <div>{[data.first_name, data.last_name].join(' ')}</div>
    </div>
  );
}


RequestSummaryContactSection.propTypes = {
  formData: PropTypes.object.isRequired,
};


export default RequestSummaryContactSection;
