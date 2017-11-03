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
        fake_requester_contact_section: {
          name: 'Mr. Rogers',
        },
        fake_supporting_docs: {
          agency_question: 'a response',
        },
      };

      requestForm = factory.requestForm.fromFormData(formData);
      requestForm.jsonSchema.properties.fake_requester_contact_section.properties.name.title = 'Full name';
      requestForm.jsonSchema.properties.fake_supporting_docs.properties.agency_question.title = 'Agency question';
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
        expect(element.contains('Full name')).to.equal(true);
        expect(element.contains('Agency question')).to.equal(false);
      });

      it('contains field responses of only the first section', () => {
        expect(element.contains(<div>Mr. Rogers</div>)).to.equal(true);
        expect(element.contains(<div>a response</div>)).to.equal(false);
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
        expect(element.contains('Full name')).to.equal(false);
        expect(element.contains('Agency question')).to.equal(true);
      });

      it('contains field responses of only the second section', () => {
        expect(element.contains(<div>Mr. Rogers</div>)).to.equal(false);
        expect(element.contains(<div>a response</div>)).to.equal(true);
      });
    });
  });
});
