import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';

import { requestActions } from '../actions';
import { SubmissionResult } from '../models';
import USWDSRadioWidget from 'components/uswds_radio_widget';
import USWDSCheckboxWidget from 'components/uswds_checkbox_widget';
import ObjectFieldTemplate from './object_field_template';


function FOIARequestForm({ isSubmitting, requestForm, submissionResult }) {
  function onSubmit({ formData }) {
    // Add the form Id so the API knows what form we're submitting for
    requestActions.submitRequest(Object.assign({ id: agencyComponent.request_form.get('formId') }, formData));
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
      onSubmit={onSubmit}
      schema={jsonSchema}
      uiSchema={uiSchema}
      widgets={widgets}
      formContext={formContext}
      ObjectFieldTemplate={ObjectFieldTemplate}
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
  isSubmitting: PropTypes.bool.isRequired,
  requestForm: PropTypes.object.isRequired,
  submissionResult: PropTypes.instanceOf(SubmissionResult).isRequired,
};

export default FOIARequestForm;
