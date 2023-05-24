import React from 'react';
import PropTypes from 'prop-types';

function AppContainer({ children, color }) {
  return (
    <div className={`l-app-container${color ? ` l-app-container--${color}` : ''}`}>
      {children}
    </div>
  );
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default AppContainer;
