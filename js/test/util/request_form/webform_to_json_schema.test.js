import { expect } from 'chai';

import wfjs from '../../../util/request_form/webform_to_json_schema';

describe('webformFieldsToJsonSchema()', () => {
  describe('given no formFields', () => {
    let formFields;
    let section;
    let result;

    beforeEach(() => {
      formFields = [];
      section = {
        title: 'Requester info',
        description: 'Enter your contact information.',
      };

      result = wfjs.webformFieldsToJsonSchema(formFields, section);
    });

    describe('jsonSchema', () => {
      it('has a title', () => {
        expect(result.jsonSchema).to.have.property('title', section.title);
      });

      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });

      it('has an empty properties object', () => {
        expect(result.jsonSchema.properties).to.deep.equal({});
      });

      it('has an empty required array', () => {
        expect(result.jsonSchema.required).to.deep.equal([]);
      });
    });

    it('returns an empty uiSchema', () => {
      expect(result.uiSchema).to.deep.equal({
        'ui:order': [],
      });
    });
  });

  describe('given simple form fields', () => {
    let formFields;
    let section;
    let result;

    beforeEach(() => {
      section = {
        title: 'Ageny info',
        description: 'Additional information that is helpful for agencies.',
      };
      formFields = [
        {
          name: 'contract_number',
          title: 'GS- Contract number',
          help: 'If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")',
        }, {
          name: 'region',
          title: 'GSA Region',
          help: '(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT',
        },
      ];

      result = wfjs.webformFieldsToJsonSchema(formFields, section);
    });

    describe('jsonSchema', () => {
      it('has a title', () => {
        expect(result.jsonSchema).to.have.property('title', section.title);
      });

      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });

      it('has properties object with form fields', () => {
        expect(result.jsonSchema.properties).to.deep.equal({
          region: { type: 'string' },
          contract_number: { type: 'string' },
        });
      });

      it('has an empty required array', () => {
        expect(result.jsonSchema.required).to.deep.equal([]);
      });
    });

    it('returns an uiSchema', () => {
      expect(result.uiSchema['ui:order']).to.deep.equal([
        'contract_number',
        'region',
      ]);

      // TODO better test for description, dom element
      expect(result.uiSchema.contract_number).to.have.property('ui:title', 'GS- Contract number');
      expect(result.uiSchema.contract_number).to.have.property('ui:description');
      expect(result.uiSchema.region).to.have.property('ui:title', 'GSA Region');
      expect(result.uiSchema.region).to.have.property('ui:description');
    });
  });

  describe('given required fields', () => {
    let formFields;
    let result;

    beforeEach(() => {
      formFields = [{
        name: 'contract_number',
        title: 'GS- Contract number',
        help: 'If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")',
      }, {
        name: 'region',
        title: 'GSA Region',
        help: '(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT',
      }, {
        name: 'request_origin',
        title: 'Request Origin',
        regs_url: null,
        help: 'Company',
        required: true,
        options: {
          company: 'Company',
          individual: 'Individual/Self',
          organization: 'Organization',
        },
      }];

      result = wfjs.webformFieldsToJsonSchema(formFields);
    });

    describe('jsonSchema', () => {
      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });

      it('has properties object with required and non-required fields', () => {
        expect(result.jsonSchema.properties).to.deep.equal({
          region: { type: 'string' },
          contract_number: { type: 'string' },
          request_origin: {
            type: 'string',
            enum: ['company', 'individual', 'organization'],
          },
        });
      });

      it('has required array containing the required fields', () => {
        expect(result.jsonSchema).to.have.deep.property('required', ['request_origin']);
      });
    });

    it('returns an uiSchema', () => {
      expect(result.uiSchema['ui:order']).to.deep.equal([
        'contract_number',
        'region',
        'request_origin',
      ]);

      // TODO better test for description, dom element
      expect(result.uiSchema.contract_number).to.have.property('ui:title', 'GS- Contract number');
      expect(result.uiSchema.contract_number).to.have.property('ui:description');
      expect(result.uiSchema.region).to.have.property('ui:title', 'GSA Region');
      expect(result.uiSchema.region).to.have.property('ui:description');
      expect(result.uiSchema.request_origin).to.have.property('ui:title', 'Request Origin');
      expect(result.uiSchema.request_origin).to.have.property('ui:description');
    });
  });

  describe('formField properties', () => {
    let formFields;
    let result;

    describe('given "default_value" property', () => {
      beforeEach(() => {
        formFields = [{
          name: 'widget',
          title: 'Widget',
          type: 'number',
          default_value: 1234,
        }];

        result = wfjs.webformFieldsToJsonSchema(formFields);
      });

      describe('jsonSchema property', () => {
        let jsonSchemaProperty;
        beforeEach(() => {
          jsonSchemaProperty = result.jsonSchema.properties.widget;
        });

        it('exists', () => {
          expect(jsonSchemaProperty).to.be.ok;
        });

        it('has a default property', () => {
          expect(jsonSchemaProperty).to.have.property('default', 1234);
        });
      });
    });

    describe('given "placeholder" property', () => {
      beforeEach(() => {
        formFields = [{
          name: 'widget',
          title: 'Widget',
          placeholder: '1234',
        }];

        result = wfjs.webformFieldsToJsonSchema(formFields);
      });

      describe('uiSchema property', () => {
        let uiSchemaProperty;
        beforeEach(() => {
          uiSchemaProperty = result.uiSchema.widget;
        });

        it('exists', () => {
          expect(uiSchemaProperty).to.be.ok;
        });

        it('has a ui:placeholder', () => {
          expect(uiSchemaProperty).to.have.property('ui:placeholder', '1234');
        });
      });
    });

    describe('given "type" property', () => {
      describe('given type:checkbox', () => {
        beforeEach(() => {
          formFields = [{
            name: 'widget',
            title: 'Widget',
            type: 'checkbox',
          }];

          result = wfjs.webformFieldsToJsonSchema(formFields);
        });

        describe('jsonSchema property', () => {
          let jsonSchemaProperty;

          beforeEach(() => {
            jsonSchemaProperty = result.jsonSchema.properties.widget;
          });

          it('exists', () => {
            expect(jsonSchemaProperty).to.be.ok;
          });

          it('has boolean type', () => {
            expect(jsonSchemaProperty).to.have.property('type', 'boolean');
          });
        });

        describe('uiSchema property', () => {
          let uiSchemaProperty;

          beforeEach(() => {
            uiSchemaProperty = result.uiSchema.widget;
          });

          it('exists', () => {
            expect(uiSchemaProperty).to.be.ok;
          });

          it('has checkbox widget', () => {
            expect(uiSchemaProperty).to.have.property('ui:widget', 'checkbox');
          });
        });
      });

      describe('given type:textarea', () => {
        beforeEach(() => {
          formFields = [{
            name: 'widget',
            title: 'Widget',
            type: 'textarea',
          }];

          result = wfjs.webformFieldsToJsonSchema(formFields);
        });

        describe('jsonSchema property', () => {
          let jsonSchemaProperty;

          beforeEach(() => {
            jsonSchemaProperty = result.jsonSchema.properties.widget;
          });

          it('exists', () => {
            expect(jsonSchemaProperty).to.be.ok;
          });

          it('has boolean type', () => {
            expect(jsonSchemaProperty).to.have.property('type', 'string');
          });
        });

        describe('uiSchema property', () => {
          let uiSchemaProperty;

          beforeEach(() => {
            uiSchemaProperty = result.uiSchema.widget;
          });

          it('exists', () => {
            expect(uiSchemaProperty).to.be.ok;
          });

          it('has checkbox widget', () => {
            expect(uiSchemaProperty).to.have.property('ui:widget', 'textarea');
          });
        });
      });

      describe('given type:tel', () => {
        beforeEach(() => {
          formFields = [{
            name: 'widget',
            title: 'Widget',
            type: 'tel',
          }];

          result = wfjs.webformFieldsToJsonSchema(formFields);
        });

        describe('jsonSchema property', () => {
          let jsonSchemaProperty;

          beforeEach(() => {
            jsonSchemaProperty = result.jsonSchema.properties.widget;
          });

          it('exists', () => {
            expect(jsonSchemaProperty).to.be.ok;
          });

          it('has string type', () => {
            expect(jsonSchemaProperty).to.have.property('type', 'string');
          });
        });

        describe('uiSchema property', () => {
          let uiSchemaProperty;

          beforeEach(() => {
            uiSchemaProperty = result.uiSchema.widget;
          });

          it('exists', () => {
            expect(uiSchemaProperty).to.be.ok;
          });

          it('has ui:options', () => {
            expect(uiSchemaProperty).to.have.deep.property('ui:options', { inputType: 'tel' });
          });
        });
      });

      describe('given type:managed_file', () => {
        beforeEach(() => {
          formFields = [{
            name: 'widget',
            title: 'Widget',
            type: 'managed_file',
          }];

          result = wfjs.webformFieldsToJsonSchema(formFields);
        });

        describe('jsonSchema property', () => {
          let jsonSchemaProperty;

          beforeEach(() => {
            jsonSchemaProperty = result.jsonSchema.properties.widget;
          });

          it('exists', () => {
            expect(jsonSchemaProperty).to.be.ok;
          });

          it('has string type', () => {
            expect(jsonSchemaProperty).to.have.property('type', 'string');
          });
        });

        describe('uiSchema property', () => {
          let uiSchemaProperty;

          beforeEach(() => {
            uiSchemaProperty = result.uiSchema.widget;
          });

          it('exists', () => {
            expect(uiSchemaProperty).to.be.ok;
          });

          it('has ui:widget file', () => {
            expect(uiSchemaProperty).to.have.property('ui:widget', 'file');
          });
        });
      });
    });
  });

  describe('section', () => {
    describe('given no section', () => {
      let result;

      beforeEach(() => {
        result = wfjs.webformFieldsToJsonSchema([]);
      });

      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });

      it('has properties', () => {
        expect(result.jsonSchema).to.have.property('properties');
      });
    });

    describe('given section with title and description', () => {
      let section;
      let result;

      beforeEach(() => {
        section = {
          title: 'Requester info',
          description: 'Enter your contact information.',
        };

        result = wfjs.webformFieldsToJsonSchema([], section);
      });

      it('has a title', () => {
        expect(result.jsonSchema).to.have.property('title', section.title);
      });

      it('has a description', () => {
        expect(result.jsonSchema).to.have.property('description', section.description);
      });

      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });

      it('has properties', () => {
        expect(result.jsonSchema).to.have.property('properties');
      });
    });
  });
});
