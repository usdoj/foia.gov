import React from 'react';
import PropTypes from 'prop-types';

function FOIARequestForm(props) {
  const { agency } = props;
  return <h2>Make a request to { agency }</h2>;
}

FOIARequestForm.propTypes = {
  agency: PropTypes.string.isRequired,
};

export default FOIARequestForm;
