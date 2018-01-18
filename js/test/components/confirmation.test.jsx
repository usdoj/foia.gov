import 'test/setup';

import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import Confirmation from 'components/confirmation';
import ContactInformation from 'components/contact_information';
import { AgencyComponent, SubmissionResult } from 'models';


describe('Confirmation', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('contact section', () => {
    let element;
    let agencyComponent;
    let foiaOfficer;

    beforeEach(() => {
      foiaOfficer = {
        name: 'George',
        title: 'Captain',
        email: 'captaingeorge@example.com',
      };

      agencyComponent = new AgencyComponent({
        title: 'Office of Information Policy',
        website: { uri: 'https://www.justice.gov/oip/' },
        telephone: '202-555-5678',
        email: 'example@oip.usdoj.gov',
        foia_officers: [
          foiaOfficer,
        ],
      });
      element = shallow(
        <Confirmation
          agencyComponent={agencyComponent}
          formData={new Map()}
          submissionResult={new SubmissionResult()}
        />,
      );
    });

    it('includes confirmation text', () => {
      expect(element.find('.confirmation_contact').text()).to.contain('Your FOIA request has been created');
    });

    it('includes contact information', () => {
      expect(element.find(ContactInformation)).to.have.length(1);
    });
  });
});
