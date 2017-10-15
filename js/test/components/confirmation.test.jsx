import 'test/setup';

import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import Confirmation from 'components/confirmation';
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

    beforeEach(() => {
      agencyComponent = new AgencyComponent({
        title: 'Office of Information Policy',
        website: { uri: 'https://www.justice.gov/oip/' },
        telephone: '202-555-5678',
        email: 'example@oip.usdoj.gov',
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

    it('includes agency title', () => {
      expect(element.find('.confirmation_agency-contact-title').text()).to.equal(agencyComponent.title);
    });
  });

  describe('request summary', () => {
    let formData;
    let element;

    beforeEach(() => {
      formData = new Map({
        requester_contact_section: {
          name: 'Mr. Rogers',
        },
        additional_fields_section: {
          agency_question: 'a response',
        },
      });

      element = shallow(
        <Confirmation
          agencyComponent={new AgencyComponent()}
          formData={formData}
          submissionResult={new SubmissionResult()}
        />,
      ).find('.confirmation_request-summary');
    });

    it('contains field names', () => {
      expect(element.contains(<strong>name</strong>)).to.equal(true);
      expect(element.contains(<strong>agency_question</strong>)).to.equal(true);
    });

    it('skips section names', () => {
      expect(element.text()).not.to.contain('additional_fields_section');
    });
  });
});
