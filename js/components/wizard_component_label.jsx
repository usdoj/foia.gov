import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof Label>} props
 */
function Label({ children, isItalic }) {
  return (
    <div className={`w-component-label${isItalic ? ' w-component-label--italic' : ''}`}>
      {children}
    </div>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  isItalic: PropTypes.bool,
};

export default Label;
