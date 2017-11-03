import React from 'react';
import PropTypes from 'prop-types';

function RequestSummaryDescriptionSection({ formData }) {
  const description = formData.request_description.request_description;

  return (
    <div className="request-summary_section">
      <p>{description}</p>
    </div>
  );
}


RequestSummaryDescriptionSection.propTypes = {
  formData: PropTypes.object.isRequired,
};


export default RequestSummaryDescriptionSection;
