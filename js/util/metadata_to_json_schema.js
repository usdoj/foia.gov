/**
 * Converts a single form field from the agency metadata to a JSON schema
 * `properties` field.
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

/**
 * Converts a single agency metadata form field to a uiSchema property to be
 * used with react-jsonschema-form.
 */
function toUiSchemaProperty(metadataField) {
  return {
    [metadataField.name]: {
      'ui:title': metadataField.label,
      'ui:description': metadataField.help_text,
    },
  };
}

/**
 * Translates agency metadata into JSON schema and uiSchema for use with
 * react-jsonschema-form.
 */
function metadataToJsonSchema(metadata, departmentName) {
  const departmentMetadata =
    metadata.departments.find(department => department.name === departmentName) || {};

  const jsonSchema = {
    title: metadata.abbreviation,
    type: 'object',
    properties: {},
  };

  // Parse out additional fields as JSON schema properties
  const additionalJsonSchemaProperties = (departmentMetadata.additional_form_fields || [])
    .map(toJsonSchemaProperty)
    .reduce((property, properties) => Object.assign(properties, property), {});

  // Parse out required fields as JSON schema properties
  const requiredJsonSchemaProperties = (departmentMetadata.required_form_fields || [])
    .map(toJsonSchemaProperty)
    .reduce((property, properties) => Object.assign(properties, property), {});

  // Combine JSON schema properties
  Object.assign(
    jsonSchema.properties,
    additionalJsonSchemaProperties,
    requiredJsonSchemaProperties,
  );

  // Add required fields to the `required` property
  jsonSchema.required = Object.keys(requiredJsonSchemaProperties);

  // Parse out uiSchema from fields
  const uiSchema = [].concat(
    departmentMetadata.additional_form_fields || [],
    departmentMetadata.required_form_fields || [],
  )
    .map(toUiSchemaProperty)
    .reduce((property, properties) => Object.assign(properties, property), {});

  return { jsonSchema, uiSchema };
}


export default metadataToJsonSchema;
