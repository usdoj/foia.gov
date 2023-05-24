import React from 'react';
import PropTypes from 'prop-types';

function Constrain({ children, width }) {
  return (
    <div className={`l-constrain${width ? ` l-constrain--${width}` : ''}`}>
      {children}
    </div>
  );
}

Constrain.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
};

export default Constrain;
