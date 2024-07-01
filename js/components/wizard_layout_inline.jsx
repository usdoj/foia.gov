import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {Object} props
 * @param {import('react').ReactNode=} props.children
 * @return {React.ElementType}
 */
function Inline({ children, largeGap = false }) {
  return (
    <div className={`w-layout-inline${largeGap ? ' w-layout-inline--large' : ''}`}>
      {children}
    </div>
  );
}

Inline.propTypes = {
  children: PropTypes.node.isRequired,
  largeGap: PropTypes.bool,
};

export default Inline;
