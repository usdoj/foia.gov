import React from 'react';
import PropTypes from 'prop-types';

import RequestSummarySection from './request_summary_section';


function RequestSummary({ formData, requestForm }) {
  return (
    <div>
      {
        requestForm.sections
          .filter(section => (section.fieldNames))
          .map(
            section => (
              <section key={section.id}>
                <h3>{section.title}</h3>
                <RequestSummarySection
                  formData={formData}
                  requestForm={requestForm}
                  section={section}
                />
              </section>
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
