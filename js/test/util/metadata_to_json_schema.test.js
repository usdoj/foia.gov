import { expect } from 'chai';

import metadataToJsonSchema from '../../util/metadata_to_json_schema';

describe('metadataToJsonSchema()', () => {
  describe('given metadata with no fields', () => {
    let metadata;
    let result;

    beforeEach(() => {
      metadata = {
        abbreviation: 'GSA',
        components: [{
          name: 'Headquarters',
        }],
      };

      result = metadataToJsonSchema(metadata, 'Headquarters');
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

  describe('given metadata with form fields', () => {
    let metadata;
    let result;

    beforeEach(() => {
      metadata = {
        abbreviation: 'GSA',
        components: [{
          name: 'Headquarters',
          form_fields: [{
            name: 'contract_number',
            label: 'GS- Contract number',
            help_text: 'If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")',
          }, {
            name: 'region',
            label: 'GSA Region',
            help_text: '(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT',
          }],
        }],
      };

      result = metadataToJsonSchema(metadata, 'Headquarters');
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

  describe('given metadata with required fields', () => {
    let metadata;
    let result;

    beforeEach(() => {
      metadata = {
        abbreviation: 'GSA',
        components: [{
          name: 'Headquarters',
          form_fields: [{
            name: 'contract_number',
            label: 'GS- Contract number',
            help_text: 'If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")',
          }, {
            name: 'region',
            label: 'GSA Region',
            help_text: '(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT',
          }, {
            name: 'request_origin',
            label: 'Request Origin',
            regs_url: null,
            help_text: 'Company',
            required: true,
            enum: [
              'Company',
              'Individual/Self',
              'Organization',
            ],
          }],
        }],
      };

      result = metadataToJsonSchema(metadata, 'Headquarters');
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
          request_origin: { type: 'string', enum: ['Company', 'Individual/Self', 'Organization'] },
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
    let metadata;
    let result;

    beforeEach(() => {
      metadata = {
        abbreviation: 'GSA',
        name: 'General Services Administration',
        components: [],
      };

      result = metadataToJsonSchema(metadata, 'nonexistent');
    });

    describe('jsonSchema', () => {
      it('title falls back to agency name', () => {
        expect(result.jsonSchema).to.have.property('title', 'General Services Administration');
      });

      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });
    });
  });

  describe('metadata field properties', () => {
    let metadata;
    let result;

    describe('given "example" property', () => {
      beforeEach(() => {
        metadata = {
          abbreviation: 'GSA',
          components: [{
            name: 'Headquarters',
            form_fields: [{
              name: 'widget',
              label: 'Widget',
              example: '1234',
            }],
          }],
        };

        result = metadataToJsonSchema(metadata, 'Headquarters');
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
          metadata = {
            abbreviation: 'GSA',
            components: [{
              name: 'Headquarters',
              form_fields: [{
                name: 'widget',
                label: 'Widget',
                type: 'checkbox',
              }],
            }],
          };

          result = metadataToJsonSchema(metadata, 'Headquarters');
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
          metadata = {
            abbreviation: 'GSA',
            components: [{
              name: 'Headquarters',
              form_fields: [{
                name: 'widget',
                label: 'Widget',
                type: 'textarea',
              }],
            }],
          };

          result = metadataToJsonSchema(metadata, 'Headquarters');
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
          metadata = {
            abbreviation: 'GSA',
            components: [{
              name: 'Headquarters',
              form_fields: [{
                name: 'widget',
                label: 'Widget',
                type: 'tel',
              }],
            }],
          };

          result = metadataToJsonSchema(metadata, 'Headquarters');
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

      describe('given type:file', () => {
        beforeEach(() => {
          metadata = {
            abbreviation: 'GSA',
            components: [{
              name: 'Headquarters',
              form_fields: [{
                name: 'widget',
                label: 'Widget',
                type: 'file',
              }],
            }],
          };

          result = metadataToJsonSchema(metadata, 'Headquarters');
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
