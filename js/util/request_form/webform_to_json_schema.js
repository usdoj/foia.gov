import domify from './domify';


/**
 * Converts a metadata field's type to a JSON Schema type.
 */
function toJsonSchemaType(webformFieldType) {
  let type;

  // This is sort of a reverse mapping of ui:widget to JSON Schema type
  // https://github.com/mozilla-services/react-jsonschema-form#alternative-widgets
  switch (webformFieldType) {
    case 'checkbox':
    case 'radio':
      type = 'boolean';
      break;
    case 'email':
    case 'managed_file':
    case 'select':
    case 'tel':
    case 'textarea':
    case 'textfield':
    default:
      type = 'string';
  }

  return type;
}

/**
 * Converts a single form field from the agency metadata to a JSON schema
 * `properties` field.
 */
function toJsonSchemaProperty(webformField) {
  const type = toJsonSchemaType(webformField.type);
  const property = {
    type,
  };

  if (webformField.default_value) {
    property.default = webformField.default_value;
  }

  // If options is present, translate them to enums
  if (webformField.options && typeof webformField.options === 'object') {
    property.enum = [];
    property.enumNames = [];

    Object.keys(webformField.options).forEach((key) => {
      property.enum.push(key);
      property.enumNames.push(webformField.options[key]);
    });
  }

  return { [webformField.name]: property };
}

/**
 * Converts a single agency metadata form field to a uiSchema property to be
 * used with react-jsonschema-form.
 */
function toUiSchemaProperty(webformField) {
  const uiSchemaProperty = {
    'ui:title': webformField.title,
    'ui:description': webformField.help,
  };

  if (webformField.placeholder) {
    uiSchemaProperty['ui:placeholder'] = `${webformField.placeholder}`; // Coerce to string
  }

  // Map metadata field type to ui:widget or ui:options
  switch (webformField.type) {
    case 'managed_file':
      uiSchemaProperty['ui:widget'] = 'file';
      break;
    case 'checkbox':
    case 'radio':
    case 'textarea':
      uiSchemaProperty['ui:widget'] = webformField.type;
      break;
    case 'tel':
      uiSchemaProperty['ui:options'] = { inputType: 'tel' };
      break;
    default:
      break;
  }

  return { [webformField.name]: uiSchemaProperty };
}


/**
 * Translates agency components' Drupal Webform fields into JSON schema and uiSchema
 * for use with react-jsonschema-form.
 */
function webformFieldsToJsonSchema(formFields = [], { title, description } = {}) {
  const jsonSchema = {
    title,
    description,
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


export default {
  webformFieldsToJsonSchema,
};
