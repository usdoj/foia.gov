import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof Description>} props
 */
function Description({ children }) {
  return (
    <div className="w-component-description">
      {children}
    </div>
  );
}

Description.propTypes = {
  children: PropTypes.node,
};

export default Description;
