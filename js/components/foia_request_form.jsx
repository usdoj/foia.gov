import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import { Map } from 'immutable';

import CustomFieldTemplate from 'components/request_custom_field_template';
import USWDSRadioWidget from 'components/uswds_radio_widget';
import USWDSCheckboxWidget from 'components/uswds_checkbox_widget';
import { requestActions } from '../actions';
import { SubmissionResult } from '../models';
import ObjectFieldTemplate from './object_field_template';
import rf from '../util/request_form';
import FoiaFileWidget from './foia_file_widget';
import { dataUrlToAttachment, findFileFields } from '../util/attachment';
import UploadProgress from './upload_progress';
import { scrollOffset } from '../util/dom';


let isSetRquirement = (isSetRquirement == null)?false:isSetRquirement;
function FoiaRequestForm({ formData, upload, onSubmit, requestForm, submissionResult }) {
  function onChange({ formData: data }) {
    requestActions.updateRequestForm(data);
    if (!$('#root_requester_contact_email').attr('required') &&
     !$('#root_requester_contact_phone_number').attr('required') &&
     !$('#root_requester_contact_address_line1').attr('required')) {
      $('#root_requester_contact_email').attr('required', 'true');
      $('#root_requester_contact_phone_number').attr('required', 'true');
      $('#root_requester_contact_address_line1').attr('required', 'true');
      isSetRquirement = true;
    }
    if (isSetRquirement) {
      let satisfy = false;
      if (data.requester_contact.address_line1) {
        $('#root_requester_contact_phone_number').removeAttr('required');
        $('#root_requester_contact_email').removeAttr('required');
        satisfy = true;
      }
      if (data.requester_contact.email) {
        $('#root_requester_contact_address_line1').removeAttr('required');
        $('#root_requester_contact_phone_number').removeAttr('required');
        satisfy = true;
      }
      if (data.requester_contact.phone_number) {
        $('#root_requester_contact_address_line1').removeAttr('required');
        $('#root_requester_contact_email').removeAttr('required');
        satisfy = true;
      }
      const fEmail = document.querySelector('#root_requester_contact_email');
      if (!satisfy) {
        fEmail
          .setCustomValidity('In order to submit your request, you must provide at least one' +
            ' of the following: email address, mailing address, or phone number.');
      } else {
        fEmail.setCustomValidity('');
      }
    }
  }

  function onFormSubmit({ formData: data }) {
    // Merge the sections into a single payload
    const payload = rf.mergeSectionFormData(data);
    // Transform file fields to attachments
    findFileFields(requestForm)
      .filter(fileFieldName => fileFieldName in payload)
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
        const fieldErrors = document.getElementsByClassName('usa-input-error');
        const firstError = fieldErrors.length && fieldErrors[0];
        if (firstError) {
          window.scrollTo(0, scrollOffset(firstError));
        }

        throw error;
      });
  }

  const widgets = {
    CheckboxWidget: USWDSCheckboxWidget,
    RadioWidget: USWDSRadioWidget,
    FileWidget: FoiaFileWidget,
  };

  // Map these to react-jsonschema-form Ids
  const steps = (requestForm.sections || []).map(section => `root_${section.id}`);

  const formContext = { steps, errors: submissionResult.errors.toJS() };
  const { jsonSchema, uiSchema } = requestForm;
  return (
    <Form
      className="foia-request-form sidebar_content-inner"
      disabled={upload.get('inProgress')}
      FieldTemplate={CustomFieldTemplate}
      formContext={formContext}
      formData={formData.toJS()}
      ObjectFieldTemplate={ObjectFieldTemplate}
      onChange={onChange}
      onSubmit={onFormSubmit}
      schema={jsonSchema}
      uiSchema={uiSchema}
      widgets={widgets}
    >
      <div id="foia-request-form_submit" className="foia-request-form_submit">
        <div className="foia-request-form_inline-progress">
          Step 6 of 6
        </div>
        <h3>Review and submit</h3>
        <div className="info-box">
          <p>Please review the information you entered above before submitting to
          an agency. You should hear from the agency within the coming weeks.
          If you don’t hear from the agency, please reach out
          using the contact information provided to you on this site.</p>
        </div>
        { upload.get('inProgress') ?
          <UploadProgress
            progressTotal={upload.get('progressTotal')}
            progressLoaded={upload.get('progressLoaded')}
          /> :
          <button
            className="usa-button usa-button-big usa-button-primary-alt"
            type="submit"
          >
            Submit request
          </button>
        }
        { submissionResult.errorMessage &&
          <p>
            <span className="usa-input-error-message" role="alert">
              {submissionResult.errorMessage}
            </span>
          </p>
        }
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
  onSubmit: () => {},
};


export default FoiaRequestForm;
