/**
 * Converts a metadata field's type to a JSON Schema type.
 */
function toJsonSchemaType(metadataFieldType) {
  let type;

  // This is sort of a reverse mapping of ui:widget to JSON Schema type
  // https://github.com/mozilla-services/react-jsonschema-form#alternative-widgets
  switch (metadataFieldType) {
    case 'checkbox':
      type = 'boolean';
      break;
    case 'file':
    case 'tel':
    case 'textarea':
    default:
      type = 'string';
  }

  return type;
}

/**
 * Converts a single form field from the agency metadata to a JSON schema
 * `properties` field.
 */
function toJsonSchemaProperty(metadataField) {
  const type = toJsonSchemaType(metadataField.type);
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
  const uiSchemaProperty = {
    'ui:title': metadataField.label,
    'ui:description': metadataField.help_text,
  };

  if (metadataField.example) {
    uiSchemaProperty['ui:placeholder'] = metadataField.example;
  }

  // Map metadata field type to ui:widget or ui:options
  switch (metadataField.type) {
    case 'checkbox':
    case 'file':
    case 'textarea':
      uiSchemaProperty['ui:widget'] = metadataField.type;
      break;
    case 'tel':
      uiSchemaProperty['ui:options'] = { inputType: 'tel' };
      break;
    default:
      break;
  }

  return { [metadataField.name]: uiSchemaProperty };
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
