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
    beforeEach(() => {
      sandbox.stub(jsonapi._api, 'get').returns(Promise.resolve({ data: {} }));
      return jsonapi.get('/path');
    });

    it('calls get with config', () => {
      expect(jsonapi._api.get).to.have.been.calledWith(sinon.match.string, sinon.match({
        paramsSerializer: sinon.match.func,
      }));
    });
  });

  describe('params.get', () => {
    let params;
    let result;

    beforeEach(() => {
      const jsonApiPayload = {
        data: [
          {
            id: '1',
            type: 'agency_component',
            attributes: {
              name: 'General Services Administration',
            },
            links: {
              self: 'https://example.com/jsonapi/1',
            },
          },
        ],
      };

      jsonapi = new JsonApi('http://jsonapi.example.com');
      sandbox.stub(jsonapi, 'get').returns(Promise.resolve({ data: jsonApiPayload }));

      params = jsonapi.params();
      return params
        .limit(10)
        .get('/path')
        .then((_result) => { result = _result; });
    });

    it('calls get on the jsonapi instance', () => {
      expect(jsonapi.get).to.have.been.calledOnce;
    });

    it('calls get on the jsonapi instance', () => {
      expect(jsonapi.get).to.have.been.calledWith('/path', sinon.match({
        params: { page: { limit: 10 } },
      }));
    });

    it('parses the result', () => {
      expect(result).to.deep.equal([{
        id: '1',
        type: 'agency_component',
        name: 'General Services Administration',
        links: {
          self: 'https://example.com/jsonapi/1',
        },
      }]);
    });
  });

  describe('::paginate', () => {
    let progressSpy;

    beforeEach(() => {
      sandbox.stub(jsonapi, 'get');
      progressSpy = sandbox.spy();
    });

    function jsonApiResponse(payload) {
      // Wrap in a promise and axios response object
      return Promise.resolve({
        data: payload,
      });
    }

    describe('given a single page', () => {
      beforeEach(() => {
        jsonapi.get
          .returns(jsonApiResponse({
            data: [{ id: '1', type: 'agency_component', attributes: { name: 'gsa' }, links: {} }],
            links: {},
          }));

        return jsonapi.paginate('/path', progressSpy);
      });

      it('calls get', () => {
        expect(jsonapi.get).to.have.been.calledOnce;
        expect(jsonapi.get).to.have.been.calledWith('/path');
      });

      it('calls calls progress spy with the parsed page', () => {
        expect(progressSpy).to.have.been.calledOnce;
        expect(progressSpy).to.have.been.calledWith([
          { id: '1', type: 'agency_component', name: 'gsa', links: {} },
        ]);
      });
    });

    describe('given two pages', () => {
      beforeEach(() => {
        jsonapi.get
          .onFirstCall().returns(jsonApiResponse({
            data: [{ id: '1', type: 'agency', attributes: { name: 'gsa' }, links: {} }],
            links: {
              next: {
                href: '/path?offset=1',
              },
            },
          }))
          .onSecondCall().returns(jsonApiResponse({
            data: [{ id: '2', type: 'agency', attributes: { name: 'doj' }, links: {} }],
            links: {
              prev: {
                href: '/path?offset=0',
              },
            },
          }));

        return jsonapi.paginate('/path', progressSpy);
      });

      it('calls get twice', () => {
        expect(jsonapi.get).to.have.been.calledTwice;
        expect(jsonapi.get).to.have.been.calledWith('/path');
        expect(jsonapi.get).to.have.been.calledWith('/path?offset=1');
      });

      it('calls calls progress spy with each parsed page', () => {
        expect(progressSpy).to.have.been.calledTwice;
        expect(progressSpy).to.have.been.calledWith([
          { id: '1', type: 'agency', name: 'gsa', links: {} },
        ]);
        expect(progressSpy).to.have.been.calledWith([
          { id: '2', type: 'agency', name: 'doj', links: {} },
        ]);
      });
    });
  });
});
