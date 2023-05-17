import React from 'react';
import PropTypes from 'prop-types';

function Constrain({ children }) {
  return (
    <div className="l-constrain">
      {children}
    </div>
  );
}

Constrain.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Constrain;
