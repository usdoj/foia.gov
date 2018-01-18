import React from 'react';
import PropTypes from 'prop-types';

import RequestSummarySection from './request_summary_section';


function RequestSummary({ formData, requestForm }) {
  return (
    <div>
      {
        requestForm.sections
          .map(
            section => (
              <RequestSummarySection
                key={section.id}
                formData={formData}
                requestForm={requestForm}
                section={section}
              />
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
