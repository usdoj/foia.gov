import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Api from '../../util/api';
import JsonApiParams from '../../util/json_api';

chai.use(sinonChai);


describe('JsonApiParams', () => {
  let api = {};
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('defaults', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams(api);
      query = params.serialize();
    });

    it('has _format parameter', () => {
      expect(query).to.equal('_format=api_json');
    });
  });

  describe('::get', () => {
    let sentinal;
    let params;
    let result;

    beforeEach(() => {
      sentinal = {}; // sentinal
      api = new Api('http://api.example.com');
      sandbox.stub(api, 'get').returns(Promise.resolve({ data: sentinal }));

      params = new JsonApiParams(api);
      return params.get('/path')
        .then((_result) => { result = _result; });
    });

    it('calls get on the api instance', () => {
      expect(api.get).to.have.been.calledOnce;
    });

    it('calls get on the api instance', () => {
      expect(api.get).to.have.been.calledWith('/path');
    });

    it('calls get with config', () => {
      expect(api.get).to.have.been.calledWith(sinon.match.any, sinon.match({
        params: { _format: 'api_json' },
        paramsSerializer: sinon.match.func,
        transformResponse: sinon.match.func,
      }));
    });

    it('returns the data part of the response', () => {
      expect(result).to.equal(sentinal);
    });
  });

  describe('::include', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams(api);
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
      params = new JsonApiParams(api);
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
