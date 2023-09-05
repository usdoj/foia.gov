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
 * Converts a metadata field's type to a JSON Schema format.
 */
function toJsonSchemaFormat(webformFieldType) {
  let format;

  switch (webformFieldType) {
    case 'email':
      format = 'email';
      break;
    default:
      format = false;
  }

  return format;
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

  const format = toJsonSchemaFormat(webformField.type);
  if (format) {
    property.format = format;
  }

  if (webformField.default_value) {
    property.default = webformField.default_value;
  }

  if (webformField.maxlength) {
    property.maxLength = Number.parseInt(webformField.maxlength, 10);
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
  // For fields with maxlength, automatically add help text.
  if (webformField.maxlength) {
    const max = Number.parseInt(webformField.maxlength, 10).toLocaleString();

    if (webformField.help == null) {
      webformField.help = `
      <em>This field has a maximum length of ${max} characters.</em>
      `;
    } else {
      webformField.help += `
      <em>This field has a maximum length of ${max} characters.</em>
    `;
    }
  }

  const uiSchemaProperty = {
    'ui:title': webformField.title,
    'ui:description': webformField.help && domify(webformField.help),
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
 * Gets information about webform states in fields.
 */
function conditionalStates(webformField, stateType) {
  if (webformField.states && webformField.states[stateType]) {
    const conditions = (Array.isArray(webformField.states[stateType])) ? webformField.states[stateType] : [webformField.states[stateType]];
    const results = conditions.map((condition) => {
      if (typeof condition === 'object') {
        return Object.keys(condition).map((key) => {
          const parentMatch = key.match(/:input\[name="(.*)"\]/);
          const parent = (parentMatch && parentMatch.length > 1) ? parentMatch[1] : false;
          const value = condition[key].value;
          if (parent && value) {
            return {
              child: webformField.name,
              parent,
              value,
            };
          }
          return false;
        }).filter((v) => v);
      }
      return false;
    }).filter((v) => v);
    return results;
  }
  return [];
}
/**
 * Gets information about conditionally visible fields.
 */
function conditionalVisibility(webformField) {
  return conditionalStates(webformField, 'visible');
}

/**
 * Gets information about conditionally required fields.
 */
function conditionalRequirement(webformField) {
  return conditionalStates(webformField, 'required');
}

/**
 * Translates agency components' Drupal Webform fields into JSON schema and uiSchema
 * for use with react-jsonschema-form.
 */
function webformFieldsToJsonSchema(formFields = [], { title, description, id } = {}) {
  const jsonSchema = {
    title,
    type: 'object',
  };

  if (id === 'requester_contact') {
    formFields.push({ name: 'website', title: 'Do not fill in this field', type: 'textfield' });
  }

  // Parse out agency component fields as JSON schema properties
  jsonSchema.properties = formFields
    .map(toJsonSchemaProperty)
    .reduce((properties, property) => Object.assign(properties, property), {});

  const conditionallyVisible = formFields
    .map(conditionalVisibility)
    .filter((v) => v.length);

  const conditionallyRequired = formFields
    .map(conditionalRequirement)
    .filter((v) => v.length);

  const dependencies = {};
  conditionallyVisible.forEach((conditions) => {
    conditions.forEach((condition) => {
      condition.forEach((item) => {
        const dependencyKey = [item.parent, item.value].join('|');
        if (typeof dependencies[dependencyKey] === 'undefined') {
          const properties = {};
          properties[item.parent] = {
            enum: [item.value],
          };
          dependencies[dependencyKey] = {
            properties,
          };
        }
        dependencies[dependencyKey].properties[item.child] = {
          type: jsonSchema.properties[item.child].type,
        };
      });
    });
  });
  conditionallyRequired.forEach((conditions) => {
    conditions.forEach((condition) => {
      condition.forEach((item) => {
        const dependencyKey = [item.parent, item.value].join('|');
        if (typeof dependencies[dependencyKey] === 'undefined') {
          const properties = {};
          properties[item.parent] = {
            enum: [item.value],
          };
          dependencies[dependencyKey] = {
            properties,
          };
        }
        dependencies[dependencyKey].properties[item.child] = {
          type: jsonSchema.properties[item.child].type,
        };
        if (typeof dependencies[dependencyKey].required === 'undefined') {
          dependencies[dependencyKey].required = [];
        }
        if (!(dependencies[dependencyKey].required.includes(item.child))) {
          dependencies[dependencyKey].required.push(item.child);
        }
      });
    });
  });

  if (typeof jsonSchema.dependencies === 'undefined') {
    jsonSchema.dependencies = {};
  }
  Object.keys(dependencies).forEach((dependencyKey) => {
    const parent = dependencyKey.split('|')[0];
    if (typeof jsonSchema.dependencies[parent] === 'undefined') {
      jsonSchema.dependencies[parent] = { oneOf: [] };
    }
    jsonSchema.dependencies[parent].oneOf.push(dependencies[dependencyKey]);
  });

  // Make sure that the dependencies have all available options.
  Object.keys(dependencies).forEach((dependencyKey) => {
    const parent = dependencyKey.split('|')[0];
    if (jsonSchema.properties[parent]) {
      const enumOptions = jsonSchema.properties[parent].enum;
      enumOptions.forEach((enumOption) => {
        const oneOfItems = jsonSchema.dependencies[parent].oneOf;
        const match = oneOfItems.find((oneOfItem) => oneOfItem.properties[parent] && oneOfItem.properties[parent].enum.includes(enumOption));
        if (!match) {
          const emptyDependency = {
            properties: {},
          };
          emptyDependency.properties[parent] = {
            enum: [enumOption],
          };
          oneOfItems.push(emptyDependency);
        }
      });
    }
  });

  conditionallyVisible.forEach((conditions) => {
    conditions.forEach((condition) => {
      condition.forEach((item) => {
        delete jsonSchema.properties[item.child];
      });
    });
  });

  // Add required fields to the `required` property
  jsonSchema.required = formFields
    .filter((formField) => formField.required)
    .map((formField) => formField.name);

  // Parse out uiSchema from fields
  const uiSchema = formFields
    .map(toUiSchemaProperty)
    .reduce((properties, property) => Object.assign(properties, property), {});

  // Set ordering of form fields
  uiSchema['ui:order'] = formFields.map((formField) => formField.name);

  // Set the description for this section.
  uiSchema['ui:description'] = description;

  return { jsonSchema, uiSchema };
}

export default {
  webformFieldsToJsonSchema,
};
