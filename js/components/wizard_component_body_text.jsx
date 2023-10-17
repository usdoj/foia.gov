import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof BodyText.propTypes>} props
 */
function BodyText({ children }) {
  return (
    <p className="w-component-body-text">{children}</p>
  );
}

BodyText.propTypes = {
  children: PropTypes.string,
};

export default BodyText;
