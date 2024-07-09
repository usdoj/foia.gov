import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {Object} props
 * @param {import('react').ReactNode=} props.children
 * @return {React.ElementType}
 */
function Flex({ children }) {
  return (
    <div className="w-layout-flex">
      {children}
    </div>
  );
}

Flex.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Flex;
