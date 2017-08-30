/**
 * Converts a single form field from the agency metadata to a JSON schema `properties` field.
 */
function toJsonSchemaProperty(metadataField) {
  const type = 'string';
  const property = {
    type,
  };

  // Copy over common schema properties
  ['enum', 'enumNames'].forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(metadataField, key)) {
      property[key] = metadataField[key];
    }
  });

  return { [metadataField.name]: property };
}

function metadataToJsonSchema(metadata, departmentName) {
  const departmentMetadata =
    metadata.departments.find(department => department.name === departmentName) || {};

  const jsonSchema = {
    title: metadata.abbreviation,
    type: 'object',
    properties: {},
  };

  const uiSchema = {};

  // Parse out additional fields as JSON schema properties
  const additionalJsonSchemaProperties = (departmentMetadata.additional_form_fields || [])
    .map(toJsonSchemaProperty)
    .reduce((property, properties) => Object.assign(properties, property), {});

  // Parse out required fields as JSON schema properties
  const requiredJsonSchemaProperties = (departmentMetadata.required_form_fields || [])
    .map(toJsonSchemaProperty)
    .reduce((property, properties) => Object.assign(properties, property), {});

  // Add required fields to the `required` property
  jsonSchema.required = Object.keys(requiredJsonSchemaProperties);

  Object.assign(
    jsonSchema.properties,
    additionalJsonSchemaProperties,
    requiredJsonSchemaProperties,
  );

  return { jsonSchema, uiSchema };
}


export default metadataToJsonSchema;
