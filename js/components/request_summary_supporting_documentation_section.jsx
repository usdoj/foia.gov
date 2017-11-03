import React from 'react';
import PropTypes from 'prop-types';

function RequestSummarySupportingDocumentationSection({ formData }) {
  const attachment = (formData.supporting_docs || {}).attachments_supporting_documentation;
  if (!attachment) {
    return null;
  }

  return (
    <div className="request-summary_section">
      <p>{attachment.filename}</p>
    </div>
  );
}


RequestSummarySupportingDocumentationSection.propTypes = {
  formData: PropTypes.object.isRequired,
};


export default RequestSummarySupportingDocumentationSection;
