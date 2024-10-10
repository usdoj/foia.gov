import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { Map } from 'immutable';
import CustomFieldTemplate from 'components/request_custom_field_template';
import USWDSRadioWidget from 'components/uswds_radio_widget';
import USWDSCheckboxWidget from 'components/uswds_checkbox_widget';
import { requestActions } from '../actions';
import { SubmissionResult } from '../models';
import CustomObjectFieldTemplate from './object_field_template';
import rf from '../util/request_form';
import FoiaFileWidget from './foia_file_widget';
import { dataUrlToAttachment, findFileFields } from '../util/attachment';
import UploadProgress from './upload_progress';
import { scrollOffset } from '../util/dom';
import dispatcher from '../util/dispatcher';
import ReCAPTCHA from 'react-google-recaptcha';

function FoiaRequestForm({
  formData, upload, onSubmit, requestForm, submissionResult,
}) {
  const recaptchaRef = useRef();

  // Helper function to jump to the first form error.
  function focusOnFirstError() {
    const fieldErrors = document.getElementsByClassName('usa-input-error');
    const firstError = fieldErrors.length && fieldErrors[0];
    if (firstError) {
      window.scrollTo(0, scrollOffset(firstError));
    }
  }

  // Custom validation function, which runs after jsonSchema validation.
  function validate(data, errors) {
    const honField = 'website';
    if (data.requester_contact[honField]) {
      errors.addError('Error');
    }
    return errors;
  }

  function onChange({ formData: data }) {
    if (!dispatcher.isDispatching()) {
      requestActions.updateRequestForm(data);
    }
  }

  // Listen for jsonSchema validation errors and jump to them.
  function onError() {
    focusOnFirstError();
  }

  // Customize the errors that jsonSchema generates.
  function transformErrors(errors) {
    return errors.map((error) => {
      // A friendlier message for maxLength.
      if (error.name === 'maxLength') {
        error.message = `This field has a maximum length of ${error.argument}
          characters. If you need to include more information, please upload
          it under "Additional information".`;
      }
      return error;
    });
  }

  function onFormSubmit({ formData: data }) {
    const recaptchaValue = recaptchaRef.current.getValue();
    // Now you can use the recaptchaValue for your form submission
    console.log(recaptchaValue);

    // Merge the sections into a single payload
    const payload = rf.mergeSectionFormData(data);
    // Transform file fields to attachments
    findFileFields(requestForm)
      .filter((fileFieldName) => fileFieldName in payload)
      .forEach((fileFieldName) => {
        payload[fileFieldName] = dataUrlToAttachment(payload[fileFieldName]);
      });
    // Submit the request
    return requestActions
      .submitRequestForm(
        Object.assign(
          // Merge the sections into a single payload
          payload,
          // Add the form Id so the API knows what form we're submitting for
          { id: requestForm.id },
        ),
      )
      .then(() => {
        // Submission successful
        onSubmit();
      })
      .catch((error) => {
        focusOnFirstError();
        throw error;
      });
  }

  const widgets = {
    CheckboxWidget: USWDSCheckboxWidget,
    RadioWidget: USWDSRadioWidget,
    FileWidget: FoiaFileWidget,
  };

  // Map these to react-jsonschema-form Ids
  const steps = (requestForm.sections || []).map((section) => `root_${section.id}`);

  const errors = (submissionResult.errors instanceof Map)
    ? submissionResult.errors.toJS()
    : submissionResult.errors;
  const formContext = { steps, errors };
  const { jsonSchema, uiSchema } = requestForm;

  const templates = {
    FieldTemplate: CustomFieldTemplate,
    ObjectFieldTemplate: CustomObjectFieldTemplate,
  };

  return (
    <Form
      className="foia-request-form sidebar_content-inner"
      disabled={upload.get('inProgress')}
      templates={templates}
      formContext={formContext}
      formData={formData.toJS()}
      onChange={onChange}
      onSubmit={onFormSubmit}
      schema={jsonSchema}
      uiSchema={uiSchema}
      widgets={widgets}
      customValidate={validate}
      validator={validator}
      onError={onError}
      showErrorList={false}
      transformErrors={transformErrors}
    >
      <div id="foia-request-form_submit" className="foia-request-form_submit">
        <div className="foia-request-form_inline-progress">
          Step 6 of 6
        </div>
        <h3>Review and submit</h3>
        <div className="info-box">
          <p>
            Please review the information you entered above before submitting to
            an agency. You should hear from the agency within the coming weeks.
            If you don’t hear from the agency, please reach out
            using the contact information provided to you on this site.
          </p>
        </div>
        {upload.get('inProgress')
          ? (
            <UploadProgress
              progressTotal={upload.get('progressTotal')}
              progressLoaded={upload.get('progressLoaded')}
            />
          )
          : (
            <div>
            <button
              className="usa-button usa-button-big usa-button-primary-alt"
              type="submit"
            >
              Submit request
            </button>
              <ReCAPTCHA ref={recaptchaRef} sitekey="6Le3tV0qAAAAAJB8fxsSPxs3v46Zo69t2IaRFU5C" />
              {/*  <ReCAPTCHA ref={recaptcha} sitekey={process.env.REACT_APP_SITE_KEY} />*/}
            {/*  <ReCAPTCHA ref={recaptcha} sitekey={process.env.PORT} /> */}
            </div>
          )}
        {submissionResult.errorMessage
          && (
            <p>
              <span className="usa-input-error-message" role="alert">
                {submissionResult.errorMessage}
              </span>
            </p>
          )}
      </div>
    </Form>
  );
}

FoiaRequestForm.propTypes = {
  formData: PropTypes.object.isRequired,
  upload: PropTypes.instanceOf(Map).isRequired,
  onSubmit: PropTypes.func,
  requestForm: PropTypes.object.isRequired,
  submissionResult: PropTypes.instanceOf(SubmissionResult).isRequired,
};

FoiaRequestForm.defaultProps = {
  onSubmit: () => { },
};

export default FoiaRequestForm;
