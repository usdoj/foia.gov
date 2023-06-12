import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {Object} props
 * @param {import('react').ReactNode=} props.children
 * @return {React.ElementType}
 */
function AppContainer({ children }) {
  return (
    <div className="w-layout-app-container">
      {children}
    </div>
  );
}

AppContainer.propTypes = {
  children: PropTypes.node,
};

export default AppContainer;
