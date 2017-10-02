import { expect } from 'chai';

import Api from '../../util/api';
import JsonApiParams from '../../util/json_api_params';


describe('Api', () => {
  let api;

  beforeEach(() => {
    api = new Api('http://api.example.com');
  });

  describe('::params', () => {
    it('returns a JsonApiParams', () => {
      expect(api.params()).to.be.an.instanceof(JsonApiParams);
    });

    it('passes its api instance to the JsonApiParams', () => {
      const params = api.params();
      expect(params._api).to.equal(api._api);
    });

    describe('when called twice', () => {
      let paramsOne;
      let paramsTwo;

      beforeEach(() => {
        paramsOne = api.params();
        paramsTwo = api.params();
      });

      it('returns two different instances of JsonApiParams', () => {
        expect(paramsOne).not.to.equal(paramsTwo);
      });
    });
  });
});
