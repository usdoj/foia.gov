import { expect } from 'chai';

import requestFormToJsonSchema from '../../util/request_form_to_json_schema';


describe('requestFormToJsonSchema()', () => {
  describe('given agencyComponent with no fields', () => {
    let agencyComponent;
    let result;

    beforeEach(() => {
      agencyComponent = {
        abbreviation: 'GSA',
        title: 'Headquarters',
      };

      result = requestFormToJsonSchema(agencyComponent);
    });

    describe('jsonSchema', () => {
      it('has a title', () => {
        expect(result.jsonSchema).to.have.property('title', 'Headquarters');
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

  describe('given agencyComponent with form fields', () => {
    let agencyComponent;
    let result;

    beforeEach(() => {
      agencyComponent = {
        abbreviation: 'GSA',
        title: 'Headquarters',
        formFields: [
          {
            name: 'contract_number',
            title: 'GS- Contract number',
            description: 'If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")',
          }, {
            name: 'region',
            title: 'GSA Region',
            description: '(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT',
          },
        ],
      };

      result = requestFormToJsonSchema(agencyComponent);
    });

    describe('jsonSchema', () => {
      it('has a title', () => {
        expect(result.jsonSchema).to.have.property('title', 'Headquarters');
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
      expect(result.uiSchema).to.deep.equal({
        'ui:order': [
          'contract_number',
          'region',
        ],
        contract_number: {
          'ui:title': 'GS- Contract number',
          'ui:description': 'If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")',
        },
        region: {
          'ui:title': 'GSA Region',
          'ui:description': '(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT',
        },
      });
    });
  });

  describe('given agencyComponent with required fields', () => {
    let agencyComponent;
    let result;

    beforeEach(() => {
      agencyComponent = {
        abbreviation: 'GSA',
        title: 'Headquarters',
        formFields: [{
          name: 'contract_number',
          title: 'GS- Contract number',
          description: 'If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")',
        }, {
          name: 'region',
          title: 'GSA Region',
          description: '(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT',
        }, {
          name: 'request_origin',
          title: 'Request Origin',
          regs_url: null,
          description: 'Company',
          required: true,
          options: {
            company: 'Company',
            individual: 'Individual/Self',
            organization: 'Organization',
          },
        }],
      };

      result = requestFormToJsonSchema(agencyComponent);
    });

    describe('jsonSchema', () => {
      it('has a title', () => {
        expect(result.jsonSchema).to.have.property('title', 'Headquarters');
      });

      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });

      it('has properties object with required and non-required fields', () => {
        expect(result.jsonSchema.properties).to.deep.equal({
          region: { type: 'string' },
          contract_number: { type: 'string' },
          request_origin: {
            type: 'string',
            enumNames: ['Company', 'Individual/Self', 'Organization'],
            enum: ['company', 'individual', 'organization'],
          },
        });
      });

      it('has required array containing the required fields', () => {
        expect(result.jsonSchema).to.have.deep.property('required', ['request_origin']);
      });
    });

    it('returns an uiSchema', () => {
      expect(result.uiSchema).to.deep.equal({
        'ui:order': [
          'contract_number',
          'region',
          'request_origin',
        ],
        contract_number: {
          'ui:title': 'GS- Contract number',
          'ui:description': 'If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")',
        },
        region: {
          'ui:title': 'GSA Region',
          'ui:description': '(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT',
        },
        request_origin: {
          'ui:title': 'Request Origin',
          'ui:description': 'Company',
        },
      });
    });
  });

  describe('given nonexistent department', () => {
    let agencyComponent;
    let result;

    beforeEach(() => {
      agencyComponent = {
        abbreviation: 'GSA',
        title: 'General Services Administration',
        formFields: [],
      };

      result = requestFormToJsonSchema(agencyComponent);
    });

    describe('jsonSchema', () => {
      it('title falls back to agency title', () => {
        expect(result.jsonSchema).to.have.property('title', 'General Services Administration');
      });

      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });
    });
  });

  describe('agencyComponent field properties', () => {
    let agencyComponent;
    let result;

    describe('given "default_value" property', () => {
      beforeEach(() => {
        agencyComponent = {
          abbreviation: 'GSA',
          title: 'Headquarters',
          formFields: [{
            name: 'widget',
            title: 'Widget',
            default_value: '1234',
          }],
        };

        result = requestFormToJsonSchema(agencyComponent);
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
          agencyComponent = {
            abbreviation: 'GSA',
            title: 'Headquarters',
            formFields: [{
              name: 'widget',
              title: 'Widget',
              type: 'checkbox',
            }],
          };

          result = requestFormToJsonSchema(agencyComponent);
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
          agencyComponent = {
            abbreviation: 'GSA',
            title: 'Headquarters',
            formFields: [{
              name: 'widget',
              title: 'Widget',
              type: 'textarea',
            }],
          };

          result = requestFormToJsonSchema(agencyComponent);
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
          agencyComponent = {
            abbreviation: 'GSA',
            title: 'Headquarters',
            formFields: [{
              name: 'widget',
              title: 'Widget',
              type: 'tel',
            }],
          };

          result = requestFormToJsonSchema(agencyComponent);
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
          agencyComponent = {
            abbreviation: 'GSA',
            title: 'Headquarters',
            formFields: [{
              name: 'widget',
              title: 'Widget',
              type: 'managed_file',
            }],
          };

          result = requestFormToJsonSchema(agencyComponent);
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
});
