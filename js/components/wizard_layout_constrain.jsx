import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {Object} props
 * @param {import('react').ReactNode=} props.children
 * @param {string=} props.width
 * @return {React.ElementType}
 */
function Constrain({ children, width }) {
  return (
    <div className={`w-layout-constrain${width ? ` w-layout-constrain--${width}` : ''}`}>
      {children}
    </div>
  );
}

Constrain.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
};

export default Constrain;
