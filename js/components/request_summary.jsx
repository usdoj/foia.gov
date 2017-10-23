import React from 'react';
import PropTypes from 'prop-types';

import RequestSummarySection from './request_summary_section';


function RequestSummary({ formData, requestForm }) {
  return (
    <div>
      {
        requestForm.sections.map(
          section => (
            <div key={section.id}>
              <h3>{section.title}</h3>
              <RequestSummarySection
                formData={formData}
                requestForm={requestForm}
                section={section}
              />
            </div>
          ),
        )
      }
    </div>
  );
}

RequestSummary.propTypes = {
  formData: PropTypes.object.isRequired,
  requestForm: PropTypes.object.isRequired,
};


export default RequestSummary;
