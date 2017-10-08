import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import metadataToJsonSchema from 'util/metadata_to_json_schema';
import USWDSRadioWidget from 'components/uswds_radio_widget';
import USWDSCheckboxWidget from 'components/uswds_checkbox_widget';

function FOIARequestForm({ agencyComponent }) {
  const widgets = {
    CheckboxWidget: USWDSCheckboxWidget,
    RadioWidget: USWDSRadioWidget,
  };

  const { jsonSchema, uiSchema } = metadataToJsonSchema(agencyComponent.toJS());
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
