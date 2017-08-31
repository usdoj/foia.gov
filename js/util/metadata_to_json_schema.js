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
function metadataToJsonSchema(metadata, componentName) {
  const componentMetadata =
    metadata.components.find(component => component.name === componentName) || {};

  const form_fields = componentMetadata.form_fields || [];

  const jsonSchema = {
    title: componentMetadata.name || metadata.name,
    type: 'object',
  };

  // Parse out agency specific fields as JSON schema properties
  jsonSchema.properties = form_fields
    .map(toJsonSchemaProperty)
    .reduce((property, properties) => Object.assign(properties, property), {});

  // Add required fields to the `required` property
  jsonSchema.required = form_fields
    .filter(form_field => form_field.required)
    .map(form_field => form_field.name);

  // Parse out uiSchema from fields
  const uiSchema = form_fields
    .map(toUiSchemaProperty)
    .reduce((property, properties) => Object.assign(properties, property), {});

  // Set ordering of form fields
  uiSchema['ui:order'] = form_fields.map(form_field => form_field.name);

  return { jsonSchema, uiSchema };
}


export default metadataToJsonSchema;
