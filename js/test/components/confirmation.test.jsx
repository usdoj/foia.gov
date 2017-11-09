import 'test/setup';

import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import Confirmation from 'components/confirmation';
import FoiaPersonnel from 'components/foia_personnel';
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
    let foiaServiceCenterPhone;

    beforeEach(() => {
      foiaServiceCenterPhone = '555-5555';
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
        service_centers: [
          { phone: [foiaServiceCenterPhone] },
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

    it('includes all foia personnel', () => {
      expect(agencyComponent.foiaPersonnel()).to.have.length(2);
      expect(element.find('.confirmation_agency-contact-personnel')).to.have.length(2);
      expect(element.find(FoiaPersonnel)).to.have.length(2);
    });

    it('includes foia officer info', () => {
      expect(element.find(FoiaPersonnel).get(0).props.foiaPersonnel).to.deep.equal(foiaOfficer);
    });

    it('includes service center info', () => {
      expect(element.find(FoiaPersonnel).get(1).props.foiaPersonnel).to.deep.equal({
        title: 'FOIA Service Center',
        phone: [foiaServiceCenterPhone],
      });
    });
  });
});
