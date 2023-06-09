import React from 'react';
import PropTypes from 'prop-types';

function Pill({
  children,
  selected,
  onClick,
}) {
  return (
    <button
      className="w-component-pill"
      type="button"
      data-selected={selected}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Pill.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.number,
  onClick: PropTypes.func,
};

export default Pill;
