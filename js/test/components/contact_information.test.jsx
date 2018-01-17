import 'test/setup';

import React from 'react';
import { shallow } from 'enzyme';

import ContactInformation from 'components/contact_information';
import FoiaPersonnel from 'components/foia_personnel';
import FoiaSubmissionAddress from 'components/foia_submission_address';
import { AgencyComponent } from 'models';


describe('ContactInformation', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('foia personnel', () => {
    let element;
    let agencyComponent;
    let foiaOfficer;
    let foiaPublicLiaison;
    let foiaServiceCenterPhone;

    beforeEach(() => {
      foiaServiceCenterPhone = '555-5555';
      foiaPublicLiaison = {
        name: 'Mary',
        title: 'FOIA Public Liaison',
        email: 'mary@example.com',
      };
      foiaOfficer = {
        name: 'George',
        title: 'Captain',
        email: 'captaingeorge@example.com',
      };

      agencyComponent = new AgencyComponent({
        title: 'Office of Information Policy',
        website: { uri: 'https://www.justice.gov/oip/' },
        telephone: '202-555-5678',
        submission_address: {},
        email: 'example@oip.usdoj.gov',
        foia_officers: [
          foiaOfficer,
        ],
        public_liaisons: [
          foiaPublicLiaison,
        ],
        service_centers: [
          { phone: [foiaServiceCenterPhone] },
        ],
        foia_misc: [
          { phone: ['555-5556'] },
        ],
      });

      element = shallow(<ContactInformation agencyComponent={agencyComponent} />);
    });

    it('contains five info sections', () => {
      expect(element.find('.contact-information_section')).to.have.length(5);
    });

    it('contains three contacts', () => {
      expect(element.find(FoiaPersonnel)).to.have.length(3);
    });

    it('includes foia officer info', () => {
      expect(element.find(FoiaPersonnel).get(0).props.foiaPersonnel).to.deep.equal(foiaOfficer);
    });

    describe('service center contact', () => {
      let serviceCenter;
      let serviceCenterElement;

      beforeEach(() => {
        serviceCenterElement = element.find(FoiaPersonnel).get(1);
        serviceCenter = serviceCenterElement.props.foiaPersonnel;
      });

      it('has phone number', () => {
        expect(serviceCenter).to.have.deep.property('phone', [foiaServiceCenterPhone]);
      });

      it('has default title', () => {
        expect(serviceCenter).to.have.property('title', 'FOIA Requester Service Center');
      });

      it('links the title to glossary term', () => {
        expect(shallow(serviceCenterElement).html()).to.include('data-term="foia requester service center"');
      });
    });

    it('includes public liaison info', () => {
      const foiaPersonnel = element.find(FoiaPersonnel).get(2).props.foiaPersonnel;
      expect(foiaPersonnel).to.deep.equal(foiaPublicLiaison);
    });

    it('includes submission address', () => {
      expect(element.find(FoiaSubmissionAddress)).to.have.length(1);
    });

    it('includes email address', () => {
      expect(element.html()).to.include('mailto:example@oip.usdoj.gov');
    });
  });
});
