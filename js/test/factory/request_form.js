import faker from 'faker';

function sectionFactory(data) {
  return {
    id: faker.lorem.slug(),
    title: `${faker.commerce.department} questions`,
    description: faker.lorem.sentences(3),
    ...data,
  };
}

function jsonSchemaField(data) {
  return {
    title: `${faker.lorem.word()} form field`,
    type: 'string',
    description: faker.lorem.sentence(),
    ...data,
  };
}

function fromFormData(formData) {
  const sections = Object.keys(formData)
    .map((sectionId) => sectionFactory({ id: sectionId, title: `${sectionId} section` }));

  const uiSchema = sections
    .reduce((schema, section) => Object.assign(schema, { [section.id]: {} }), {});

  const properties = sections
    .reduce((schema, section) => {
      const sectionFields = formData[section.id];
      const sectionProperties = Object.keys(sectionFields)
        .reduce(
          (props, field) => Object.assign(
            props,
            { [field]: jsonSchemaField({ title: `${field} label` }) },
          ),
          {},
        );

      return Object.assign(schema, {
        [section.id]: {
          title: section.title,
          description: section.description,
          type: 'object',
          properties: sectionProperties,
        },
      });
    }, {});

  return {
    jsonSchema: jsonSchemaField({
      title: `${faker.lorem.word()} agency form`,
      type: 'object',
      properties,
    }),
    uiSchema,
    sections,
  };
}

function requestForm(data) {
  return {
    id: faker.datatype.uuid(),
    jsonSchema: jsonSchemaField({
      title: 'An agency form',
      type: 'object',
      description: faker.lorem.words(30),
      required: [],
      properties: {
        requester_contact_section: {
          properties: {
            name: jsonSchemaField({ title: 'Full name', description: 'The requester’s full name.' }),
          },
        },
        additional_fields_section: {
          properties: {
            agency_question: jsonSchemaField({ title: 'Agency question', description: 'An agency specific question.' }),
          },
        },
      },
    }),
    uiSchema: {
      requester_contact_section: {},
      additional_fields_section: {},
    },
    sections: [
      sectionFactory({ id: 'requester_contact_section', title: 'Requester contact' }),
      sectionFactory({ id: 'additional_fields_section', title: 'Additional fields' }),
    ],
    ...data,
  };
}

requestForm.jsonSchemaField = jsonSchemaField;
requestForm.sectionFactory = sectionFactory;
requestForm.fromFormData = fromFormData;

export default requestForm;
