import { expect } from 'chai';

import { Api } from '../../util/api';


describe('Api', () => {
  let api;

  beforeEach(() => {
    api = new Api('http://api.example.com');
  });

  it('has a private client', () => {
    expect(api).to.have.property('_api');
  });
});
