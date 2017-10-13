import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import USWDSRadioWidget from 'components/uswds_radio_widget';
import USWDSCheckboxWidget from 'components/uswds_checkbox_widget';
import ObjectFieldTemplate from './object_field_template';


function FOIARequestForm({ requestForm }) {
  const widgets = {
    CheckboxWidget: USWDSCheckboxWidget,
    RadioWidget: USWDSRadioWidget,
  };

  // Map these to react-jsonschema-form Ids
  const steps = (requestForm.sections || []).map(section => `root_${section.id}`);

  const formContext = { steps };
  const { jsonSchema, uiSchema } = requestForm;
  return (
    <div>
      <Form
        className="foia-request-form"
        schema={jsonSchema}
        uiSchema={uiSchema}
        widgets={widgets}
        formContext={formContext}
        ObjectFieldTemplate={ObjectFieldTemplate}
      >
        <div id="foia-request-form_submit" className="foia-request-form_submit">
          <p>Please review the information you’ve entered and submit.</p>
          <button>Submit</button>
        </div>
      </Form>
    </div>
  );
}

FOIARequestForm.propTypes = {
  requestForm: PropTypes.object.isRequired,
};

export default FOIARequestForm;
