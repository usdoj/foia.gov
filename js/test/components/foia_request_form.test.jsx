import 'test/setup';

import React from 'react';
import { render, shallow } from 'enzyme';
import { Map } from 'immutable';
import Form from 'react-jsonschema-form';

import FoiaRequestForm from '../../components/foia_request_form';
import SubmissionResult from '../../models/submission_result';
import { requestActions } from '../../actions';

// TODO create a proper factory
function simpleSingleSectionRequestForm() {
  return {
    id: 'some-form-id',
    jsonSchema: {
      title: 'Agency name',
      properties: {
        additional_fields: {
          title: 'Additional fields',
          type: 'object',
          required: [],
          properties: {
            agency_question: { title: 'Agency question', type: 'string' },
          },
        },
      },
    },
    uiSchema: {
      additional_fields: {
        agency_question: {
          'ui:title': 'Agency question',
        },
        'ui:order': [
          'agency_question',
        ],
      },
    },
    sections: [
      {
        id: 'additional_fields',
        title: 'Additional fields',
        description: 'Additional fields the agency collects.',
      },
    ],
  };
}

describe('FoiaRequestForm', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    describe('given a form with single section', () => {
      let formData;
      let requestForm;
      let submissionResult;
      let element;
      let upload;

      beforeEach(() => {
        formData = new Map();
        upload = new Map();
        submissionResult = new SubmissionResult();
        requestForm = simpleSingleSectionRequestForm();
      });

      describe('with shallow render', () => {
        beforeEach(() => {
          element = shallow(
            <FoiaRequestForm
              formData={formData}
              upload={upload}
              requestForm={requestForm}
              submissionResult={submissionResult}
            />,
          );
        });

        it('renders a Form', () => {
          expect(element.find(Form)).to.have.length(1);
        });
      });

      describe('submit', () => {
        beforeEach(() => {
          element = render(
            <FoiaRequestForm
              formData={formData}
              upload={upload}
              requestForm={requestForm}
              submissionResult={submissionResult}
            />,
          );
        });

        it('has a submit button', () => {
          expect(element.find('[type=submit]')).to.have.length(1);
        });
      });

      describe('when the onSubmit is called', () => {
        let onSubmit;

        function callSubmit(elem) {
          return elem.prop('onSubmit')({
            formData: {
              addtional_fields: {
                agency_question: 'a requester response',
              },
            },
          });
        }

        beforeEach(() => {
          onSubmit = sandbox.spy();
          element = shallow(
            <FoiaRequestForm
              formData={formData}
              upload={upload}
              onSubmit={onSubmit}
              requestForm={requestForm}
              submissionResult={submissionResult}
            />,
          );
        });

        describe('given success', () => {
          beforeEach(() => {
            sandbox.stub(requestActions, 'submitRequestForm').returns(Promise.resolve());
            return callSubmit(element);
          });

          it('calls the submit action', () => {
            expect(requestActions.submitRequestForm).to.have.been.called;
          });

          it('merges sections into one payload', () => {
            expect(requestActions.submitRequestForm).to.have.been.calledWith({
              id: 'some-form-id',
              agency_question: 'a requester response',
            });
          });

          it('calls submit handler', () => {
            expect(onSubmit).to.have.been.called;
          });
        });

        describe('given error', () => {
          beforeEach(() => {
            sandbox.stub(requestActions, 'submitRequestForm').returns(Promise.reject());
            return callSubmit(element)
              .catch(() => {}); // expected to reject
          });

          it('does not call submit handler', () => {
            expect(onSubmit).to.not.have.been.called;
          });
        });
      });

      describe('given submission error', () => {
        beforeEach(() => {
          submissionResult = new SubmissionResult({
            errorMessage: 'Could not submit form.',
          });

          element = render(
            <FoiaRequestForm
              formData={formData}
              upload={upload}
              requestForm={requestForm}
              submissionResult={submissionResult}
            />,
          );
        });

        it('renders the error', () => {
          expect(element.find('.usa-input-error-message').text()).to.equal('Could not submit form.');
        });
      });
    });
  });
});
