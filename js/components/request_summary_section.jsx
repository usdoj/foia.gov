import React from 'react';
import PropTypes from 'prop-types';

import RequestSummaryContactSection from './request_summary_contact_section';
import RequestSummaryDescriptionSection from './request_summary_description_section';
import { dataUrlToAttachment, findFileFields } from '../util/attachment';

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

function fileField(value) {
  const [attachment] = dataUrlToAttachment(value);
  return <div className="request-summary_file-field">{attachment.filename}</div>;
}

function RequestSummarySection({ section, formData, requestForm }) {
  if (section.id === 'requester_contact') {
    return (
      <RequestSummaryContactSection
        formData={formData}
        section={section}
      />
    );
  }

  if (section.id === 'request_description') {
    return (
      <RequestSummaryDescriptionSection
        formData={formData}
        section={section}
      />
    );
  }

  const sectionFields = formData[section.id] || {};
  const fileFields = findFileFields(requestForm);
  const sectionFieldNames = section.fieldNames || Object.keys(sectionFields);

  // The "supporting_docs" section can have custom fields which are not in section.fieldNames.
  if (section.id === 'supporting_docs') {
    Object.keys(sectionFields).forEach(sectionField => {
      if (!sectionFieldNames.includes(sectionField)) {
        sectionFieldNames.push(sectionField);
      }
    });
  }

  // Maintain field ordering as much as possible, start with section field name ordering
  const populatedFields = (section.fieldNames || Object.keys(sectionFields))
    // Only include fields that actually exist in this form
    .filter((fieldName) => fieldName in sectionFields && !!sectionFields[fieldName]);

  // Don't show the section if there's nothing to show
  if (!populatedFields.length) {
    return null;
  }

  return (
    <section>
      <h3>{section.title}</h3>
      <div className="request-summary_section">
        {
          populatedFields
            .map((fieldName) => {
              const isFileField = fileFields.includes(fieldName);
              const label = fieldLabel(requestForm, section.id, fieldName);
              const value = sectionFields[fieldName];

              return (
                <div key={`${section.id}-${fieldName}`}>
                  { isFileField
                    ? fileField(value)
                    : (
                      <div>
                        <h5 className="request-summary_label">{label}</h5>
                        <div>{value}</div>
                      </div>
                    )}
                </div>
              );
            })
        }
      </div>
    </section>
  );
}

RequestSummarySection.propTypes = {
  section: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  requestForm: PropTypes.object.isRequired,
};

export default RequestSummarySection;
