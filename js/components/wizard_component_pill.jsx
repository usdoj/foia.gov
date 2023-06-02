import React from 'react';
import PropTypes from 'prop-types';

function Pill({
  children,
  key,
  onClick,
}) {
  return (
    <button
      key={key}
      className="c-pill"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Pill.propTypes = {
  children: PropTypes.node,
  key: PropTypes.string,
  onClick: PropTypes.func,
};

export default Pill;
