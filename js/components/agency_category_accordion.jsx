import React from 'react';
import PropTypes from 'prop-types';


function AgencyCategoryAccordion({ name, agencies }) {
  return (
    <p>{ name }</p>
  );
}

AgencyCategoryAccordion.propTypes = {
  name: PropTypes.string,
  agencies: PropTypes.array
};

export default AgencyCategoryAccordion;
