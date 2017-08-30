import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';

import metadataToJsonSchema from 'util/metadata_to_json_schema';

function FOIARequestForm(props) {
  const { agency } = props;

  const { jsonSchema } = metadataToJsonSchema(agency, 'General Services Administration (General)');

  return (
    <div>
      <h2>Make a request to { agency.abbreviation }</h2>
      <Form schema={jsonSchema} />
    </div>
  );
}

FOIARequestForm.propTypes = {
  agency: PropTypes.object.isRequired,
};

export default FOIARequestForm;
