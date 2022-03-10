import assert from 'assert';

import wfjs from './webform_to_json_schema';

class SectionedFormBuilder {
  constructor(formSections) {
    this.formSections = formSections;
    this.additionalFieldsSection = formSections
      .find((section) => section.isAgencySpecificFieldSection);
    assert(
      this.additionalFieldsSection,
      'There must be exactly one section marked as the additional fields section.',
    );

    this.fieldToSectionMap = formSections
      .reduce(
        (memo, section) => section
          .fieldNames
          .reduce((map, fieldName) => Object.assign(map, { [fieldName]: section }), memo),
        {},
      );
  }

  // Find the section this field belongs to. If it doesn't belong to any
  // section (a 10% field perhaps) it falls in the addtional fields section.
  findSection(fieldName) {
    return fieldName in this.fieldToSectionMap
      ? this.fieldToSectionMap[fieldName]
      : this.additionalFieldsSection;
  }

  bucketFieldsBySection(formFields) {
    // Make sure to maintain the order by processing these in formFields order
    return formFields
      .reduce((form, field) => {
        const section = this.findSection(field.name);
        const sectionFields = form[section.id] || [];

        sectionFields.push(field);
        form[section.id] = sectionFields;
        return form;
      }, {});
  }

  sectionedFormFromAgencyComponent(agencyComponent) {
    const fieldsBySection = this.bucketFieldsBySection(agencyComponent.formFields || []);

    // Grab a list of sections, skipping empty sections
    const sections = this.formSections
      .filter((section) => section.id in fieldsBySection);

    const result = sections
      .map((section) => {
        // Use only the form fields in this section
        const formFields = fieldsBySection[section.id];

        const { jsonSchema, uiSchema } = wfjs.webformFieldsToJsonSchema(formFields, section);

        // Pass a triplet for processing
        return [section.id, jsonSchema, uiSchema];
      })
      .reduce((form, [sectionId, jsonSchema, uiSchema]) => {
        form.properties[sectionId] = jsonSchema;
        form.uiSchema[sectionId] = uiSchema;
        return form;
      }, { properties: {}, uiSchema: {} });

    return {
      jsonSchema: {
        title: 'Make your request',
        type: 'object',
        properties: result.properties,
      },
      uiSchema: result.uiSchema,
      sections,
    };
  }

  sectionedErrorsFromWebformErrors(webformErrors = {}) {
    return Object.keys(webformErrors)
      .reduce((errors, fieldName) => {
        const section = this.findSection(fieldName);
        // Format these as per react-jsonschema-form ids
        const path = `root_${section.id}_${fieldName}`;

        errors[path] = webformErrors[fieldName];
        return errors;
      }, {});
  }
}

function mergeSectionFormData(formData) {
  return Object.keys(formData)
    .reduce(
      (form, sectionId) => Object.assign(form, formData[sectionId]),
      {},
    );
}

export default {
  mergeSectionFormData,
  SectionedFormBuilder,
};
