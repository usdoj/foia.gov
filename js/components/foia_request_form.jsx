import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import USWDSRadioWidget from 'components/uswds_radio_widget';
import USWDSCheckboxWidget from 'components/uswds_checkbox_widget';
import formSections from '../util/form_sections';

function FOIARequestForm({ agencyComponent }) {
  const widgets = {
    CheckboxWidget: USWDSCheckboxWidget,
    RadioWidget: USWDSRadioWidget,
  };

  // Split into sections
  const { jsonSchema, uiSchema } = formSections.sectionedFormFromAgencyComponent(agencyComponent.toJS());
  return (
    <div>
      <Form
        className="foia-request-form"
        schema={jsonSchema}
        uiSchema={uiSchema}
        widgets={widgets}
      />
    </div>
  );
}

FOIARequestForm.propTypes = {
  agencyComponent: PropTypes.object.isRequired,
};

export default FOIARequestForm;
