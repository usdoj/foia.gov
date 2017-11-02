import wfjs from './webform_to_json_schema';
import FORM_SECTIONS from './form_sections';


const ADDITIONAL_FIELDS_SECTION = FORM_SECTIONS
  .find(section => section.isAgencySpecificFieldSection);

const fieldToSectionMap = FORM_SECTIONS
  .reduce(
    (memo, section) =>
      section
        .fieldNames
        .reduce((map, fieldName) => Object.assign(map, { [fieldName]: section }), memo),
    {},
  );


function findSection(field) {
  return field.name in fieldToSectionMap ?
    fieldToSectionMap[field.name] :
    ADDITIONAL_FIELDS_SECTION;
}

function bucketFieldsBySection(formFields) {
  // Make sure to maintain the order by processing these in formFields order
  return formFields
    .reduce((form, field) => {
      const section = findSection(field);
      const sectionFields = form[section.id] || [];

      sectionFields.push(field);
      form[section.id] = sectionFields;
      return form;
    }, {});
}

// TODO make this a class so you can pass in the FORM_SECTIONS
function sectionedFormFromAgencyComponent(agencyComponent) {
  const fieldsBySection = bucketFieldsBySection(agencyComponent.formFields || []);

  // Grab a list of sections, skipping empty sections
  const sections = FORM_SECTIONS
    .filter(section => section.id in fieldsBySection);

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

function mergeSectionFormData(formData) {
  return Object.keys(formData)
    .reduce(
      (form, sectionId) => Object.assign(form, formData[sectionId]),
      {},
    );
}


export default {
  mergeSectionFormData,
  sectionedFormFromAgencyComponent,
};
