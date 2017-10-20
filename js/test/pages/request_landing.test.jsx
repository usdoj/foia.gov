import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

import RequestLandingPage from '../../pages/request_landing';
import agencyComponentStore from '../../stores/agency_component';
import { requestActions } from '../../actions';


describe('RequestLandingPage', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      sandbox.stub(requestActions, 'fetchAgencyFinderData');
    });

    describe('given an empty store', () => {
      beforeEach(() => {
        // Enable lifecycle experiment to trigger componentDidMount
        shallow(<RequestLandingPage />, { lifecycleExperimental: true });
      });

      it('calls action fetchAgencyFinderData', () => {
        expect(requestActions.fetchAgencyFinderData).to.have.been.calledOnce;
      });
    });

    describe('given a populated store', () => {
      beforeEach(() => {
        sandbox.stub(agencyComponentStore, 'getState')
          .returns({ agencies: new Map({ gsa: { name: 'General Services Administration' } }), agencyComponents: [] });

        // Enable lifecycle experiment to trigger componentDidMount
        shallow(<RequestLandingPage />, { lifecycleExperimental: true });
      });

      it('does not call fetchAgencyFinderData', () => {
        expect(requestActions.fetchAgencyFinderData).not.to.have.been.called;
      });
    });
  });
});
