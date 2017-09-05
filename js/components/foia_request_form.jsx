import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';

import metadataToJsonSchema from 'util/metadata_to_json_schema';

function FOIARequestForm(props) {
  const { agency } = props;

  // TODO we should be able to get the component name from the selector and use that here
  // For now, we just pick the component that matches the agency name, which
  // only sort of works for centralized agencies.
  const { jsonSchema, uiSchema } = metadataToJsonSchema(agency, agency.name);

  return (
    <div>
      <Form className="foia-request-form" schema={jsonSchema} uiSchema={uiSchema} />
    </div>
  );
}

FOIARequestForm.propTypes = {
  agency: PropTypes.object.isRequired,
};

export default FOIARequestForm;
