import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';

import USWDSRadioWidget from 'components/uswds_radio_widget';
import USWDSCheckboxWidget from 'components/uswds_checkbox_widget';
import { requestActions } from '../actions';
import { SubmissionResult } from '../models';
import ObjectFieldTemplate from './object_field_template';
import rf from '../util/request_form';


function FOIARequestForm({ formData, isSubmitting, requestForm, submissionResult }) {
  function onChange({ formData: data }) {
    requestActions.updateRequestForm(data);
  }

  function onSubmit({ formData: data }) {
    requestActions.submitRequestForm(
      Object.assign(
        // Merge the sections into a single payload
        rf.mergeSectionFormData(data),
        // Add the form Id so the API knows what form we're submitting for
        { id: requestForm.id },
      ),
    );
  }

  const widgets = {
    CheckboxWidget: USWDSCheckboxWidget,
    RadioWidget: USWDSRadioWidget,
  };

  // Map these to react-jsonschema-form Ids
  const steps = (requestForm.sections || []).map(section => `root_${section.id}`);

  const formContext = { steps };
  const { jsonSchema, uiSchema } = requestForm;
  return (
    <Form
      className="foia-request-form"
      disabled={isSubmitting}
      formContext={formContext}
      formData={formData.toJS()}
      ObjectFieldTemplate={ObjectFieldTemplate}
      onChange={onChange}
      onSubmit={onSubmit}
      schema={jsonSchema}
      uiSchema={uiSchema}
      widgets={widgets}
    >
      <div id="foia-request-form_submit" className="foia-request-form_submit">
        <p>Please review the information you’ve entered and submit.</p>
        <button>Submit</button>
        { submissionResult.errorMessage &&
          <div>
            <span className="usa-input-error-message" role="alert">
              {submissionResult.errorMessage}
            </span>
          </div>
        }
      </div>
    </Form>
  );
}

FOIARequestForm.propTypes = {
  formData: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  requestForm: PropTypes.object.isRequired,
  submissionResult: PropTypes.instanceOf(SubmissionResult).isRequired,
};

export default FOIARequestForm;
