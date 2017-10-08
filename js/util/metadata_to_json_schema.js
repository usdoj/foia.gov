/**
 * Converts a metadata field's type to a JSON Schema type.
 */
function toJsonSchemaType(metadataFieldType) {
  let type;

  // This is sort of a reverse mapping of ui:widget to JSON Schema type
  // https://github.com/mozilla-services/react-jsonschema-form#alternative-widgets
  switch (metadataFieldType) {
    case 'checkbox':
    case 'radio':
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
    uiSchemaProperty['ui:placeholder'] = `${metadataField.example}`; // Coerce to string
  }

  // Map metadata field type to ui:widget or ui:options
  switch (metadataField.type) {
    case 'checkbox':
    case 'radio':
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
function metadataToJsonSchema(agencyComponent) {
  const formFields = agencyComponent.formFields || [];

  const jsonSchema = {
    title: agencyComponent.title,
    type: 'object',
  };

  // Parse out agency component fields as JSON schema properties
  jsonSchema.properties = formFields
    .map(toJsonSchemaProperty)
    .reduce((properties, property) => Object.assign(properties, property), {});

  // Add required fields to the `required` property
  jsonSchema.required = formFields
    .filter(formField => formField.required)
    .map(formField => formField.name);

  // Parse out uiSchema from fields
  const uiSchema = formFields
    .map(toUiSchemaProperty)
    .reduce((properties, property) => Object.assign(properties, property), {});

  // Set ordering of form fields
  uiSchema['ui:order'] = formFields.map(formField => formField.name);

  return { jsonSchema, uiSchema };
}


export default metadataToJsonSchema;
