import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import { List } from 'immutable';

import USWDSRadioWidget from 'components/uswds_radio_widget';
import USWDSCheckboxWidget from 'components/uswds_checkbox_widget';
import { requestActions } from '../actions';
import { SubmissionResult } from '../models';
import ObjectFieldTemplate from './object_field_template';
import rf from '../util/request_form';


function FoiaRequestForm({ formData, isSubmitting, onSubmit, requestForm, submissionResult }) {
  function onChange({ formData: data }) {
    requestActions.updateRequestForm(data);
  }

  // Add errors from the submissionResult
  function validate(data, errors) {
    if (!submissionResult.errors.size) {
      return errors;
    }

    submissionResult.errors
      .entrySeq()
      .forEach(([sectionId, sectionErrors]) => {
        sectionErrors
          .entrySeq()
          .forEach(([fieldName, error]) => {
            errors[sectionId][fieldName].addError(error);
          });
      });

    return errors;
  }

  function onFormSubmit({ formData: data }) {
    return requestActions
      .submitRequestForm(
        Object.assign(
          // Merge the sections into a single payload
          rf.mergeSectionFormData(data),
          // Add the form Id so the API knows what form we're submitting for
          { id: requestForm.id },
        ),
      )
      .then(() => {
        // Submission successful
        onSubmit();
      });
  }

  const widgets = {
    CheckboxWidget: USWDSCheckboxWidget,
    RadioWidget: USWDSRadioWidget,
  };

  // Map these to react-jsonschema-form Ids
  const steps = (requestForm.sections || []).map(section => `root_${section.id}`);

  const formContext = { steps, errors: submissionResult.errors.toJS() };
  const { jsonSchema, uiSchema } = requestForm;
  return (
    <Form
      className="foia-request-form"
      disabled={isSubmitting}
      formContext={formContext}
      formData={formData.toJS()}
      ObjectFieldTemplate={ObjectFieldTemplate}
      onChange={onChange}
      onSubmit={onFormSubmit}
      schema={jsonSchema}
      uiSchema={uiSchema}
      validate={validate}
      widgets={widgets}
    >
      <div id="foia-request-form_submit" className="foia-request-form_submit">
        <h3>Review and submit</h3>
        <p>Please review the information you entered above before submitting to
        an agency. You should hear from the agency within 10 days of submitting
        your request.  If you don’t hear from the agency, please reach out
        using the contact information provided to you on this site.</p>
        <button type="submit">Submit</button>
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

FoiaRequestForm.propTypes = {
  formData: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  requestForm: PropTypes.object.isRequired,
  submissionResult: PropTypes.instanceOf(SubmissionResult).isRequired,
};

FoiaRequestForm.defaultProps = {
  onSubmit: () => {},
};


export default FoiaRequestForm;
