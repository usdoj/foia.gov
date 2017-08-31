import { expect } from 'chai';

import metadataToJsonSchema from '../../util/metadata_to_json_schema';

describe('metadataToJsonSchema()', () => {
  describe('given metadata with no fields', () => {
    let metadata;
    let result;

    beforeEach(() => {
      metadata = {
        abbreviation: 'GSA',
        departments: [{
          name: 'Headquarters',
        }],
      };

      result = metadataToJsonSchema(metadata, 'Headquarters');
    });

    describe('jsonSchema', () => {
      it('has a title', () => {
        expect(result.jsonSchema).to.have.property('title', 'GSA');
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
      expect(result.uiSchema).to.deep.equal({});
    });
  });

  describe('given metadata with additoinal fields', () => {
    let metadata;
    let result;

    beforeEach(() => {
      metadata = {
        abbreviation: 'GSA',
        departments: [{
          name: 'Headquarters',
          additional_form_fields: [{
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
        expect(result.jsonSchema).to.have.property('title', 'GSA');
      });

      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });

      it('has properties object with additional fields', () => {
        expect(result.jsonSchema.properties).to.deep.equal({
          region: { type: 'string' },
          contract_number: { type: 'string' },
        });
      });

      it('has an empty required array', () => {
        expect(result.jsonSchema.required).to.deep.equal([]);
      });
    });

    it('returns an empty uiSchema', () => {
      expect(result.uiSchema).to.deep.equal({});
    });
  });

  describe('given metadata with required fields', () => {
    let metadata;
    let result;

    beforeEach(() => {
      metadata = {
        abbreviation: 'GSA',
        departments: [{
          name: 'Headquarters',
          additional_form_fields: [{
            name: 'contract_number',
            label: 'GS- Contract number',
            help_text: 'If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")',
          }, {
            name: 'region',
            label: 'GSA Region',
            help_text: '(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT',
          }],
          required_form_fields: [{
            name: 'request_origin',
            label: 'Request Origin',
            regs_url: null,
            help_text: 'Company',
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
        expect(result.jsonSchema).to.have.property('title', 'GSA');
      });

      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });

      it('has properties object with additional and required fields', () => {
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
        departments: [],
      };

      result = metadataToJsonSchema(metadata, 'nonexistent');
    });

    describe('jsonSchema', () => {
      it('has a title', () => {
        expect(result.jsonSchema).to.have.property('title', 'GSA');
      });

      it('has a type', () => {
        expect(result.jsonSchema).to.have.property('type', 'object');
      });
    });
  });
});
