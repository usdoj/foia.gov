import React from 'react';
import PropTypes from 'prop-types';

import RequestSummaryContactSection from './request_summary_contact_section';


// Returns the field label from the requestForm for human readable display
function fieldLabel(requestForm, sectionId, fieldName) {
  const { jsonSchema, uiSchema } = requestForm;

  // Prefer uiSchema title over jsonSchema
  const sectionUiSchema = uiSchema[sectionId];
  const fieldUiSchema = sectionUiSchema && sectionUiSchema[fieldName];
  if (fieldUiSchema && fieldUiSchema['ui:title']) {
    return fieldUiSchema['ui:title'];
  }

  const sectionJsonSchema = jsonSchema.properties[sectionId];
  const fieldJsonSchema = sectionJsonSchema.properties && sectionJsonSchema.properties[fieldName];
  if (fieldJsonSchema && fieldJsonSchema.title) {
    return fieldJsonSchema.title;
  }

  return null;
}


function RequestSummarySection({ section, formData, requestForm }) {
  const sectionFields = formData[section.id] || {};

  if (section.id === 'requester_contact') {
    return (
      <RequestSummaryContactSection
        formData={formData}
      />
    );
  }

  return (
    <div className="request-summary_section">
      {
        // Maintain field ordering as much as possible
        (section.fieldNames || Object.keys(sectionFields))
          // Only include fields that actually exist in this form
          .filter(fieldName => fieldName in sectionFields && !!sectionFields[fieldName])
          .map((fieldName) => {
            const label = fieldLabel(requestForm, section.id, fieldName);
            const value = sectionFields[fieldName];
            return (
              <div key={`${section.id}-${fieldName}`}>
                <h5 className="request-summary_label">{label}</h5>
                <div>{value}</div>
              </div>
            );
          })
      }
    </div>
  );
}

RequestSummarySection.propTypes = {
  section: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  requestForm: PropTypes.object.isRequired,
};


export default RequestSummarySection;
