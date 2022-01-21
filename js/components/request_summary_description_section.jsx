import React from 'react';
import PropTypes from 'prop-types';

function RequestSummaryDescriptionSection({ formData, section }) {
  const description = formData.request_description.request_description;

  return (
    <section>
      <h3>{section.title}</h3>
      <div className="request-summary_section">
        <p>{description}</p>
      </div>
    </section>
  );
}

RequestSummaryDescriptionSection.propTypes = {
  formData: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
};

export default RequestSummaryDescriptionSection;
