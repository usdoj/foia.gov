import 'test/setup';

import React from 'react';
import { shallow } from 'enzyme';

import RequestSummarySection from 'components/request_summary_section';
import * as factory from 'test/factory';


describe('RequestSummarySection', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('request summary', () => {
    let formData;
    let element;
    let requestForm;

    beforeEach(() => {
      formData = {
        requester_contact_section: {
          name: 'Mr. Rogers',
        },
        additional_fields_section: {
          agency_question: 'a response',
        },
      };

      requestForm = factory.requestForm.fromFormData(formData);
      console.log(requestForm);
      requestForm.jsonSchema.properties.requester_contact_section.properties.name.title = 'Full name';
      requestForm.jsonSchema.properties.additional_fields_section.properties.agency_question.title = 'Agency question';

    });

    describe('given the first section', () => {
      let section;

      beforeEach(() => {
        section = requestForm.sections[0];
        element = shallow(
          <RequestSummarySection
            formData={formData}
            requestForm={requestForm}
            section={section}
          />,
        );
      });

      it('contains field labels of only the first section', () => {
        expect(element.contains(<strong>Full name</strong>)).to.equal(true);
        expect(element.contains(<strong>Agency question</strong>)).to.equal(false);
      });

      it('contains field responses of only the first section', () => {
        expect(element.contains(<td>Mr. Rogers</td>)).to.equal(true);
        expect(element.contains(<td>a response</td>)).to.equal(false);
      });
    });

    describe('given the second section', () => {
      let section;

      beforeEach(() => {
        section = requestForm.sections[1];
        element = shallow(
          <RequestSummarySection
            formData={formData}
            requestForm={requestForm}
            section={section}
          />,
        );
      });

      it('contains field labels of only the second section', () => {
        expect(element.contains(<strong>Full name</strong>)).to.equal(false);
        expect(element.contains(<strong>Agency question</strong>)).to.equal(true);
      });

      it('contains field responses of only the second section', () => {
        expect(element.contains(<td>Mr. Rogers</td>)).to.equal(false);
        expect(element.contains(<td>a response</td>)).to.equal(true);
      });
    });
  });
});
