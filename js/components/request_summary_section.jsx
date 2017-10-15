import React from 'react';
import PropTypes from 'prop-types';


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
  const sectionFields = formData[section.id];

  return (
    <table className="request-summary_section">
      <tbody>
        { Object.keys(sectionFields)
            .map((fieldName) => {
              const label = fieldLabel(requestForm, section.id, fieldName);
              const value = sectionFields[fieldName];
              return (
                <tr key={`${section.id}-${fieldName}`}>
                  <td className="request-summary_label"><strong>{label}</strong></td>
                  <td>{value}</td>
                </tr>
              );
            })
        }
      </tbody>
    </table>
  );
}

RequestSummarySection.propTypes = {
  section: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  requestForm: PropTypes.object.isRequired,
};


export default RequestSummarySection;
