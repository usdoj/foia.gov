import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { JsonApi } from '../../util/json_api';
import JsonApiParams from '../../util/json_api_params';

chai.use(sinonChai);


describe('JsonApi', () => {
  let jsonapi;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(() => {
    jsonapi = new JsonApi('http://jsonapi.example.com');
  });

  it('has a private client', () => {
    expect(jsonapi).to.have.property('_api');
  });

  describe('::params', () => {
    it('returns a JsonApiParams', () => {
      expect(jsonapi.params()).to.be.an.instanceof(JsonApiParams);
    });

    it('adds a .get method to the JsonApiParams', () => {
      const params = jsonapi.params();
      expect(params).to.have.property('get');
      expect(params.get).to.be.a('function');
    });

    describe('when called twice', () => {
      let paramsOne;
      let paramsTwo;

      beforeEach(() => {
        paramsOne = jsonapi.params();
        paramsTwo = jsonapi.params();
      });

      it('returns two different instances of JsonApiParams', () => {
        expect(paramsOne).not.to.equal(paramsTwo);
      });
    });
  });

  describe('::get', () => {
    let sentinal;
    let result;

    beforeEach(() => {
      sandbox.stub(jsonapi._api, 'get').returns(Promise.resolve({ data: sentinal }));
      return jsonapi.get('/path')
        .then((_result) => { result = _result; });
    });

    it('calls get with config', () => {
      expect(jsonapi._api.get).to.have.been.calledWith(sinon.match.string, sinon.match({
        paramsSerializer: sinon.match.func,
        transformResponse: [sinon.match.func, sinon.match.func],
      }));
    });

    it('returns the data part of the response', () => {
      expect(result).to.equal(sentinal);
    });
  });

  describe('params.get', () => {
    let params;

    beforeEach(() => {
      jsonapi = new JsonApi('http://jsonapi.example.com');
      sandbox.stub(jsonapi, 'get').returns(Promise.resolve({ data: {} }));

      params = jsonapi.params();
      return params.limit(10).get('/path');
    });

    it('calls get on the jsonapi instance', () => {
      expect(jsonapi.get).to.have.been.calledOnce;
    });

    it('calls get on the jsonapi instance', () => {
      expect(jsonapi.get).to.have.been.calledWith('/path', sinon.match({
        params: { _format: 'api_json', page: { limit: 10 } },
      }));
    });
  });
});
