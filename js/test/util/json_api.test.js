import { expect } from 'chai';

import JsonApiParams from '../../util/json_api';

describe('JsonApiParams', () => {
  describe('defaults', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams();
      query = params.serialize();
    });

    it('has _format parameter', () => {
      expect(query).to.equal('_format=api_json');
    });
  });

  describe('::include', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams();
      params.include('agency');
      query = params.serialize();
    });

    it('has include parameter', () => {
      expect(query).to.equal('_format=api_json&include=agency');
    });

    describe('given multiple includes', () => {
      beforeEach(() => {
        params.include('person');
        query = params.serialize();
      });

      it('appends additional includes', () => {
        expect(params._params).to.have.deep.property('include', ['agency', 'person']);
      });

      it('has comma separated list of includes', () => {
        expect(query).to.equal('_format=api_json&include=agency,person');
      });
    });
  });

  describe('::fields', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams();
      params.fields('agency', ['id', 'name']);
      query = params.serialize();
    });

    it('sets fields.agency as an object', () => {
      expect(params._params.fields).to.deep.equal({ agency: ['id', 'name'] });
    });

    it('includes a fields parameter', () => {
      expect(query).to.equal('_format=api_json&fields[agency]=id,name');
    });
  });
});
