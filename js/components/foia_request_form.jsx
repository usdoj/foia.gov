import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import metadataToJsonSchema from 'util/metadata_to_json_schema';
import USWDSRadioWidget from 'components/uswds_radio_widget';
import USWDSCheckboxWidget from 'components/uswds_checkbox_widget';

function FOIARequestForm(props) {
  const { agency } = props;
  const widgets = {
    CheckboxWidget: USWDSCheckboxWidget,
    RadioWidget: USWDSRadioWidget,
  };

  // TODO we should be able to get the component name from the selector and use that here
  // For now, we just pick the component that matches the agency name, which
  // only sort of works for centralized agencies.
  const { jsonSchema, uiSchema } = metadataToJsonSchema(agency, agency.name);
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
  agency: PropTypes.object.isRequired,
};

export default FOIARequestForm;
