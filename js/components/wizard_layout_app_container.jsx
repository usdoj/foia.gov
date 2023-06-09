import React from 'react';
import PropTypes from 'prop-types';

function AppContainer({ children }) {
  return (
    <div className="w-layout-app-container">
      {children}
    </div>
  );
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContainer;
